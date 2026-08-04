import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata = {
  title: "Teachers · CampusHub AI",
  description: "Connect with university faculty, professors, and department mentors.",
}

export default function TeachersPage() {
  return <DashboardShell initialTab="Teachers" />
}
