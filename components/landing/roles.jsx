"use client"

import { useState } from "react"
import { GraduationCap, Presentation, ShieldCheck, Check } from "lucide-react"

const roles = [
  {
    id: "student",
    label: "Students",
    icon: GraduationCap,
    headline: "Study smarter, doubt-free.",
    desc: "Everything a learner needs to move from confusion to confidence.",
    points: [
      "Ask doubts and get cited, confidence-scored answers",
      "Auto-generated MCQs and flashcards from your notes",
      "Personalized weak-topic dashboard and revision plans",
      "Streaks, badges, points, and subject leaderboards",
    ],
  },
  {
    id: "teacher",
    label: "Teachers",
    icon: Presentation,
    headline: "Amplify your reach.",
    desc: "Share expertise, get discovered, and mentor where it matters.",
    points: [
      "Rich profile with expertise, subjects, and availability",
      "Get recommended to students when AI confidence is low",
      "Approve session bookings with Google Meet integration",
      "Collect ratings and written reviews from learners",
    ],
  },
  {
    id: "admin",
    label: "Admins",
    icon: ShieldCheck,
    headline: "Govern with confidence.",
    desc: "Full control over content, users, and platform health.",
    points: [
      "Centralized dashboard with user and content management",
      "Content moderation, reports, and audit logs",
      "Role-based access control and secure file uploads",
      "Rate limiting, input validation, and API monitoring",
    ],
  },
]

export function Roles() {
  const [active, setActive] = useState("student")
  const current = roles.find((r) => r.id === active) || roles[0]

  return (
    <section id="roles" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Built for everyone
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            One platform, three tailored experiences
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="User roles">
          {roles.map((role) => {
            const selected = role.id === active
            return (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(role.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                <role.icon className="size-4" aria-hidden="true" />
                {role.label}
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid items-center gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <current.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {current.headline}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
              {current.desc}
            </p>
          </div>

          <ul className="grid gap-3">
            {current.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
