import {
  UserCheck,
  TrendingDown,
  CalendarClock,
  Target,
  Compass,
  Brain,
} from "lucide-react"

const agents = [
  {
    icon: UserCheck,
    title: "Teacher Recommendation Agent",
    desc: "When answer confidence dips below 60%, it routes you to the best-matched teacher for that topic.",
    span: "lg:col-span-2",
  },
  {
    icon: TrendingDown,
    title: "Weak Topic Detection",
    desc: "Analyzes repeated questions, quiz mistakes, and low-confidence answers to surface your weak subjects.",
    span: "",
  },
  {
    icon: Target,
    title: "Exam Predictor",
    desc: "Predicts high-probability topics from previous papers, note importance, and question frequency.",
    span: "",
  },
  {
    icon: CalendarClock,
    title: "AI Revision Planner",
    desc: "Builds daily and exam-ready study schedules tuned to your weak areas and deadlines.",
    span: "",
  },
  {
    icon: Compass,
    title: "Study Recommendation Agent",
    desc: "Suggests the right notes, quizzes, and teachers based on where you're actually struggling.",
    span: "",
  },
  {
    icon: Brain,
    title: "AI Learning Companion",
    desc: "A personal mentor that remembers your weak topics, habits, and learning style to guide you over time.",
    span: "lg:col-span-3",
    highlight: true,
  },
]

export function AgenticAi() {
  return (
    <section id="agents" className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Agentic AI
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Autonomous agents that think ahead for you
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Beyond answering questions, CampusHub&apos;s agents watch your
            progress and act — spotting gaps, planning revision, and connecting
            you to help before you ask.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.title}
              className={`rounded-2xl border p-6 transition-colors ${agent.span} ${
                agent.highlight
                  ? "border-primary/30 bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              <span
                className={`flex size-11 items-center justify-center rounded-xl ${
                  agent.highlight
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "bg-accent/12 text-accent"
                }`}
              >
                <agent.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {agent.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  agent.highlight
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {agent.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
