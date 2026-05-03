import RepoSelect from "@/components/repo-select"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { GitBranch } from "lucide-react"

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
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <div className="text-center">
          <GitBranch className="mx-auto mb-3 size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            Connect your GitHub account to load repositories.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          New Review Request
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Select a repository and pull request - our agent will analyse it.
        </p>
      </div>

      <RepoSelect />
    </div>
  )
}
