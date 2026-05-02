import { auth, prisma } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import axios from "axios"

function parseGithubPrUrl(input: string): { owner: string; repo: string; prNumber: number } | null {
  const m = input.trim().match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/i)
  if (!m) return null
  return { owner: m[1], repo: m[2], prNumber: parseInt(m[3], 10) }
}

type GitHubPull = { title: string; html_url: string }

async function fetchPullRequest(
  accessToken: string,
  owner: string,
  repo: string,
  prNumber: number
): Promise<GitHubPull | null> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 0 },
    }
  )
  if (!res.ok) return null
  return (await res.json()) as GitHubPull
}

export async function POST(request: Request) {
  const { url } = await request.json()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { accessToken } = await auth.api.getAccessToken({
    body: {
      providerId: "github",
    },
    headers: await headers(),
  })

  if (!accessToken || !session) {
    return NextResponse.json(
      { error: "GitHub account is not connected" },
      { status: 401 }
    )
  }

  const parsed = typeof url === "string" ? parseGithubPrUrl(url) : null
  if (!parsed) {
    return NextResponse.json(
      { error: "Invalid GitHub pull request URL" },
      { status: 400 }
    )
  }

  const prMeta = await fetchPullRequest(accessToken, parsed.owner, parsed.repo, parsed.prNumber)
  if (!prMeta) {
    return NextResponse.json(
      { error: "Could not load pull request from GitHub" },
      { status: 404 }
    )
  }

  const backendUrl = process.env.NEXT_PUBLIC_FASTAPI_SERVER_URL
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Review service URL is not configured" },
      { status: 500 }
    )
  }

  const response = await axios.post<{
    commentUrl?: string
    review?: string
    error?: string
  }>(
    `${backendUrl}/review`,
    { url: prMeta.html_url },
    {
      headers: {
        "x-github-token": accessToken,
      },
    }
  )

  const reviewText = response.data.review
  if (!reviewText || response.data.error) {
    return NextResponse.json(
      { error: response.data.error ?? "Review generation failed" },
      { status: 502 }
    )
  }

  await prisma.review.create({
    data: {
      userId: session.user.id,
      title: prMeta.title,
      url: prMeta.html_url,
      repoOwner: parsed.owner,
      repoName: parsed.repo,
      prNumber: parsed.prNumber,
      generatedReview: reviewText,
      commentUrl: response.data.commentUrl ?? null,
      status: "COMPLETED",
    },
  })

  return NextResponse.json({
    review: reviewText,
    commentUrl: response.data.commentUrl,
  })
}
