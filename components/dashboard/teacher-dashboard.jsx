"use client"

import { Star, CalendarClock, FileText, Users, Check, X, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatCard } from "./stat-card"

const requests = [
  { name: "Aarav Sharma", topic: "Dynamic Programming doubt", when: "Today · 4:00 PM", initials: "AS" },
  { name: "Priya Nair", topic: "DBMS normalization review", when: "Tomorrow · 11:00 AM", initials: "PN" },
  { name: "Karan Gupta", topic: "OS scheduling walkthrough", when: "Wed · 2:30 PM", initials: "KG" },
  { name: "Sneha Rao", topic: "Graph algorithms help", when: "Thu · 5:00 PM", initials: "SR" },
]

const reviews = [
  { name: "Aarav S.", rating: 5, text: "Explained recursion trees so clearly. Finally clicked!" },
  { name: "Priya N.", rating: 5, text: "Super patient and gave great practice problems." },
  { name: "Karan G.", rating: 4, text: "Helpful session, would book again." },
]

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Good afternoon, Dr. Iyer</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have 4 pending session requests and 12 new student questions this week.
          </p>
        </div>
        <Button className="gap-2 self-start bg-primary md:self-auto">
          <FileText className="h-4 w-4" />
          Upload content
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Star} label="Rating" value="4.9" trend="128 reviews" accent="accent" />
        <StatCard icon={Users} label="Students helped" value="214" trend="+18" />
        <StatCard icon={CalendarClock} label="Sessions" value="47" trend="4 pending" />
        <StatCard icon={Sparkles} label="AI referrals" value="63" trend="+9" accent="accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between px-6">
            <h2 className="font-display text-lg font-semibold">Session requests</h2>
            <Badge variant="secondary">{requests.length} pending</Badge>
          </div>
          <div className="divide-y divide-border">
            {requests.map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-6 py-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                    {r.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.topic}</p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">{r.when}</span>
                <div className="flex gap-1.5">
                  <Button size="icon" className="h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 px-6">
            <Star className="h-4 w-4 text-accent" />
            <h2 className="font-display text-lg font-semibold">Recent reviews</h2>
          </div>
          <div className="space-y-3 px-6">
            {reviews.map((rev) => (
              <div key={rev.name} className="rounded-lg border border-border p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{rev.name}</span>
                  <span className="flex items-center gap-0.5 text-accent">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{rev.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
