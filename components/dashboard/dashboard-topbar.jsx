"use client"

import { Bell, Search, ChevronDown, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { roleMeta } from "@/lib/dashboard-data"

export function DashboardTopbar({
  role,
  onRoleChange,
  onNavigate,
  activeTab,
  sidebarOpen = true,
  onToggleSidebar,
  onToggleMobileSidebar,
}) {
  const meta = roleMeta[role] || roleMeta.student

  return (
    <header className="flex h-16 w-full items-center justify-between gap-3 border-b border-border bg-card/60 px-4 backdrop-blur md:px-6">
      {/* Sidebar Toggle Button (Desktop & Mobile) */}
      <div className="flex items-center gap-2">
        {/* Desktop Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden lg:flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
          title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Sidebar Hamburger Trigger */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="flex lg:hidden h-9.5 w-9.5 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors cursor-pointer"
          aria-label="Open Mobile Sidebar Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Search Input (Desktop) */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Ask anything or search your notes…"
          className="h-10 bg-background pl-9"
          aria-label="Search knowledge base"
        />
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        {/* Role switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-800/80 cursor-pointer">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
            {meta.label}
            <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel>View as role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.keys(roleMeta).map((r) => (
                <DropdownMenuItem key={r} onClick={() => onRoleChange(r)} className="cursor-pointer">
                  {roleMeta[r].label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications button */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/90 bg-slate-50/80 text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800/80 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
              <span className="font-semibold text-sm text-foreground">Notifications</span>
              <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">3 unread</span>
            </div>
            <div className="divide-y divide-border text-sm max-h-72 overflow-y-auto">
              <DropdownMenuItem
                className="p-3 cursor-pointer flex flex-col items-start gap-1 focus:bg-muted/60"
                onClick={() => onNavigate?.("AI Doubt Solver")}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-xs text-foreground">RAG Knowledge Base</span>
                  <span className="text-[10px] text-muted-foreground">10m ago</span>
                </div>
                <p className="text-xs text-muted-foreground">DP_Patterns.pdf indexed & ready for doubt solving.</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer flex flex-col items-start gap-1 focus:bg-muted/60">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-xs text-foreground">Session Request Accepted</span>
                  <span className="text-[10px] text-muted-foreground">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Dr. Meera Iyer confirmed session for today at 4:00 PM.</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer flex flex-col items-start gap-1 focus:bg-muted/60">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-xs text-foreground">Weak Topic Alert</span>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
                <p className="text-xs text-muted-foreground">Dynamic Programming confidence dropped to 42%.</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-slate-50/80 py-1 pl-1 pr-4 dark:border-slate-800 dark:bg-slate-900/60">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-[#1565c0] text-xs font-bold text-white">{meta.initials}</AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold leading-tight text-slate-900 dark:text-slate-100">{meta.name}</p>
            <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-0.5">{meta.detail}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
