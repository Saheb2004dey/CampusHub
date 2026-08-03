"use client"

import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { navByRole } from "@/lib/dashboard-data"

export function DashboardSidebar({ role, activeTab = "Dashboard", onSelectTab }) {
  const items = navByRole[role] || []

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div
        className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => onSelectTab?.("Dashboard")}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <span className="font-display text-lg font-semibold tracking-tight text-sidebar-foreground">
          CampusHub<span className="text-accent"> AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.label
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelectTab?.(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    isActive
                      ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                      : "bg-accent/15 text-accent",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent p-3">
          <p className="text-xs font-semibold text-sidebar-accent-foreground">AI Learning Companion</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your personal mentor is tracking 3 weak topics this week.
          </p>
        </div>
      </div>
    </aside>
  )
}
