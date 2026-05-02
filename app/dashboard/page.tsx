import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/auth/sign-in")
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
          <p className="mt-3 text-3xl font-semibold">0</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-3 text-3xl font-semibold">0</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Failed</p>
          <p className="mt-3 text-3xl font-semibold">0</p>
        </div>
      </div>
    </div>
  )
}
