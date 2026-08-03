import {
  ListChecks,
  Users,
  Trophy,
  CalendarDays,
  Library,
  Bell,
} from "lucide-react"

const features = [
  {
    icon: ListChecks,
    title: "AI Quizzes & Flashcards",
    desc: "Topic-wise MCQs across difficulty levels with instant feedback and AI explanations for every answer.",
  },
  {
    icon: Library,
    title: "Academic Library",
    desc: "Subject, department, and semester organization with previews, downloads, bookmarks, and reading progress.",
  },
  {
    icon: Users,
    title: "Social Learning",
    desc: "A notes feed with upvotes, comments, study groups, group discussions, and follow-your-teacher.",
  },
  {
    icon: CalendarDays,
    title: "Collaboration",
    desc: "Book teacher sessions with approval workflows, Google Meet links, history, and peer learning requests.",
  },
  {
    icon: Trophy,
    title: "Gamification",
    desc: "Study streaks, achievement badges, points, weekly challenges, and campus-wide leaderboards.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    desc: "Instant alerts for quiz-ready, session updates, comments, and AI teacher recommendations.",
  },
]

export function FeatureGrid() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            The full stack of learning
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Everything your campus needs, in one hub
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
