import { auth, prisma } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect, notFound } from "next/navigation"
import ReviewResult from "@/components/review-result"
import { ArrowLeft, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/back-button"

export default async function ReviewHistoryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const requestHeaders = await headers()

    const session = await auth.api.getSession({ headers: requestHeaders })
    if (!session) {
        redirect("/auth/sign-in")
    }

    const review = await prisma.review.findUnique({ where: { id } })

    if (!review || review.userId !== session.user.id) {
        notFound()
    }

    return (
        <div className="relative w-full max-w-2xl px-4 py-10 sm:px-6">
            <BackButton />
            <div className="my-4">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Review Result
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    AI-generated code review for&nbsp;
                    <span className="font-medium text-foreground">
                        {review.repoOwner}/{review.repoName}
                    </span>
                    &nbsp;·&nbsp;PR #{review.prNumber}
                </p>
            </div>

            {review.status === "PENDING" && (
                <div className="flex items-center gap-3 border border-border/40 bg-card/60 px-5 py-4">
                    <Clock className="size-4 shrink-0 animate-pulse text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        This review is still being processed. Check back shortly.
                    </p>
                </div>
            )}

            {(review.status === "FAILED" || (review.status === "COMPLETED" && !review.generatedReview)) && (
                <div className="flex items-center gap-3 border border-destructive/30 bg-destructive/5 px-5 py-4">
                    <XCircle className="size-4 shrink-0 text-destructive" />
                    <p className="text-sm text-muted-foreground">
                        This review failed to generate. Please try submitting the pull request again.
                    </p>
                </div>
            )}

            {review.status === "COMPLETED" && review.generatedReview && (
                <ReviewResult
                    repoOwner={review.repoOwner}
                    repoName={review.repoName}
                    prNumber={review.prNumber}
                    prTitle={review.title}
                    review={review.generatedReview}
                />
            )}
        </div>
    )
}
