import {
  Clock,
  ShieldCheck,
  GitMerge,
  Layers,
  CheckCircle2,
} from "lucide-react"

const reasons = [
  {
    icon: Clock,
    text: "Reviews in under 30 seconds, not hours",
  },
  {
    icon: ShieldCheck,
    text: "Security-first analysis catches what humans miss",
  },
  {
    icon: GitMerge,
    text: "Posts directly to your PR - no context switching",
  },
  {
    icon: Layers,
    text: "Covers security, bugs, and style in one pass",
  },
]

const stats = [
  { value: "< 30s", label: "Average review time" },
  { value: "3", label: "Analysis categories" },
  { value: "100%", label: "Diff coverage" },
]

export default function WhySection() {
  return (
    <section className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why PRism
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Code reviews should be fast, thorough, and automated.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Stop waiting for reviewers. PRism gives every pull request the
              same rigorous analysis - instantly, consistently, and without
              review fatigue.
            </p>

            <div className="mt-10 space-y-5">
              {reasons.map((reason) => (
                <div
                  key={reason.text}
                  className="flex items-center gap-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/15">
                    <reason.icon className="size-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">
                    {reason.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: glowing stats container */}
          <div className="relative">
            {/* Glow behind the card */}
            <div className="absolute -inset-6 rounded-2xl bg-primary/8 blur-3xl" />

            <div className="relative overflow-hidden rounded-xl border border-white/8 bg-card/60 backdrop-blur-xl">
              <div className="h-px w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />

              <div className="divide-y ddivide-white/4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between px-8 py-7">
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="text-3xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom section */}
              <div className="border-t border-white/4 bg-primary/3 px-8 py-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-green-400" />
                  <span>Powered by LangGraph + OpenRouter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
