"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Users, BookOpen, Bell, TrendingUp, Quote } from "lucide-react"

export default function AuthLayout({ children }) {
  const pathname = usePathname()

  // Determine top-right navigation link based on current path
  const isRegisterPath = pathname?.includes("/register")

  return (
    <div className="flex min-h-screen w-full bg-[#F8F9FD] dark:bg-background text-foreground">
      {/* Left side hero branding banner (Desktop only) */}
      <div className="relative hidden w-[48%] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#2A2768] to-[#17153B] p-10 lg:flex text-white shadow-2xl">
        {/* Background Decorative Glow & Overlay */}
        <div className="absolute -left-20 -top-20 size-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80')" }}
        />

        {/* Top Branding */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-inner transition-transform group-hover:scale-105">
              <GraduationCap className="size-7 text-white" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Campus<span className="text-[#A5B4FC]">Hub</span>
            </span>
          </Link>
        </div>

        {/* Hero Pitch & Feature List */}
        <div className="relative z-10 my-auto max-w-lg space-y-8 py-6">
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white leading-tight">
              Connect. Learn. Grow.
            </h1>
            <p className="text-indigo-200/90 leading-relaxed text-sm">
              CampusHub is your all-in-one platform for academics, collaboration, events, and campus life.
            </p>
          </div>

          {/* 4 Feature Items */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Connect with People</p>
                <p className="text-xs text-indigo-200/70">Meet peers, teachers and mentors.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10">
                <BookOpen className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Access Resources</p>
                <p className="text-xs text-indigo-200/70">Notes, lectures and study materials.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10">
                <Bell className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Stay Updated</p>
                <p className="text-xs text-indigo-200/70">Events, announcements and deadlines.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10">
                <TrendingUp className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Track Progress</p>
                <p className="text-xs text-indigo-200/70">Monitor your learning and achievements.</p>
              </div>
            </div>
          </div>

          {/* Bottom Quote Banner */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md flex items-center gap-3">
            <Quote className="size-5 text-indigo-300 shrink-0 rotate-180" />
            <p className="text-xs text-indigo-100 font-medium leading-relaxed">
              Empowering students to achieve more, together.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-indigo-300/60">
          © {new Date().getFullYear()} CampusHub Inc. All rights reserved.
        </div>
      </div>

      {/* Right side form wrapper */}
      <div className="flex min-h-screen flex-1 flex-col justify-between px-4 py-6 sm:px-8 lg:px-12">
        {/* Top-Right Header Switcher */}
        {isRegisterPath ? (
          <div className="flex items-center justify-between sm:justify-end py-2">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[#5E46E8] text-white">
                <GraduationCap className="size-5" />
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                Campus<span className="text-[#5E46E8]">Hub</span>
              </span>
            </Link>

            <div className="text-xs font-medium text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#5E46E8] hover:underline">
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-start lg:hidden py-2">
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[#5E46E8] text-white">
                <GraduationCap className="size-5" />
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                Campus<span className="text-[#5E46E8]">Hub</span>
              </span>
            </Link>
          </div>
        )}

        {/* Centered Form Area */}
        <div className="my-auto mx-auto w-full max-w-md lg:max-w-lg py-6">
          {children}
        </div>

        {/* Mobile Footer */}
        <div className="text-center text-xs text-muted-foreground py-2 lg:hidden">
          © {new Date().getFullYear()} CampusHub Inc.
        </div>
      </div>
    </div>
  )
}
