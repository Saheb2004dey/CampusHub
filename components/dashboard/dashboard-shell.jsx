"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardTopbar } from "./dashboard-topbar"
import { StudentDashboard } from "./student-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { DoubtSolver } from "./doubt-solver"

export function DashboardShell() {
  const [role, setRole] = useState("student")
  const [activeTab, setActiveTab] = useState("Dashboard")

  const handleRoleChange = (newRole) => {
    setRole(newRole)
    setActiveTab("Dashboard")
  }

  const handleNavigate = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DashboardSidebar role={role} activeTab={activeTab} onSelectTab={handleNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar role={role} onRoleChange={handleRoleChange} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "AI Doubt Solver" ? (
            <DoubtSolver />
          ) : (
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
