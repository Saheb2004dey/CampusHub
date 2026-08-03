import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai"
import { retrieve } from "@/lib/knowledge-base"

export const maxDuration = 30

function lastUserText(messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")
  if (!lastUser) return ""
  return lastUser.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join(" ")
}

export async function POST(req) {
  const { messages } = await req.json()

  const query = lastUserText(messages)
  const { sources, confidence } = retrieve(query)

  const context = sources
    .map(
      (s, i) =>
        `[${i + 1}] Source: ${s.title} (${s.subject}, p.${s.page})\n${s.snippet}`,
    )
    .join("\n\n")

  const system = `You are CampusHub AI, a Retrieval-Augmented doubt solver for university students.
Answer the student's question using ONLY the provided course-note context below.
Rules:
- Base every claim strictly on the context. Do NOT use outside knowledge.
- Cite sources inline using bracket notation like [1], [2] that map to the numbered context.
- Be concise, clear, and structured. Use short paragraphs or bullet points.
- If the context does not contain enough information to answer confidently, say so plainly and recommend the student consult a teacher.

Retrieved course-note context:
${context || "No relevant notes were found in the knowledge base."}`

  const result = streamText({
    model: "openai/gpt-4.1-mini",
    system,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      messageMetadata: ({ part }) => {
        // Attach retrieval metadata at the start of the assistant message so
        // the UI can render citations and the confidence score immediately.
        if (part.type === "start") {
          return { sources, confidence }
        }
      },
    }),
  })
}
