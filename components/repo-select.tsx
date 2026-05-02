"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Button } from "./ui/button"
import {
    GitFork,
    GitPullRequest,
    Loader2,
    ArrowRight,
    AlertCircle,
} from "lucide-react"
import StepConnector from "./step-connector"
import StepCard from "./step-card"

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

export default function RepoSelect({
    repositories,
}: {
    repositories: RepoOption[]
}) {
    const [selectedRepo, setSelectedRepo] = useState<RepoOption | null>(null)
    const [selectedPullRequest, setSelectedPullRequest] =
        useState<PullRequestOption | null>(null)
    const [pullRequests, setPullRequests] = useState<PullRequestOption[]>([])
    const [isLoadingPullRequests, setIsLoadingPullRequests] = useState(false)

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

            if (!response.ok) {
                setPullRequests([])
                return
            }

            const data = (await response.json()) as {
                pullRequests: PullRequestOption[]
            }
            setPullRequests(data.pullRequests)
        } finally {
            setIsLoadingPullRequests(false)
        }
    }

    const noPRs =
        !isLoadingPullRequests && selectedRepo && pullRequests.length === 0

    const handleReview = async () => {
        try {
            const response = await fetch(
                `/api/github/review`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        url: selectedPullRequest?.url
                    })
                },

            )

            if (!response.ok) {
                setPullRequests([])
                return
            }

            const data = (await response.json())
            console.log(data);
        } finally {
            setIsLoadingPullRequests(false)
        }
    }

    return (
        <div className="w-full space-y-3">
            <StepCard
                step={1}
                icon={<GitFork className="size-4" />}
                label="Repository"
                done={!!selectedRepo}
            >
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
                        if (repo) {
                            getPullRequests(repo)
                        }
                    }}
                >
                    <SelectTrigger className="px-3 h-10 w-full border-border/60 bg-muted/40 text-sm transition-colors hover:bg-muted/70 focus:ring-primary/30">
                        <SelectValue placeholder="Choose a repository…" />
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
            </StepCard>

            <StepConnector active={!!selectedRepo} />

            <StepCard
                step={2}
                icon={<GitPullRequest className="size-4" />}
                label="Pull Request"
                done={!!selectedPullRequest}
                locked={!selectedRepo}
            >
                {selectedRepo ? (
                    <>
                        <Select<PullRequestOption>
                            items={pullRequestItems}
                            value={selectedPullRequest}
                            disabled={isLoadingPullRequests || pullRequests.length === 0}
                            itemToStringLabel={(pr) =>
                                `#${pr.number} ${pr.title}`
                            }
                            itemToStringValue={(pr) => String(pr.id)}
                            isItemEqualToValue={(a, b) => a.id === b.id}
                            onValueChange={(pr) => setSelectedPullRequest(pr)}
                        >
                            <SelectTrigger className="px-3 h-10 w-full border-border/60 bg-muted/40 text-sm transition-colors hover:bg-muted/70 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60">
                                <SelectValue
                                    placeholder={
                                        isLoadingPullRequests
                                            ? "Loading pull requests…"
                                            : "Choose a pull request…"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {pullRequestItems.map((item) => (
                                        <SelectItem
                                            key={item.value.id}
                                            value={item.value}
                                        >
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
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground/60">
                        Select a repository first.
                    </p>
                )}
            </StepCard>

            <StepConnector active={!!selectedPullRequest} />

            <StepCard
                step={3}
                icon={<ArrowRight className="size-4" />}
                label="Submit for Review"
                done={false}
                locked={!selectedPullRequest}
            >
                {selectedPullRequest ? (
                    <div className="space-y-3">
                        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                            <p className="text-xs text-muted-foreground">Selected PR</p>
                            <p className="mt-0.5 text-sm font-medium text-foreground">
                                #{selectedPullRequest.number} — {selectedPullRequest.title}
                            </p>
                        </div>
                        <Button className="group relative w-full overflow-hidden bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 sm:w-auto"
                            onClick={handleReview}
                        >
                            <span className="flex items-center gap-2">
                                Submit for Review
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Button>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground/60">
                        Choose a pull request to continue.
                    </p>
                )}
            </StepCard>
        </div>
    )
}


