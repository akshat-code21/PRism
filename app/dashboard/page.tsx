import { auth } from "@/lib/auth"
import axios from "axios"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

type ReviewsStats = {
  reviewsCount?: number
  successfulReviewsCount?: number
  failedReviewsCount?: number
}

export default async function DashboardPage() {
  const headerList = await headers()
  const session = await auth.api.getSession({
    headers: headerList,
  })

  if (!session) {
    redirect("/auth/sign-in")
  }

  let reviewsCount = 0
  let successfulReviewsCount = 0
  let failedReviewsCount = 0

  try {
    const { data } = await axios.get<ReviewsStats>(`${baseUrl}/api/reviews`, {
      headers: { Cookie: headerList.get("cookie") ?? "" },
    })
    reviewsCount = data.reviewsCount ?? 0
    successfulReviewsCount = data.successfulReviewsCount ?? 0
    failedReviewsCount = data.failedReviewsCount ?? 0
  } catch {
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Ready to review a pull request?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Submit a GitHub PR URL, generate an AI review, and keep the full review history
          here for your dashboard.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Reviews requested</p>
          <p className="mt-3 text-3xl font-semibold">{reviewsCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-3 text-3xl font-semibold">{successfulReviewsCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Failed</p>
          <p className="mt-3 text-3xl font-semibold">{failedReviewsCount}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-3xl">Recent Reviews</h1>
      </div>
    </div>
  )
}
