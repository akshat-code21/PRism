import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  Bug,
  GitPullRequest,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 size-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 py-24 lg:flex-row lg:items-center lg:gap-20">
        {/* Text content */}
        <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Ship Better Code,{" "}
            <span className="bg-linear-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              Faster.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            PRism analyses your pull requests for security vulnerabilities,
            bugs, and style issues - then posts a detailed review directly
            to GitHub. In seconds, not hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="shadow-lg shadow-primary/25" nativeButton={false} render={<Link href="/auth/sign-in" />}>
              Start Reviewing
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button variant="ghost" size="lg" nativeButton={false} render={<a href="#how-it-works" />}>
              See How It Works
            </Button>
          </div>

          {/* Social proof mini */}
          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary/70" />
            <span>Free to use · No credit card required</span>
          </div>
        </div>

        {/* Floating preview card */}
        <div className="relative w-full max-w-md lg:max-w-sm xl:max-w-md">
          {/* Card glow */}
          <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />

          <div className="relative overflow-hidden border border-white/8 bg-card/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Top accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />

            {/* Card header */}
            <div className="flex items-center gap-3 border-b border-white/6 px-5 py-3.5">
              <div>
                <p className="text-sm font-semibold leading-none text-foreground">
                  AI Code Review
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  acme/web-app · PR #42
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="space-y-4 px-5 py-4 text-sm">
              <div>
                <p className="font-semibold text-foreground">Overview</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Clean implementation of the auth middleware. Low overall risk
                  with one potential security concern.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Shield className="mt-0.5 size-3.5 shrink-0 text-yellow-500" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Security</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    API key exposed in{" "}
                    <code className="rounded bg-muted/60 px-1 py-0.5 text-[10px] text-foreground">
                      config.ts
                    </code>{" "}
                    - move to environment variables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Bug className="mt-0.5 size-3.5 shrink-0 text-red-400" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Bugs & Correctness
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    Null check missing on{" "}
                    <code className="rounded bg-muted/60 px-1 py-0.5 text-[10px] text-foreground">
                      user.session
                    </code>{" "}
                    at line 23.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <GitPullRequest className="mt-0.5 size-3.5 shrink-0 text-green-400" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Style & Maintainability
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    No style issues flagged. Code is clean and well-structured.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between border-t border-white/6 px-5 py-2.5">
              <span className="text-[11px] text-muted-foreground">
                Reviewed in 12s
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-medium text-green-400 ring-1 ring-green-500/20">
                <CheckCircle2 className="size-2.5" />
                Posted to GitHub
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
