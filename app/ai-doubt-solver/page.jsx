import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "AI Doubt Solver · CampusHub AI",
  description: "Instant AI-powered academic doubt solving using your uploaded RAG Knowledge Base.",
}

export default function AiDoubtSolverPage() {
  return <DashboardShell initialTab="AI Doubt Solver" />
}
