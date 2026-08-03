"use client"

import { useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  Sparkles,
  Send,
  FileText,
  BookOpen,
  UserRound,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const SUGGESTIONS = [
  "What are the four Coffman conditions for deadlock?",
  "Explain the ACID properties of a transaction",
  "Difference between BFS and DFS in graphs",
  "What is 3NF in database normalization?",
]

function confidenceTone(confidence) {
  if (confidence >= 75) return { label: "High confidence", color: "text-accent", bar: "bg-accent" }
  if (confidence >= 60) return { label: "Moderate confidence", color: "text-primary", bar: "bg-primary" }
  return { label: "Low confidence", color: "text-destructive", bar: "bg-destructive" }
}

function ConfidenceBar({ confidence }) {
  const tone = confidenceTone(confidence)
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className={`font-medium ${tone.color}`}>{tone.label}</span>
        <span className="font-mono text-muted-foreground">{confidence}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${tone.bar}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  )
}

function Sources({ meta }) {
  if (!meta.sources || meta.sources.length === 0) return null
  return (
    <div className="mt-4 space-y-2">
      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <FileText className="h-3.5 w-3.5" />
        Sources from your notes
      </p>
      <div className="grid gap-2">
        {meta.sources.map((s, i) => (
          <div
            key={s.id}
            className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-3"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="truncate text-sm font-medium text-foreground">{s.title}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {s.subject}
                </Badge>
                <span className="text-xs text-muted-foreground">p.{s.page}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.snippet}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeacherRecommendation({ meta }) {
  const confidence = meta.confidence ?? 100
  if (confidence >= 60) return null
  const subject = meta.sources?.[0]?.subject ?? "this topic"
  return (
    <Card className="mt-4 border-destructive/30 bg-destructive/5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            AI confidence is low for {subject}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            The Teacher Recommendation Agent suggests connecting with a subject expert for a
            reliable answer.
          </p>
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-card p-2.5">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                RI
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Dr. R. Iyer</p>
              <p className="text-xs text-muted-foreground">Top-rated in {subject} · 4.9 ★</p>
            </div>
            <Button size="sm" variant="outline">
              <UserRound className="mr-1.5 h-3.5 w-3.5" />
              Book session
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function DoubtSolver() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/doubt-solver" }),
  })
  const [input, setInput] = useState("")
  const composingRef = useRef(false)
  const isBusy = status === "submitted" || status === "streaming"

  function submit(text) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed })
    setInput("")
  }

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Doubt Solver</h1>
          <p className="text-sm text-muted-foreground">
            Answers grounded in your uploaded notes, with citations and a confidence score.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto rounded-xl border border-border bg-card p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-foreground text-balance">
              Ask anything from your course notes
            </h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground text-pretty">
              The RAG engine retrieves relevant chunks from your knowledge base before answering,
              so every response is cited and scored.
            </p>
            <div className="mt-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => submit(q)}
                  className="rounded-lg border border-border bg-muted/40 p-3 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const text = message.parts
              .filter((p) => p.type === "text")
              .map((p) => p.text)
              .join("")

            if (message.role === "user") {
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {text}
                  </div>
                </div>
              )
            }

            const meta = message.metadata ?? {}
            return (
              <div key={message.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl rounded-tl-sm border border-border bg-muted/30 px-4 py-3">
                    {text ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {text}
                      </p>
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Retrieving from your notes...
                      </p>
                    )}
                    {typeof meta.confidence === "number" && <ConfidenceBar confidence={meta.confidence} />}
                    <Sources meta={meta} />
                    <TeacherRecommendation meta={meta} />
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(input)
        }}
        className="mt-4"
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onCompositionStart={() => (composingRef.current = true)}
            onCompositionEnd={() => (composingRef.current = false)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !composingRef.current &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                submit(input)
              }
            }}
            rows={1}
            placeholder="Ask a doubt from your notes..."
            className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {isBusy ? (
            <Button type="button" variant="outline" size="sm" onClick={() => stop()}>
              Stop
            </Button>
          ) : (
            <Button type="submit" size="sm" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
