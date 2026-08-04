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
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "AI Doubt Solver", icon: Sparkles, badge: "RAG", href: "/ai-doubt-solver" },
    { label: "Knowledge Base", icon: BookOpen, href: "/knowledge-base" },
    { label: "AI Quizzes", icon: Brain, badge: "3", href: "/ai-quizzes" },
    { label: "Teachers", icon: Users, href: "/teachers" },
    { label: "Study Groups", icon: MessagesSquare, href: "/study-groups" },
    { label: "Analytics", icon: BarChart3, href: "/analytics" },
    { label: "Achievements", icon: Trophy, href: "/achievements" },
    { label: "Notifications", icon: Bell, badge: "5", href: "/notifications" },
  ],
  teacher: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Content", icon: FileText, href: "/knowledge-base" },
    { label: "Session Requests", icon: CalendarClock, badge: "4", href: "/study-groups" },
    { label: "Students", icon: Users, href: "/teachers" },
    { label: "Recommendations", icon: Sparkles, badge: "AI", href: "/ai-doubt-solver" },
    { label: "Reviews", icon: Trophy, href: "/achievements" },
    { label: "Analytics", icon: BarChart3, href: "/analytics" },
    { label: "Notifications", icon: Bell, badge: "2", href: "/notifications" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "User Management", icon: Users, href: "/teachers" },
    { label: "Content Moderation", icon: Flag, badge: "7", href: "/knowledge-base" },
    { label: "Reports", icon: ClipboardList, href: "/analytics" },
    { label: "Audit Logs", icon: ShieldCheck, href: "/notifications" },
    { label: "Knowledge Base", icon: BookOpen, href: "/knowledge-base" },
    { label: "Analytics", icon: BarChart3, href: "/analytics" },
    { label: "Notifications", icon: Bell, badge: "9", href: "/notifications" },
  ],
}
