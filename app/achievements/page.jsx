import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Achievements · CampusHub AI",
  description: "View unlocked study streak badges, quiz certificates, and milestones.",
}

export default function AchievementsPage() {
  return <DashboardShell initialTab="Achievements" />
}
