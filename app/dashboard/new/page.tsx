import RepoSelect, { type RepoOption } from "@/components/repo-select"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Octokit } from "octokit"

export default async function NewReviewPage() {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({
    headers: requestHeaders,
  })

  if (!session) {
    redirect("/")
  }

  const { accessToken } = await auth.api.getAccessToken({
    body: {
      providerId: "github",
    },
    headers: requestHeaders,
  })

  if (!accessToken) {
    return (
      <div className="flex h-full w-full items-center justify-center p-5">
        <p className="text-sm text-muted-foreground">
          Connect your GitHub account to load repositories.
        </p>
      </div>
    )
  }

  const octokit = new Octokit({
    auth: accessToken,
  })

  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 20,
  })

  const repositories: RepoOption[] = repos.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
  }))

  return (
    <div className="h-screen w-full p-5">
      <RepoSelect repositories={repositories} />
    </div>
  )
}