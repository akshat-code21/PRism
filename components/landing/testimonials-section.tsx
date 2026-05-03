import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "PRism caught a token leak in our auth module that three reviewers missed. It paid for itself on day one.",
    name: "Arjun Mehta",
    role: "Senior Engineer at Vortex",
    initials: "AM",
  },
  {
    quote:
      "We ship 20+ PRs a day. PRism gives every one a thorough review without burning out our leads. Game changer.",
    name: "Sarah Lin",
    role: "Engineering Manager at Helix",
    initials: "SL",
  },
  {
    quote:
      "The review quality is impressive - it catches real bugs, not just linting nitpicks. Exactly what we needed.",
    name: "David Okafor",
    role: "Full-Stack Dev at Nimbus",
    initials: "DO",
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-white/4 bg-card/20 py-28 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by developers who ship fast
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col rounded-xl border border-white/6 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:shadow-xl hover:shadow-primary/3"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary/80 text-primary/80"
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/4 pt-5">
                {/* Avatar */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary ring-1 ring-primary/20">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none text-foreground">
                    {t.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
