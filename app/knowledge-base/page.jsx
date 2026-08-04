import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Knowledge Base · CampusHub AI",
  description: "Access course notes, textbook PDFs, and indexed past papers.",
}

export default function KnowledgeBasePage() {
  return <DashboardShell initialTab="Knowledge Base" />
}
