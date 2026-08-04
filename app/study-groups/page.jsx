import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Study Groups · CampusHub AI",
  description: "Join peer study circles, course discussion channels, and exam prep groups.",
}

export default function StudyGroupsPage() {
  return <DashboardShell initialTab="Study Groups" />
}
