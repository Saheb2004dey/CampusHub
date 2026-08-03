import {
  Upload,
  ScanText,
  Boxes,
  Search,
  MessageSquareQuote,
  BadgeCheck,
} from "lucide-react"

const pipeline = [
  {
    icon: Upload,
    title: "Upload anything",
    desc: "Drop in PDF, PPT, or DOCX. Notes from students and teachers all land in one place.",
  },
  {
    icon: ScanText,
    title: "Auto-processing",
    desc: "Text extraction, cleaning, and smart chunking happen automatically on every upload.",
  },
  {
    icon: Boxes,
    title: "Vector storage",
    desc: "Embeddings are generated and stored in a vector database ready for instant retrieval.",
  },
  {
    icon: Search,
    title: "Semantic search",
    desc: "Ask questions in plain English and find the exact chunks that matter — not keywords.",
  },
  {
    icon: MessageSquareQuote,
    title: "RAG answers",
    desc: "Answers are grounded strictly in your notes, with every claim traced to its source.",
  },
  {
    icon: BadgeCheck,
    title: "Cited & scored",
    desc: "Each response ships with page-level citations and an honest AI confidence score.",
  },
]

export function KnowledgeBase() {
  return (
    <section id="features" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            AI Knowledge Base
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            A retrieval engine trained on your syllabus
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            No hallucinations, no generic web answers. CampusHub only speaks
            from the notes your campus actually uses — and always shows its work.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pipeline.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
