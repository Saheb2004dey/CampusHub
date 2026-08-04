import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Notifications · CampusHub AI",
  description: "View system alerts, course reminders, and assignment deadlines.",
}

export default function NotificationsPage() {
  return <DashboardShell initialTab="Notifications" />
}
