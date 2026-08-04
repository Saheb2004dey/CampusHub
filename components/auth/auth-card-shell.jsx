"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, ArrowLeft } from "lucide-react"

export function AuthCardShell({ title, description, children, backHref, backLabel = "Back" }) {
  return (
    <Card className="w-full shadow-lg shadow-indigo-950/5 border-border/80 bg-card rounded-2xl p-2 sm:p-4">
      <CardHeader className="space-y-2 pb-4 text-center">
        {/* Card Logo Header */}
        <div className="flex justify-center pb-1">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#5E46E8] text-white shadow-sm">
              <GraduationCap className="size-5" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
              Campus<span className="text-[#5E46E8]">Hub</span>
            </span>
          </Link>
        </div>

        {backHref && (
          <div className="flex justify-start">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              {backLabel}
            </Link>
          </div>
        )}

        <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground sm:text-2xl">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
}
