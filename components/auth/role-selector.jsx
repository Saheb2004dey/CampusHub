"use client"

import { GraduationCap, Presentation, ShieldPlus } from "lucide-react"

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Access study materials, connect with peers and track your progress.",
    icon: GraduationCap,
    iconBg: "bg-purple-100 dark:bg-purple-950/60 text-[#5E46E8] border-purple-200",
    buttonBg: "bg-[#5E46E8] hover:bg-[#4E36D8] text-white",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Manage courses, share resources and engage with students.",
    icon: Presentation,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/60 text-[#16A34A] border-emerald-200",
    buttonBg: "bg-[#16A34A] hover:bg-[#15803D] text-white",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Manage users, oversee activities and system settings.",
    icon: ShieldPlus,
    iconBg: "bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] border-orange-200",
    buttonBg: "bg-[#EA580C] hover:bg-[#C2410C] text-white",
  },
]

export function RoleSelector({ onSelectRole }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
      {roles.map((role) => {
        const Icon = role.icon

        return (
          <div
            key={role.id}
            className="flex flex-col justify-between items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-5 text-center transition-all hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className="flex flex-col items-center space-y-3">
              {/* Circular Role Icon */}
              <div className={`flex size-14 items-center justify-center rounded-full border ${role.iconBg} shadow-sm`}>
                <Icon className="size-7 stroke-[1.75]" />
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">{role.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed px-1">
                  {role.description}
                </p>
              </div>
            </div>

            {/* Action Register Button */}
            <button
              type="button"
              onClick={() => onSelectRole(role.id)}
              className={`mt-6 w-full h-10 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95 ${role.buttonBg}`}
            >
              Register
            </button>
          </div>
        )
      })}
    </div>
  )
}
