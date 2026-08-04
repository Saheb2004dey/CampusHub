import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "AI Quizzes · CampusHub AI",
  description: "Adaptive AI-generated practice quizzes and weak topic challenges.",
}

export default function AiQuizzesPage() {
  return <DashboardShell initialTab="AI Quizzes" />
}
