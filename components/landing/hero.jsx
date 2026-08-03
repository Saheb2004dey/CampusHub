import { ArrowRight, Sparkles, FileText, BadgeCheck, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      {/* subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
            <Sparkles className="size-3.5" aria-hidden="true" />
            RAG-powered doubt solving with source citations
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Turn your class notes into a campus brain.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            CampusHub AI reads your uploaded notes and answers every doubt with
            cited sources and a confidence score. Generate quizzes, get matched
            to the right teacher, and track your growth — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="secondary" className="group">
              Start learning free
              <ArrowRight
                className="ml-1 size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Book a demo
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { value: "12k+", label: "Notes indexed" },
              { value: "94%", label: "Avg. answer confidence" },
              { value: "3 roles", label: "Student · Teacher · Admin" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold">{stat.value}</dd>
                <p className="mt-1 text-xs text-primary-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* Chat mockup */}
        <div className="relative">
          <div className="rounded-2xl border border-primary-foreground/15 bg-card p-4 text-card-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">Ask CampusHub</span>
              </div>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                RAG mode
              </span>
            </div>

            <div className="space-y-4 py-4">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                Explain the difference between TCP and UDP from Unit 3.
              </div>

              <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
                <p>
                  TCP is connection-oriented and guarantees ordered, reliable
                  delivery via acknowledgements, while UDP is connectionless and
                  prioritizes speed over reliability.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
                    <FileText className="size-3" aria-hidden="true" />
                    CN_Unit3.pdf · p.14
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
                    <FileText className="size-3" aria-hidden="true" />
                    Networks_Lecture.pptx · slide 8
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-accent/25 bg-accent/10 px-4 py-2.5">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <BadgeCheck className="size-4 text-accent" aria-hidden="true" />
                  Confidence
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-[92%] rounded-full bg-accent" />
                  </div>
                  <span className="text-sm font-semibold text-accent">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* floating card */}
          <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl sm:block">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Quote className="size-3.5 text-primary" aria-hidden="true" />
              Weak topic detected
            </div>
            <p className="mt-1.5 text-sm font-medium leading-snug">
              You&apos;ve missed 4 questions on Subnetting. Want a focused quiz?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
