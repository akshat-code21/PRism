"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
    GitFork,
    GitPullRequest,
    Loader2,
    Sparkles,
    AlertCircle,
    Copy,
    Check,
    RotateCcw,
    ChevronRight,
} from "lucide-react"
import { Streamdown } from "streamdown"

export type RepoOption = {
    id: number
    name: string
    fullName: string
    owner: string
}

type PullRequestOption = {
    id: number
    number: number
    title: string
    url: string
}

const PER_PAGE = 20

export default function RepoSelect() {
    const [repositories, setRepositories] = useState<RepoOption[]>([])
    const [repoPage, setRepoPage] = useState(1)
    const [hasMoreRepos, setHasMoreRepos] = useState(true)
    const [isLoadingRepos, setIsLoadingRepos] = useState(false)
    const [initialReposLoaded, setInitialReposLoaded] = useState(false)

    const [selectedRepo, setSelectedRepo] = useState<RepoOption | null>(null)
    const [selectedPullRequest, setSelectedPullRequest] = useState<PullRequestOption | null>(null)
    const [pullRequests, setPullRequests] = useState<PullRequestOption[]>([])
    const [isLoadingPullRequests, setIsLoadingPullRequests] = useState(false)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [review, setReview] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const fetchRepos = async (page: number) => {
        if (isLoadingRepos) return
        setIsLoadingRepos(true)
        try {
            const res = await fetch(`/api/github/repos?page=${page}&per_page=${PER_PAGE}`)
            if (!res.ok) return
            const data = await res.json() as {
                repositories: RepoOption[]
                hasNextPage: boolean
                page: number
            }
            setRepositories((prev) => {
                const existingIds = new Set(prev.map((r) => r.id))
                const newRepos = data.repositories.filter((r) => !existingIds.has(r.id))
                return [...prev, ...newRepos]
            })
            setHasMoreRepos(data.hasNextPage)
            setRepoPage(page)
        } finally {
            setIsLoadingRepos(false)
            setInitialReposLoaded(true)
        }
    }

    useEffect(() => {
        fetchRepos(1)
    }, [])

    const repoItems = repositories.map((repository) => ({
        label: repository.fullName,
        value: repository,
    }))

    const pullRequestItems = pullRequests.map((pullRequest) => ({
        label: `#${pullRequest.number} ${pullRequest.title}`,
        value: pullRequest,
    }))

    const getPullRequests = async (activeRepo: RepoOption) => {
        setIsLoadingPullRequests(true)
        try {
            const response = await fetch(
                `/api/github/pulls?owner=${encodeURIComponent(activeRepo.owner)}&repo=${encodeURIComponent(activeRepo.name)}`
            )
            if (!response.ok) { setPullRequests([]); return }
            const data = (await response.json()) as { pullRequests: PullRequestOption[] }
            setPullRequests(data.pullRequests)
        } finally {
            setIsLoadingPullRequests(false)
        }
    }

    const noPRs = !isLoadingPullRequests && selectedRepo && pullRequests.length === 0

    const handleReview = async () => {
        setIsLoadingReview(true)
        try {
            const response = await fetch(`/api/github/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: selectedPullRequest?.url }),
            })
            if (!response.ok) return
            const data = await response.json()
            setReview(data.review)
        } finally {
            setIsLoadingReview(false)
        }
    }

    const handleCopy = () => {
        if (!review) return
        navigator.clipboard.writeText(review)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleNewReview = () => {
        setReview(null)
        setSelectedPullRequest(null)
    }

    if (review) {
        return (
            <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center gap-2 border border-border/40 bg-card/50 px-4 py-2 backdrop-blur-sm">
                    <GitFork className="size-3.5 shrink-0 text-muted-foreground/60" />
                    <span className="max-w-[160px] truncate text-xs text-muted-foreground">
                        {selectedRepo?.fullName}
                    </span>
                    <ChevronRight className="size-3 shrink-0 text-muted-foreground/30" />
                    <GitPullRequest className="size-3.5 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
                        #{selectedPullRequest?.number}&nbsp;{selectedPullRequest?.title}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground shrink-0"
                        onClick={handleNewReview}
                    >
                        <RotateCcw className="size-3" />
                        New
                    </Button>
                </div>

                <div className="overflow-hidden border border-border/50 bg-card shadow-xl shadow-black/6">
                    <div className="h-px w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />
                    <div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-5 py-3.5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 shrink-0 items-center justify-center bg-primary/10 ring-1 ring-primary/20">
                                <Sparkles className="size-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold leading-none text-foreground">
                                    AI Code Review
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    #{selectedPullRequest?.number}&nbsp;·&nbsp;{selectedRepo?.name}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1.5 border-border/60 bg-background/60 px-3 text-xs hover:bg-muted/40"
                            onClick={handleCopy}
                        >
                            {copied
                                ? <><Check className="size-3 text-green-500" />Copied</>
                                : <><Copy className="size-3" />Copy</>
                            }
                        </Button>
                    </div>

                    <div className="px-8 py-6 prose prose-sm dark:prose-invert max-w-none
                                    prose-headings:font-semibold prose-headings:tracking-tight
                                    prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5
                                    prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border/40">
                        <Streamdown>{review}</Streamdown>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div className="p-px bg-linear-to-b from-border/80 to-border/20 shadow-lg shadow-black/4">
                <div className="bg-card px-6 py-6 space-y-5">
                    <div className="flex items-center gap-2.5 pb-1">
                        <div>
                            <p className="text-sm font-semibold leading-none text-foreground">
                                Configure Review
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Select a repo and pull request to analyse
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-border/40" />

                    <div className="space-y-2">
                        <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                            <GitFork className="size-3" />
                            Repository
                        </label>
                        <Select<RepoOption>
                            items={repoItems}
                            value={selectedRepo}
                            itemToStringLabel={(repo) => repo.fullName}
                            itemToStringValue={(repo) => String(repo.id)}
                            isItemEqualToValue={(a, b) => a.id === b.id}
                            onValueChange={(repo) => {
                                setSelectedPullRequest(null)
                                setPullRequests([])
                                setSelectedRepo(repo)
                                if (repo) getPullRequests(repo)
                            }}
                        >
                            <SelectTrigger className="px-3 h-10 w-full border-border/60 bg-background/60 text-sm transition-colors hover:bg-muted/30 focus:ring-primary/30">
                                <SelectValue
                                    placeholder={
                                        !initialReposLoaded
                                            ? "Loading repositories…"
                                            : "Choose a repository…"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {repoItems.map((item) => (
                                        <SelectItem key={item.value.id} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {hasMoreRepos && (
                            <Button
                                variant={"ghost"}
                                type="button"
                                disabled={isLoadingRepos}
                                onClick={() => fetchRepos(repoPage + 1)}
                                className="mt-1.5 flex w-full items-center justify-center gap-1.5 py-1.5 text-md font-medium text-primary hover:text-primary transition-colors disabled:opacity-50"
                            >
                                {isLoadingRepos ? (
                                    <><Loader2 className="size-3 animate-spin" />Loading…</>
                                ) : (
                                    "Load more repositories"
                                )}
                            </Button>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 ${selectedRepo ? "text-muted-foreground" : "text-muted-foreground/35"}`}>
                            <GitPullRequest className="size-3" />
                            Pull Request
                        </label>
                        <Select<PullRequestOption>
                            items={pullRequestItems}
                            value={selectedPullRequest}
                            disabled={!selectedRepo || isLoadingPullRequests || pullRequests.length === 0}
                            itemToStringLabel={(pr) => `#${pr.number} ${pr.title}`}
                            itemToStringValue={(pr) => String(pr.id)}
                            isItemEqualToValue={(a, b) => a.id === b.id}
                            onValueChange={(pr) => setSelectedPullRequest(pr)}
                        >
                            <SelectTrigger className="px-3 h-10 w-full border-border/60 bg-background/60 text-sm transition-colors hover:bg-muted/30 focus:ring-primary/30 disabled:opacity-40 disabled:cursor-not-allowed">
                                <SelectValue
                                    placeholder={
                                        isLoadingPullRequests
                                            ? "Loading pull requests…"
                                            : !selectedRepo
                                                ? "Select a repository first…"
                                                : "Choose a pull request…"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {pullRequestItems.map((item) => (
                                        <SelectItem key={item.value.id} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {isLoadingPullRequests && (
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Loader2 className="size-3 animate-spin" />
                                Fetching open pull requests…
                            </p>
                        )}
                        {noPRs && (
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <AlertCircle className="size-3 shrink-0" />
                                No open pull requests found for this repository.
                            </p>
                        )}
                    </div>

                    {selectedPullRequest && (
                        <div className="animate-in fade-in slide-in-from-bottom-1 duration-300 flex items-start gap-3 border border-primary/25 bg-primary/5 px-4 py-3">
                            <GitPullRequest className="mt-0.5 size-4 shrink-0 text-primary" />
                            <div className="min-w-0">
                                <p className="text-[11px] font-medium uppercase tracking-widest text-primary">
                                    Ready to analyse
                                </p>
                                <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                                    #{selectedPullRequest.number}&nbsp;—&nbsp;{selectedPullRequest.title}
                                </p>
                            </div>
                        </div>
                    )}

                    <Button
                        className="group relative w-full gap-2 overflow-hidden bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/35 disabled:opacity-50"
                        onClick={handleReview}
                        disabled={!selectedPullRequest || isLoadingReview}
                    >
                        {isLoadingReview ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Analysing pull request…
                            </>
                        ) : (
                            <>
                                Generate AI Review
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
