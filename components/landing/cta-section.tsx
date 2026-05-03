import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="relative py-28 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to ship{" "}
          <span className="bg-linear-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
            better code?
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
          Start reviewing pull requests with AI in seconds. No setup, no
          configuration - just sign in with GitHub and go.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40"
            nativeButton={false}
            render={<Link href="/auth/sign-in" />}
          >
            Get Started Free
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
