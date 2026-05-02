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

    return (
        <div className="w-full flex flex-col items-start gap-8">
            <div className="text-3xl font-bold">Request a Review</div>
            <div className="w-full flex flex-col items-start gap-2">
                <div className="font-semibold">Select a Repository</div>
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
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select repository" />
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
            </div>
            {selectedRepo && (
                <div className="w-full flex flex-col items-start gap-2">
                    <div className="font-semibold">Select a Pull Request</div>
                    <Select<PullRequestOption>
                        items={pullRequestItems}
                        value={selectedPullRequest}
                        disabled={
                            isLoadingPullRequests || pullRequests.length === 0
                        }
                        itemToStringLabel={(pullRequest) =>
                            `#${pullRequest.number} ${pullRequest.title}`
                        }
                        itemToStringValue={(pullRequest) =>
                            String(pullRequest.id)
                        }
                        isItemEqualToValue={(a, b) => a.id === b.id}
                        onValueChange={(pullRequest) => {
                            setSelectedPullRequest(pullRequest)
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue
                                placeholder={
                                    isLoadingPullRequests
                                        ? "Loading pull requests..."
                                        : "Select pull request"
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
                </div>
            )}
            {selectedPullRequest && <Button variant={"default"} className={"w-full"}>Sumbit For Review</Button>}
        </div>
    )
}
