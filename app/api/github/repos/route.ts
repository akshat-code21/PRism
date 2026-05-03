import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Octokit } from "octokit"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1", 10)
  const perPage = parseInt(searchParams.get("per_page") || "30", 10)

  const { accessToken } = await auth.api.getAccessToken({
    body: {
      providerId: "github",
    },
    headers: await headers(),
  })

  if (!accessToken) {
    return NextResponse.json(
      { error: "GitHub account is not connected" },
      { status: 401 }
    )
  }

  const octokit = new Octokit({ auth: accessToken })
  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: perPage,
    page,
  })

  const linkHeader = repos.headers.link || ""
  const hasNextPage = linkHeader.includes('rel="next"')

  return NextResponse.json({
    repositories: repos.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
    })),
    hasNextPage,
    page,
  })
}
