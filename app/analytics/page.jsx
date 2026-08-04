import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Analytics · CampusHub AI",
  description: "Track your academic performance, weak topic trends, and study metrics.",
}

export default function AnalyticsPage() {
  return <DashboardShell initialTab="Analytics" />
}
