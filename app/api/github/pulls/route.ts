import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Octokit } from "octokit"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const owner = searchParams.get("owner")
  const repo = searchParams.get("repo")

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "owner and repo are required" },
      { status: 400 }
    )
  }

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
  const pullRequests = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "open",
    per_page: 50,
  })

  return NextResponse.json({
    pullRequests: pullRequests.data.map((pullRequest) => ({
      id: pullRequest.id,
      number: pullRequest.number,
      title: pullRequest.title,
      url: pullRequest.html_url,
    })),
  })
}
