import { ArrowRight, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerCols = [
  {
    title: "Product",
    links: ["Knowledge Base", "AI Quizzes", "Agentic AI", "Analytics"],
  },
  {
    title: "For",
    links: ["Students", "Teachers", "Admins", "Departments"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Status"],
  },
]

export function CtaFooter() {
  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Ready to give your campus an AI brain?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Upload your first notes and start solving doubts in minutes.
                Free for students, powerful for institutions.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="secondary" className="group">
                  Get started free
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
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <a href="#" className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-lg font-bold tracking-tight">
                  CampusHub <span className="text-primary">AI</span>
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                The AI-powered learning platform that turns campus knowledge
                into answers.
              </p>
            </div>

            {footerCols.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CampusHub AI. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built for students, teachers, and admins.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
