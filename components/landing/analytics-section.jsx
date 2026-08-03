import { TrendingUp, Flame, Activity } from "lucide-react"

const confidenceTrend = [42, 55, 61, 58, 70, 78, 92]

const heatmap = [
  [2, 1, 3, 0, 1],
  [1, 3, 2, 1, 0],
  [0, 2, 1, 3, 2],
  [3, 1, 0, 2, 1],
]

const heatColors = [
  "bg-muted",
  "bg-accent/25",
  "bg-accent/55",
  "bg-accent",
]

export function AnalyticsSection() {
  return (
    <section id="analytics" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Learning Analytics
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              See your growth, not just your grades
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Weekly reports, subject performance, quiz analytics, study-time
              tracking, and a weak-topic heatmap — so every student and teacher
              knows exactly where to focus next.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Confidence trend over time",
                "Weak-topic heatmap",
                "Subject-wise performance",
                "Study time analytics",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <Activity className="size-4 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard mockup */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Confidence trend
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    <TrendingUp className="size-3.5" aria-hidden="true" />
                    +50%
                  </span>
                </div>
                <div className="mt-4 flex h-24 items-end gap-1.5">
                  {confidenceTrend.map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/80"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Study streak
                  </span>
                  <Flame className="size-4 text-accent" aria-hidden="true" />
                </div>
                <p className="mt-4 font-display text-4xl font-bold">18</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  days in a row
                </p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                        i < 6 ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Weak-topic heatmap
                </span>
                <div className="mt-4 grid gap-1.5">
                  {heatmap.map((row, r) => (
                    <div key={r} className="flex gap-1.5">
                      {row.map((cell, c) => (
                        <span
                          key={c}
                          className={`h-6 flex-1 rounded ${heatColors[cell]}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  {heatColors.map((c, i) => (
                    <span key={i} className={`size-3 rounded ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
