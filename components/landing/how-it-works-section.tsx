import { GitPullRequest, Cpu, MessageSquare } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: GitPullRequest,
    title: "Select a Pull Request",
    description:
      "Sign in with GitHub, pick any repo, and choose an open pull request from the dropdown.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Analyses the Diff",
    description:
      "Our LangGraph agent fetches the diff, parses every hunk, and runs a multi-pass review for security, bugs, and style.",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Review Posted to GitHub",
    description:
      "A detailed Markdown review is generated and posted as a comment on your pull request - automatically.",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative border-y border-white/4 bg-card/30 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Three steps. Zero friction.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From pull request to posted review in under a minute.
          </p>
        </div>

        <div className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute top-10 right-[16.67%] left-[16.67%] hidden h-px bg-linear-to-r from-transparent via-primary/30 to-transparent md:block" />

          {steps.map((item) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {/* Step number circle */}
              <div className="relative mb-6 flex size-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/5 ring-1 ring-primary/15" />
                <div className="absolute inset-2 rounded-full bg-background ring-1 ring-white/6" />
                <item.icon className="relative z-10 size-7 text-primary" />
              </div>

              <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary/60">
                Step {item.step}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
