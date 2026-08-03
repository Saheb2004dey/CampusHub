"use client"

import {
  Sparkles,
  Flame,
  Brain,
  TrendingUp,
  BookOpen,
  ArrowRight,
  FileText,
  Quote,
  UserCheck,
  Trophy,
  CalendarClock,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "./stat-card"

const weakTopics = [
  { topic: "Dynamic Programming", subject: "DSA", mastery: 42 },
  { topic: "Normalization (3NF/BCNF)", subject: "DBMS", mastery: 55 },
  { topic: "TCP Congestion Control", subject: "Networks", mastery: 61 },
]

const recommendations = [
  { icon: FileText, title: "Revise: DP Patterns.pdf", meta: "Notes · 12 pages", tag: "Notes" },
  { icon: Brain, title: "Practice DP Quiz — Medium", meta: "10 questions · AI generated", tag: "Quiz" },
  { icon: UserCheck, title: "Book Dr. Meera Iyer", meta: "Expert in Algorithms · 4.9★", tag: "Teacher" },
]

import { useState } from "react"

const initialRevisionPlan = [
  { id: 1, day: "Today", task: "Dynamic Programming — 45 min", done: true },
  { id: 2, day: "Tomorrow", task: "DBMS Normalization — 30 min", done: false },
  { id: 3, day: "Wed", task: "Networks recap quiz — 20 min", done: false },
]

const alternatePlans = [
  [
    { id: 1, day: "Today", task: "Graph Algorithms & BFS — 40 min", done: false },
    { id: 2, day: "Tomorrow", task: "SQL Indexing & Joins — 30 min", done: false },
    { id: 3, day: "Wed", task: "OS Process Synchronization — 25 min", done: false },
  ],
  [
    { id: 1, day: "Today", task: "Dynamic Programming Patterns — 50 min", done: true },
    { id: 2, day: "Tomorrow", task: "TCP 3-Way Handshake — 35 min", done: false },
    { id: 3, day: "Wed", task: "B-Trees & B+ Trees — 30 min", done: false },
  ],
]

export function StudentDashboard({ onNavigate }) {
  const [plan, setPlan] = useState(initialRevisionPlan)
  const [isGenerating, setIsGenerating] = useState(false)
  const [planIndex, setPlanIndex] = useState(0)

  const handleRegeneratePlan = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const nextIndex = (planIndex + 1) % alternatePlans.length
      setPlanIndex(nextIndex)
      setPlan(alternatePlans[nextIndex])
      setIsGenerating(false)
    }, 450)
  }

  const toggleTaskDone = (id) => {
    setPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-balance">Welcome back, Aarav</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your AI companion has prepared today&apos;s focus plan and flagged 3 weak topics.
          </p>
        </div>
        <Button
          onClick={() => onNavigate?.("AI Doubt Solver")}
          className="gap-2 self-start bg-primary hover:bg-primary/90 md:self-auto cursor-pointer transition-all active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          Ask a doubt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Flame} label="Study streak" value="14 days" trend="+3" accent="accent" />
        <StatCard icon={Brain} label="Quizzes taken" value="38" trend="+6 this week" />
        <StatCard icon={TrendingUp} label="Avg. confidence" value="87%" trend="+9%" accent="accent" />
        <StatCard icon={Trophy} label="Points" value="2,480" trend="Rank #7" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* RAG doubt solver preview */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="font-display text-lg font-semibold">AI Doubt Solver</h2>
            </div>
            <Badge variant="secondary" className="gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              RAG · Grounded
            </Badge>
          </div>

          <div className="space-y-4 px-6 my-auto">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm">
              Explain how memoization reduces time complexity in the Fibonacci problem.
            </div>

            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              <p className="leading-relaxed">
                Memoization caches results of subproblems, so each Fibonacci value is computed once. This cuts the
                naive recursion from exponential
                {" "}
                <span className="rounded bg-background px-1 font-mono text-xs">O(2^n)</span> down to linear
                {" "}
                <span className="rounded bg-background px-1 font-mono text-xs">O(n)</span> time.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Quote className="h-3 w-3" /> Sources:
                </span>
                <Badge variant="outline" className="text-xs">DP_Patterns.pdf · p.4</Badge>
                <Badge variant="outline" className="text-xs">Algo_Notes.pdf · p.11</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Confidence</span>
                <Progress value={92} className="h-1.5 max-w-[140px]" />
                <span className="text-xs font-semibold text-accent">92%</span>
              </div>
            </div>
          </div>

          <div className="px-6 pt-4 pb-6">
            <Button
              onClick={() => onNavigate?.("AI Doubt Solver")}
              variant="outline"
              className="w-full gap-2 cursor-pointer hover:bg-primary/5 hover:text-primary transition-all active:scale-[0.99]"
            >
              Continue conversation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Revision planner */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center gap-2 px-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <CalendarClock className="h-4 w-4" />
            </span>
            <h2 className="font-display text-lg font-semibold">AI Revision Planner</h2>
          </div>
          <div className="space-y-3 px-6 my-auto">
            {plan.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleTaskDone(item.id)}
                className="flex items-start gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-secondary/60 transition-colors"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all ${
                    item.done
                      ? "border-accent bg-accent text-accent-foreground font-bold"
                      : "border-border text-muted-foreground group-hover:border-primary"
                  }`}
                >
                  {item.done ? "✓" : ""}
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{item.day}</p>
                  <p className={`text-sm ${item.done ? "line-through text-muted-foreground" : "text-foreground font-medium"}`}>
                    {item.task}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pt-4 pb-6">
            <Button
              onClick={handleRegeneratePlan}
              disabled={isGenerating}
              variant="secondary"
              className="w-full cursor-pointer transition-all active:scale-[0.99]"
            >
              {isGenerating ? "Regenerating..." : "Regenerate plan"}
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weak topics */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between px-6">
            <h2 className="font-display text-lg font-semibold">Weak topics detected</h2>
            <Badge variant="secondary">Weak Topic Agent</Badge>
          </div>
          <div className="space-y-4 px-6">
            {weakTopics.map((t) => (
              <div
                key={t.topic}
                onClick={() => onNavigate?.("AI Doubt Solver")}
                className="cursor-pointer group p-2 rounded-xl hover:bg-secondary/40 transition-colors"
              >
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium group-hover:text-primary transition-colors">{t.topic}</span>
                  <span className="text-muted-foreground">{t.subject} · {t.mastery}%</span>
                </div>
                <Progress value={t.mastery} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card>
          <div className="flex items-center gap-2 px-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Recommended next</h2>
          </div>
          <div className="space-y-2 px-6">
            {recommendations.map((r) => {
              const Icon = r.icon
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => {
                    if (r.tag === "Teacher") onNavigate?.("Teachers")
                    else if (r.tag === "Quiz") onNavigate?.("AI Quizzes")
                    else onNavigate?.("AI Doubt Solver")
                  }}
                  className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-all hover:bg-secondary hover:border-primary/40 cursor-pointer active:scale-[0.99]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.meta}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
