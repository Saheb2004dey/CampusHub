"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  GraduationCap,
  MoreVertical,
  User,
  Settings,
  Moon,
  Sun,
  Monitor,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { navByRole, roleMeta } from "@/lib/dashboard-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

export function DashboardSidebar({
  role = "student",
  activeTab,
  onSelectTab,
  isOpen = true,
  mobileOpen = false,
  onCloseMobile,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const items = navByRole[role] || navByRole.student || []
  const meta = roleMeta[role] || roleMeta.student
  const [theme, setTheme] = useState("system")
  const [menuOpen, setMenuOpen] = useState(false)

  const triggerRef = useRef(null)
  const contentRef = useRef(null)

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    if (typeof window === "undefined") return

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  // Toggle handler for 3-dot dropdown button
  const handleTriggerClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen((prev) => !prev)
  }

  // Handle outside click and Escape key press for 3-dot menu
  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event) => {
      const target = event.target
      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return
      }
      setMenuOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  // Handle Escape key press for Mobile Drawer
  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseMobile?.()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [mobileOpen, onCloseMobile])

  // Helper render for navigation items list
  const renderNavItems = () =>
    items.map((item) => {
      const Icon = item.icon
      const isActive = item.href
        ? pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
        : activeTab === item.label

      return (
        <button
          key={item.label}
          type="button"
          onClick={() => {
            if (item.href) {
              router.push(item.href)
            }
            onSelectTab?.(item.label)
            if (mobileOpen) {
              onCloseMobile?.()
            }
          }}
          className={cn(
            "flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all cursor-pointer select-none",
            isActive
              ? "bg-[#1565C0] text-white font-semibold shadow-md shadow-blue-600/20"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 shrink-0 transition-colors",
              isActive ? "text-white stroke-[2]" : "text-slate-500 dark:text-slate-400 stroke-[1.75]"
            )}
          />
          <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>

          {item.badge && (
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-tight transition-colors shrink-0",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-[#D1FAE5] dark:bg-emerald-950/60 text-[#059669] dark:text-emerald-400"
              )}
            >
              {item.badge}
            </span>
          )}
        </button>
      )
    })

  return (
    <>
      {/* Desktop Sidebar: 
          OPEN State: Width 280px (w-70), Main content starts after sidebar.
          CLOSED State: Width 0px (w-0), Main content expands to fill available width.
          Smooth 300ms transition with zero horizontal scrolling.
      */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0 transition-all duration-300 ease-in-out shrink-0 overflow-hidden",
          isOpen ? "w-70 opacity-100" : "w-0 opacity-0 border-r-0"
        )}
      >
        {isOpen && (
          <div className="flex flex-col h-full w-70">
            {/* Header: Logo, Title & 3-Dot Dropdown */}
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5 shrink-0">
              <div
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => router.push("/dashboard")}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1565C0] text-white shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  CampusHub<span className="text-[#10B981] font-bold ml-0.5"> AI</span>
                </span>
              </div>

              {/* 3-Dot Dropdown Menu Trigger */}
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <div ref={triggerRef} onClick={handleTriggerClick}>
                  <DropdownMenuTrigger
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Sidebar Menu Options"
                  >
                    <MoreVertical className="h-4 w-4 stroke-[2]" />
                  </DropdownMenuTrigger>
                </div>

                {/* Floating Dropdown Card */}
                <div ref={contentRef}>
                  <DropdownMenuContent
                    align="end"
                    side="bottom"
                    sideOffset={4}
                    className="w-56 rounded-2xl p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-900/15"
                  >
                    <DropdownMenuGroup className="space-y-0.5">
                      <DropdownMenuItem
                        onClick={() => {
                          onSelectTab?.("Profile")
                          setMenuOpen(false)
                        }}
                        className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70"
                      >
                        <User className="h-4.5 w-4.5 text-slate-700 dark:text-slate-300 stroke-[1.75]" />
                        Profile
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          onSelectTab?.("Settings")
                          setMenuOpen(false)
                        }}
                        className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70"
                      >
                        <Settings className="h-4.5 w-4.5 text-slate-700 dark:text-slate-300 stroke-[1.75]" />
                        Settings
                      </DropdownMenuItem>

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70">
                          <Moon className="h-4.5 w-4.5 text-slate-700 dark:text-slate-300 stroke-[1.75]" />
                          Theme
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent sideOffset={8} className="w-40 rounded-2xl p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl">
                          <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
                            <DropdownMenuRadioItem value="light" className="cursor-pointer text-xs font-semibold rounded-xl px-2.5 py-2">
                              <Sun className="mr-2.5 h-4 w-4 text-amber-500" />
                              Light
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark" className="cursor-pointer text-xs font-semibold rounded-xl px-2.5 py-2">
                              <Moon className="mr-2.5 h-4 w-4 text-indigo-400" />
                              Dark
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="system" className="cursor-pointer text-xs font-semibold rounded-xl px-2.5 py-2">
                              <Monitor className="mr-2.5 h-4 w-4 text-slate-400" />
                              System
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      <DropdownMenuItem
                        onClick={() => {
                          onSelectTab?.("Help & Support")
                          setMenuOpen(false)
                        }}
                        className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70"
                      >
                        <HelpCircle className="h-4.5 w-4.5 text-slate-700 dark:text-slate-300 stroke-[1.75]" />
                        Help & Support
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="my-1.5 bg-slate-100 dark:bg-slate-800" />

                      <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#EF4444] rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30"
                        onClick={() => {
                          setMenuOpen(false)
                          router.push("/login")
                        }}
                      >
                        <LogOut className="h-4.5 w-4.5 text-[#EF4444] stroke-[1.75]" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </div>

            {/* Navigation Items List */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">{renderNavItems()}</nav>

            {/* Profile Section at Bottom */}
            <div className="border-t border-sidebar-border p-3.5 shrink-0">
              <div className="flex items-center gap-3 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-[#1565C0] text-xs font-bold text-white">{meta.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{meta.name}</p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{meta.detail}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Tablet & Mobile Collapsible Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={onCloseMobile}
            aria-label="Close Mobile Sidebar Overlay"
          />

          <div className="relative flex w-70 max-w-[80vw] flex-col bg-sidebar border-r border-sidebar-border shadow-2xl h-full z-10 animate-in slide-in-from-left duration-200">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4 shrink-0">
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => {
                  router.push("/dashboard")
                  onCloseMobile?.()
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1565C0] text-white shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  CampusHub<span className="text-[#10B981] font-bold ml-0.5"> AI</span>
                </span>
              </div>

              <button
                type="button"
                onClick={onCloseMobile}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
                aria-label="Close mobile sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">{renderNavItems()}</nav>

            <div className="border-t border-sidebar-border p-3.5 shrink-0">
              <div className="flex items-center gap-3 rounded-xl p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-[#1565C0] text-xs font-bold text-white">{meta.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{meta.name}</p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{meta.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
