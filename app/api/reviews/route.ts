import { Review } from "@/generated/prisma/client"
import { auth, prisma } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { format } from "date-fns"

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.json({ error: "Not logged in" }, { status: 403 })
  }

  const reviews = await prisma.review.findMany({
    where: { userId: session.user.id },
  })

  const successfulReviews = await prisma.review.findMany({
    where: {
      userId: session.user.id,
      status: "COMPLETED",
    },
  })

  const failedReviews = await prisma.review.findMany({
    where: {
      userId: session.user.id,
      status: "FAILED",
    },
  })

  const recentReviews = await prisma.review.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  })

  const formattedRecentReviews = recentReviews.map((recentReview: Review) => ({
    id : recentReview.id,
    prUrl: recentReview.url,
    status: recentReview.status,
    date: format(recentReview.createdAt, "PPP"),
  }))

  const formattedAllReviews = reviews.map((review) => ({
    id : review.id,
    prUrl: review.url,
    status: review.status,
    date: format(review.createdAt, "PPP"),
  }))

  return NextResponse.json({
    reviewsCount: reviews.length,
    successfulReviewsCount: successfulReviews.length,
    failedReviewsCount: failedReviews.length,
    recentReviews: formattedRecentReviews,
    allReviews: formattedAllReviews,
  })
}
