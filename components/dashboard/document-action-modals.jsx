"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  X,
  FileText,
  Eye,
  Download,
  Sparkles,
  HelpCircle,
  Send,
  Loader2,
  CheckCircle2,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Printer,
  Brain,
  ListChecks,
  Copy,
  Check,
} from "lucide-react"

/* ==========================================================================
   1. DOCUMENT PREVIEW MODAL
   ========================================================================== */
export function DocumentPreviewModal({ isOpen, onClose, doc }) {
  const [zoom, setZoom] = useState(100)

  if (!isOpen || !doc) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-200">
      <Card className="bg-card border-border/80 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/60 bg-muted/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${doc.iconBg || "bg-red-500/10 text-red-500"}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-foreground font-display truncate">
                  {doc.title}
                </h2>
                {doc.category && (
                  <span className="rounded-md px-2 py-0.5 font-semibold text-[11px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60">
                    {doc.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                <span className="font-semibold text-foreground/80">{doc.subject}</span>
                <span>•</span>
                <span>{doc.fileType}</span>
                <span>•</span>
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>{doc.pageCount || "24 pages"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-muted/60 rounded-xl p-1 text-xs">
              <button
                onClick={() => setZoom((z) => Math.max(75, z - 15))}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="px-2 font-mono font-medium">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(150, z + 15))}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-1.5 rounded-xl hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF / Document Reader Viewer Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-muted/20 flex justify-center">
          <div
            className="bg-card border border-border/80 rounded-xl shadow-lg p-6 sm:p-10 w-full max-w-2xl transition-all duration-150 space-y-6 text-foreground"
            style={{ zoom: `${zoom}%` }}
          >
            {/* Title Header */}
            <div className="border-b border-border/60 pb-4 space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                CAMPUSHUB AI INDEXED
              </div>
              <h1 className="text-2xl font-bold font-display">{doc.title}</h1>
              <p className="text-xs text-muted-foreground">Course Document • Department of Computer Science & Engineering</p>
            </div>

            {/* Document Content Abstract */}
            <div className="space-y-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <h3 className="text-sm font-bold text-foreground">1. Overview & Core Objectives</h3>
              <p>
                This document outlines the fundamental concepts, algorithms, and practical implementations for{" "}
                <strong className="text-foreground">{doc.title}</strong>. Designed for university semester study and exam revision,
                it covers theoretical foundations, time complexity analysis, and solved past paper questions.
              </p>

              <h3 className="text-sm font-bold text-foreground mt-4">2. Key Topics Covered</h3>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
                <li>Asymptotic notation analysis (Big-O O(n), Omega Ω(n), Theta Θ(n)).</li>
                <li>Dynamic Programming, recursion trees, and memoization patterns.</li>
                <li>Graph algorithms: Breadth-First Search (BFS), Depth-First Search (DFS), and Shortest Path (Dijkstra).</li>
                <li>System optimization techniques, indexing efficiency, and memory structures.</li>
              </ul>

              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900 text-blue-900 dark:text-blue-200 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-600" /> AI Executive Summary
                </p>
                <p>
                  High-frequency exam topic: Dynamic Programming and Divide-and-Conquer algorithms comprise 35% of midterm questions.
                </p>
              </div>
            </div>

            {/* Page Footer Watermark */}
            <div className="pt-8 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Page 1 of {doc.pageCount || "48 pages"}</span>
              <span>CampusHub Knowledge Base</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border/60 bg-card flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl text-xs cursor-pointer">
            Close Preview
          </Button>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-xs gap-1.5 border-border/80 cursor-pointer"
              onClick={() => alert(`Downloading ${doc.title}...`)}
            >
              <Download className="h-3.5 w-3.5 text-muted-foreground" /> Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

/* ==========================================================================
   2. ASK AI MODAL
   ========================================================================== */
/* ==========================================================================
   2. ASK AI MODAL
   ========================================================================== */
export function AskAIModal({ isOpen, onClose, doc }) {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)

  if (!isOpen || !doc) return null

  // Suggested questions requested
  const suggestedQuestions = [
    "Summarize this document",
    "Explain the important topics",
    "What should I study for the exam?",
    "Generate important questions",
  ]

  // Modular RAG query handler structured for future vector backend integration
  const handleSend = (textOverride) => {
    const textToSend = textOverride || query
    if (!textToSend.trim() || isThinking) return

    // 1. Append User Message
    const userMsg = { sender: "user", text: textToSend }
    setMessages((prev) => [...prev, userMsg])
    setQuery("")
    setIsThinking(true)

    // 2. Structured RAG Payload (ready for RAG API hook)
    const ragPayload = {
      documentId: doc.id,
      documentTitle: doc.title,
      category: doc.category,
      subject: doc.subject,
      userQuery: textToSend,
    }

    // 3. Simulated RAG AI Response
    setTimeout(() => {
      let aiResponseText = ""
      const qLower = textToSend.toLowerCase()

      if (qLower.includes("summarize") || qLower.includes("summary")) {
        aiResponseText = `### Executive Summary of **${doc.title}** (${doc.category})\n\n1. **Primary Objective**: Outlines foundational concepts and practical implementations in **${doc.subject}**.\n2. **Core Takeaways**: High-frequency exam topics, time complexity analysis, and solved past paper exercises.\n3. **Summary**: Highly recommended for quick revision before midterms.`
      } else if (qLower.includes("important topics") || qLower.includes("explain")) {
        aiResponseText = `### Important Topics Covered in **${doc.title}**:\n\n- **Module 1**: Asymptotic Notation & Algorithmic Efficiency Bounds.\n- **Module 2**: Dynamic Programming, Memoization Trees, and Recursion.\n- **Module 3**: Graph Algorithms (BFS, DFS, Dijkstra Shortest Path).\n- **Module 4**: Database Normalization & System Optimization.`
      } else if (qLower.includes("exam") || qLower.includes("study")) {
        aiResponseText = `### Exam Study Strategy for **${doc.title}**:\n\n1. **High Priority (40% Marks)**: Focus on Unit 3 Dynamic Programming and Graph traversals.\n2. **Formula Revision**: Review Master Theorem recurrence relations and tree height equations.\n3. **Past Papers**: Practice 10-mark long analytical questions from Section B.`
      } else if (qLower.includes("question") || qLower.includes("generate")) {
        aiResponseText = `### Generated Practice Questions from **${doc.title}**:\n\n- **Q1**: What is the worst-case time complexity of QuickSort and how can it be avoided?\n- **Q2**: Differentiate between 3NF and BCNF with a database schema example.\n- **Q3**: Explain Coffman deadlock conditions and Banker's avoidance algorithm.`
      } else {
        aiResponseText = `Based on **${doc.title}** (${doc.category} • ${doc.subject}): The document outlines detailed solutions for "${textToSend}". Key sections emphasize optimal algorithm tradeoffs and practical implementation guidelines.`
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponseText }])
      setIsThinking(false)
    }, 750)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-200">
      <Card className="bg-card border-border/80 rounded-2xl shadow-2xl max-w-xl w-full h-[78vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/60 bg-muted/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-foreground font-display">
                Ask AI about this document
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 truncate">
                <span className="font-semibold text-foreground truncate max-w-[160px] sm:max-w-[200px]">
                  {doc.title}
                </span>
                {doc.category && (
                  <span className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    {doc.category}
                  </span>
                )}
                {doc.subject && (
                  <span className="rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">
                    {doc.subject}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-xl hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages / Welcome View */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-muted/10">
          {messages.length === 0 ? (
            <div className="text-center py-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mx-auto">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">
                  CampusHub Document AI Assistant
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
                  Ask questions, request summaries, or generate exam questions directly from{" "}
                  <strong className="text-foreground">{doc.title}</strong>.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200/60"
                  }`}
                >
                  {msg.sender === "user" ? "You" : <Sparkles className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-card border border-border/70 text-foreground shadow-xs rounded-tl-xs"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-semibold p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing document context & generating response...</span>
            </div>
          )}
        </div>

        {/* Suggested Questions & Input Form */}
        <div className="p-3.5 border-t border-border/60 bg-card space-y-2.5">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium">Suggested Questions:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {suggestedQuestions.map((qText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qText)}
                  className="rounded-xl border border-purple-200/80 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 font-medium px-2.5 py-1 hover:bg-purple-100/60 dark:hover:bg-purple-900/60 shrink-0 transition-colors cursor-pointer"
                >
                  {qText}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about this document..."
              className="flex-1 h-10 rounded-xl border-border/70 bg-card text-xs md:text-sm"
            />
            <Button
              type="submit"
              disabled={!query.trim() || isThinking}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-10 px-4 gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
            >
              <Send className="h-3.5 w-3.5" /> Ask AI
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}

/* ==========================================================================
   3. GENERATE QUIZ MODAL
   ========================================================================== */
export function GenerateQuizModal({ isOpen, onClose, doc }) {
  const [numQuestions, setNumQuestions] = useState("10")
  const [difficulty, setDifficulty] = useState("Medium")
  const [questionType, setQuestionType] = useState("MCQ")
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizGenerated, setQuizGenerated] = useState(false)

  if (!isOpen || !doc) return null

  const handleGenerate = () => {
    setIsGenerating(true)

    // Structured RAG Quiz payload (ready for AI API endpoint hook)
    const ragQuizPayload = {
      documentId: doc.id,
      documentTitle: doc.title,
      category: doc.category,
      subject: doc.subject,
      numQuestions: parseInt(numQuestions),
      difficulty,
      questionType,
    }

    setTimeout(() => {
      setIsGenerating(false)
      setQuizGenerated(true)
    }, 1200)
  }

  const handleCloseModal = () => {
    setIsGenerating(false)
    setQuizGenerated(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-200">
      <Card className="bg-card border-border/80 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 relative">
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-foreground font-display">Generate Quiz</h2>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate mt-0.5">
              <span className="font-semibold text-foreground truncate max-w-[160px]">
                {doc.title}
              </span>
              {doc.category && (
                <span className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  {doc.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {!quizGenerated ? (
          <div className="space-y-4">
            {/* Number of Questions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Number of Questions</label>
              <div className="grid grid-cols-3 gap-2">
                {["5", "10", "15"].map((qCount) => (
                  <button
                    key={qCount}
                    type="button"
                    onClick={() => setNumQuestions(qCount)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      numQuestions === qCount
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "border-border/70 bg-card hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {qCount} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2">
                {["Easy", "Medium", "Hard"].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      difficulty === diff
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "border-border/70 bg-card hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Question Type</label>
              <div className="grid grid-cols-1 gap-2">
                {["MCQ"].map((qType) => (
                  <button
                    key={qType}
                    type="button"
                    onClick={() => setQuestionType(qType)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                      questionType === qType
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "border-border/70 bg-card hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>Multiple Choice Questions (MCQ)</span>
                    <Check className="h-4 w-4 text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>

            {isGenerating && (
              <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Extracting document topics & generating {numQuestions} {difficulty} {questionType} questions...</span>
              </div>
            )}
          </div>
        ) : (
          /* Success Screen */
          <div className="space-y-4 text-center py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">Quiz Ready!</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Generated {numQuestions} {difficulty} level {questionType} questions from <strong className="text-foreground">{doc.title}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 text-left space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Sample Question Preview ({questionType})
              </span>
              <p className="text-xs font-medium text-foreground">
                Q1: What is the average-case time complexity of QuickSort algorithm?
              </p>
              <div className="text-[11px] text-muted-foreground grid grid-cols-2 gap-1 pt-1">
                <span>A) O(N²)</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">B) O(N log N) ✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
          <Button variant="outline" size="sm" onClick={handleCloseModal} className="rounded-xl text-xs cursor-pointer">
            {quizGenerated ? "Close" : "Cancel"}
          </Button>
          {!quizGenerated ? (
            <Button
              size="sm"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold gap-1.5 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Brain className="h-3.5 w-3.5" /> Generate Quiz
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                alert(`Starting Quiz for ${doc.title}!`)
                handleCloseModal()
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold gap-1.5 cursor-pointer"
            >
              Start Quiz Now
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

/* ==========================================================================
   4. EXTRACT KEY POINTS MODAL
   ========================================================================== */
export function KeyPointsModal({ isOpen, onClose, doc }) {
  const [copied, setCopied] = useState(false)

  if (!isOpen || !doc) return null

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const keyPoints = [
    {
      title: "Core Problem Definition & Scope",
      desc: "Comprehensive examination of structural efficiency, memory footprint, and asymptotic bounds.",
    },
    {
      title: "Primary Algorithmic Theorems",
      desc: "Master Theorem bounds T(n) = aT(n/b) + O(n^d) and amortized analysis equations.",
    },
    {
      title: "High-Frequency Exam Topics",
      desc: "Graph traversal (BFS/DFS), Shortest Path Dijkstra, and Dynamic Programming Memoization trees.",
    },
    {
      title: "Practical System Implementation",
      desc: "Optimal database index structures (B+ Trees) and CPU caching strategies for modern architecture.",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-200">
      <Card className="bg-card border-border/80 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <ListChecks className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground font-display">Extracted Key Points</h2>
            <p className="text-xs text-muted-foreground truncate max-w-[260px]">
              Document: <span className="font-semibold text-foreground">{doc.title}</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {keyPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-1 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-[11px] font-bold">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-foreground">{pt.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground pl-7 leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="rounded-xl text-xs gap-1.5 border-border/80 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" /> Copy Key Points
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Done
          </Button>
        </div>
      </Card>
    </div>
  )
}
