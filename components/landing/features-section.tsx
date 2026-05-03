import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Shield, Bug, Palette, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Security Analysis",
    description:
      "Detect exposed credentials, injection vulnerabilities, and authorization gaps before they reach production.",
    accent: "text-yellow-500",
    glow: "group-hover:shadow-yellow-500/5",
  },
  {
    icon: Bug,
    title: "Bug Detection",
    description:
      "Catch null references, race conditions, off-by-one errors, and unhandled edge cases in every diff.",
    accent: "text-red-400",
    glow: "group-hover:shadow-red-400/5",
  },
  {
    icon: Palette,
    title: "Style & Maintainability",
    description:
      "Ensure consistent naming, proper typing, clean architecture, and adherence to project conventions.",
    accent: "text-blue-400",
    glow: "group-hover:shadow-blue-400/5",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get comprehensive reviews in seconds, posted directly as a comment on your pull request. No waiting.",
    accent: "text-primary",
    glow: "group-hover:shadow-primary/5",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 sm:py-32">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Features
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for better reviews
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            PRism covers security, correctness, and style - so you can focus on
            building, not reviewing.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`group border-white/6 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:shadow-xl ${feature.glow}`}
            >
              <CardHeader>
                <div className={`mb-2 ${feature.accent}`}>
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="text-base normal-case tracking-tight">
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
