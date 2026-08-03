"use client"

import { Users, Flag, ShieldCheck, FileText, Check, X, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatCard } from "./stat-card"

const moderation = [
  { title: "Unit-3 Notes.pdf", by: "user_2481", reason: "Reported: possible copyright", severity: "high" },
  { title: "Comment on 'DP Patterns'", by: "user_9932", reason: "Reported: spam link", severity: "medium" },
  { title: "OS Cheatsheet.docx", by: "user_1120", reason: "Auto-flagged: low quality", severity: "low" },
]

const logs = [
  { actor: "Dr. Meera Iyer", action: "Uploaded content 'Graph Theory.pdf'", time: "2m ago" },
  { actor: "System", action: "Rate limit triggered for user_5521", time: "18m ago" },
  { actor: "Rohan Verma", action: "Approved teacher application", time: "1h ago" },
  { actor: "System", action: "Nightly backup completed", time: "3h ago" },
]

const severityColor = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-chart-3/15 text-chart-3",
  low: "bg-muted text-muted-foreground",
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Platform overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            7 items awaiting moderation. All systems operational.
          </p>
        </div>
        <Button variant="outline" className="gap-2 self-start md:self-auto">
          <ShieldCheck className="h-4 w-4" />
          Export audit log
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Total users" value="3,842" trend="+124" />
        <StatCard icon={FileText} label="Notes indexed" value="12.4k" trend="+380" accent="accent" />
        <StatCard icon={Flag} label="Pending reports" value="7" trend="needs review" />
        <StatCard icon={ShieldCheck} label="Uptime" value="99.9%" trend="30 days" accent="accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between px-6">
            <h2 className="font-display text-lg font-semibold">Content moderation queue</h2>
            <Badge variant="secondary">{moderation.length} flagged</Badge>
          </div>
          <div className="divide-y divide-border">
            {moderation.map((m) => (
              <div key={m.title} className="flex items-center gap-3 px-6 py-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${severityColor[m.severity]}`}>
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.reason} · {m.by}</p>
                </div>
                <div className="flex gap-1.5">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" className="h-8 w-8 bg-destructive text-primary-foreground hover:bg-destructive/90">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 px-6">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Audit log</h2>
          </div>
          <div className="space-y-3 px-6">
            {logs.map((l, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{l.actor}</span> {l.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{l.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
