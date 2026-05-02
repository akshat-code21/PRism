"use client"
import { useState } from "react"
import Link from "next/link"
import {
    GitFork,
    GitPullRequest,
    Copy,
    Check,
    ChevronRight,
    Plus,
} from "lucide-react"
import { Button } from "./ui/button"
import { Streamdown } from "streamdown"
import { cn } from "@/lib/utils"

type ReviewResultProps = {
    repoOwner: string
    repoName: string
    prNumber: number
    prTitle: string
    review: string
}

export default function ReviewResult({
    repoOwner,
    repoName,
    prNumber,
    prTitle,
    review,
}: ReviewResultProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(review)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="flex items-center gap-2 border border-border/40 bg-card/50 px-4 py-2 backdrop-blur-sm">
                <GitFork className="size-3.5 shrink-0 text-muted-foreground/60" />
                <span className="max-w-[160px] truncate text-xs text-muted-foreground">
                    {repoOwner}/{repoName}
                </span>
                <ChevronRight className="size-3 shrink-0 text-muted-foreground/30" />
                <GitPullRequest className="size-3.5 shrink-0 text-primary" />
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
                    #{prNumber}&nbsp;{prTitle}
                </span>
                <Link
                    href="/dashboard/new"
                    className={cn(
                        "inline-flex h-6 shrink-0 items-center gap-1 px-2 text-xs",
                        "text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    )}
                >
                    <Plus className="size-3" />
                    New
                </Link>
            </div>

            <div className="overflow-hidden border border-border/50 bg-card shadow-xl shadow-black/6">
                <div className="h-px w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />

                <div className="flex items-center justify-between border-b border-border/40 bg-muted/10 px-5 py-3.5">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-sm font-semibold leading-none text-foreground">
                                AI Code Review
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                #{prNumber}&nbsp;·&nbsp;{repoName}
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

                <div className="px-6 py-6 prose prose-sm dark:prose-invert max-w-none
                                prose-headings:font-semibold prose-headings:tracking-tight
                                prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5
                                prose-pre:bg-muted/60 prose-pre:border prose-pre:border-border/40">
                    <Streamdown>{review}</Streamdown>
                </div>
            </div>
        </div>
    )
}
