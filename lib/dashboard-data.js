import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Brain,
  Users,
  BarChart3,
  Trophy,
  Bell,
  MessagesSquare,
  CalendarClock,
  ShieldCheck,
  FileText,
  Flag,
  ClipboardList,
} from "lucide-react"

export const roleMeta = {
  student: { label: "Student", name: "Aarav Sharma", detail: "B.Tech CSE · Semester 5", initials: "AS" },
  teacher: { label: "Teacher", name: "Dr. Meera Iyer", detail: "Dept. of Computer Science", initials: "MI" },
  admin: { label: "Admin", name: "Rohan Verma", detail: "Platform Administrator", initials: "RV" },
}

export const navByRole = {
  student: [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "AI Doubt Solver", icon: Sparkles, badge: "RAG" },
    { label: "Knowledge Base", icon: BookOpen },
    { label: "AI Quizzes", icon: Brain, badge: "3" },
    { label: "Teachers", icon: Users },
    { label: "Study Groups", icon: MessagesSquare },
    { label: "Analytics", icon: BarChart3 },
    { label: "Achievements", icon: Trophy },
    { label: "Notifications", icon: Bell, badge: "5" },
  ],
  teacher: [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "My Content", icon: FileText },
    { label: "Session Requests", icon: CalendarClock, badge: "4" },
    { label: "Students", icon: Users },
    { label: "Recommendations", icon: Sparkles, badge: "AI" },
    { label: "Reviews", icon: Trophy },
    { label: "Analytics", icon: BarChart3 },
    { label: "Notifications", icon: Bell, badge: "2" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "User Management", icon: Users },
    { label: "Content Moderation", icon: Flag, badge: "7" },
    { label: "Reports", icon: ClipboardList },
    { label: "Audit Logs", icon: ShieldCheck },
    { label: "Knowledge Base", icon: BookOpen },
    { label: "Analytics", icon: BarChart3 },
    { label: "Notifications", icon: Bell, badge: "9" },
  ],
}
