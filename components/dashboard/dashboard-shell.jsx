"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardTopbar } from "./dashboard-topbar"
import { StudentDashboard } from "./student-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { DoubtSolver } from "./doubt-solver"
import {
  User,
  Settings,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Brain,
  Users,
  MessagesSquare,
  BarChart3,
  Trophy,
  Bell,
  FileText,
} from "lucide-react"

export function DashboardShell({ initialTab }) {
  const pathname = usePathname()
  const [role, setRole] = useState("student")
  const [overrideTab, setOverrideTab] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleRoleChange = (newRole) => {
    setRole(newRole)
    setOverrideTab(null)
  }

  const handleNavigate = (tab) => {
    setOverrideTab(tab)
  }

  // Derive current tab from pathname if available, or fallback to overrideTab / initialTab
  const getActiveTab = () => {
    if (overrideTab) return overrideTab
    if (pathname === "/ai-doubt-solver") return "AI Doubt Solver"
    if (pathname === "/knowledge-base") return "Knowledge Base"
    if (pathname === "/ai-quizzes") return "AI Quizzes"
    if (pathname === "/teachers") return "Teachers"
    if (pathname === "/study-groups") return "Study Groups"
    if (pathname === "/analytics") return "Analytics"
    if (pathname === "/achievements") return "Achievements"
    if (pathname === "/notifications") return "Notifications"
    if (initialTab) return initialTab
    return "Dashboard"
  }

  const activeTab = getActiveTab()

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DashboardSidebar
        role={role}
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        isOpen={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
        <DashboardTopbar
          role={role}
          onRoleChange={handleRoleChange}
          onNavigate={handleNavigate}
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* 1. AI Doubt Solver Route */}
          {activeTab === "AI Doubt Solver" && <DoubtSolver />}

          {/* 2. Knowledge Base Route */}
          {activeTab === "Knowledge Base" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <BookOpen className="size-6 text-primary" />
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Academic Knowledge Base</h2>
                      <p className="text-xs text-muted-foreground">Indexed course notes, textbooks, and past papers</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    24 Files Indexed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                  <div className="rounded-xl border border-border p-4 bg-muted/20 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Data Structures & Algorithms</p>
                        <p className="text-xs text-muted-foreground">PDF · 4.2 MB · Updated 2 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/20 hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-emerald-500" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Database Management Systems</p>
                        <p className="text-xs text-muted-foreground">PDF · 3.8 MB · Updated yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. AI Quizzes Route */}
          {activeTab === "AI Quizzes" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Brain className="size-6 text-purple-500" />
                    <div>
                      <h2 className="text-xl font-bold text-foreground">AI Practice Quizzes</h2>
                      <p className="text-xs text-muted-foreground">Adaptive practice sets generated from your syllabus</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                    3 Pending
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between rounded-xl border border-border p-4 bg-muted/10">
                    <div>
                      <p className="text-sm font-bold text-foreground">Dynamic Programming Challenge</p>
                      <p className="text-xs text-muted-foreground">10 Questions · Estimated time: 15 mins</p>
                    </div>
                    <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm">
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Teachers Route */}
          {activeTab === "Teachers" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <Users className="size-6 text-blue-500" />
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Faculty & Mentors Directory</h2>
                    <p className="text-xs text-muted-foreground">Connect with department professors and office hours</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="rounded-xl border border-border p-4 bg-muted/20 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm">
                      MI
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Dr. Meera Iyer</p>
                      <p className="text-xs text-muted-foreground">Dept. Head · Algorithms</p>
                      <p className="text-[11px] text-emerald-600 font-semibold mt-1">Available Today 4-5 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Study Groups Route */}
          {activeTab === "Study Groups" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <MessagesSquare className="size-6 text-emerald-500" />
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Collaborative Study Groups</h2>
                    <p className="text-xs text-muted-foreground">Peer discussion channels and exam prep circles</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between rounded-xl border border-border p-4 bg-muted/10">
                    <div>
                      <p className="text-sm font-bold text-foreground"># cse-algo-prep-2026</p>
                      <p className="text-xs text-muted-foreground">18 Members · 4 Online</p>
                    </div>
                    <button className="rounded-xl border border-border px-3.5 py-1.5 text-xs font-semibold hover:bg-muted">
                      Join Channel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Analytics Route */}
          {activeTab === "Analytics" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <BarChart3 className="size-6 text-indigo-500" />
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Learning Analytics & Progress</h2>
                    <p className="text-xs text-muted-foreground">Automated weak topic tracking and performance metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="rounded-xl border border-border p-4 bg-muted/20">
                    <p className="text-xs text-muted-foreground">Overall Mastery</p>
                    <p className="text-2xl font-extrabold text-foreground mt-1">84%</p>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/20">
                    <p className="text-xs text-muted-foreground">Quizzes Completed</p>
                    <p className="text-2xl font-extrabold text-foreground mt-1">28</p>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/20">
                    <p className="text-xs text-muted-foreground">Study Hours This Week</p>
                    <p className="text-2xl font-extrabold text-foreground mt-1">16.5 hrs</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. Achievements Route */}
          {activeTab === "Achievements" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <Trophy className="size-6 text-amber-500" />
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Badges & Achievements</h2>
                    <p className="text-xs text-muted-foreground">Milestones unlocked on your learning journey</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 p-4 bg-amber-50/50 dark:bg-amber-950/20 flex items-center gap-3">
                    <Trophy className="size-8 text-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-foreground">7-Day Streak</p>
                      <p className="text-xs text-muted-foreground">Daily learner badge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. Notifications Route */}
          {activeTab === "Notifications" && (
            <div className="max-w-4xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Bell className="size-6 text-red-500" />
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Notifications & Alerts</h2>
                      <p className="text-xs text-muted-foreground">System updates, assignment alerts and reminders</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400">
                    5 Total
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <p className="text-sm font-bold text-foreground">RAG Knowledge Base Updated</p>
                    <p className="text-xs text-muted-foreground mt-0.5">DP_Patterns.pdf indexed & ready for doubt solving.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Route */}
          {activeTab === "Profile" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-md">
                    AS
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Aarav Sharma</h2>
                    <p className="text-sm text-muted-foreground">B.Tech Computer Science · Semester 5</p>
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3.5" /> Active Student
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/80 p-3.5 bg-muted/20">
                    <p className="text-xs text-muted-foreground">Student ID</p>
                    <p className="text-sm font-semibold text-foreground">STU-2026-0842</p>
                  </div>
                  <div className="rounded-xl border border-border/80 p-3.5 bg-muted/20">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-foreground">aarav.sharma@student.univ.edu</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Route */}
          {activeTab === "Settings" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <Settings className="size-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Account Settings</h2>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive weekly progress & assignment digests.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 accent-primary" />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">AI Auto-Suggestions</p>
                      <p className="text-xs text-muted-foreground">Show personalized study topic recommendations.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 accent-primary" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help & Support Route */}
          {activeTab === "Help & Support" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <HelpCircle className="size-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Help & Support</h2>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <p className="text-sm font-semibold text-foreground">How does the AI Doubt Solver work?</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Upload your lecture notes or PDF textbooks to ask instant questions powered by CampusHub&apos;s RAG Knowledge Base.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-4 bg-muted/10">
                    <p className="text-sm font-semibold text-foreground">Need Technical Assistance?</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Contact IT Support at <span className="text-primary font-semibold">support@campushub.ai</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Default Role Dashboards */}
          {activeTab === "Dashboard" && (
            <>
              {role === "student" && <StudentDashboard onNavigate={handleNavigate} />}
              {role === "teacher" && <TeacherDashboard />}
              {role === "admin" && <AdminDashboard />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
