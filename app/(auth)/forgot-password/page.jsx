"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Loader2, Send } from "lucide-react"
import { AuthCardShell } from "@/components/auth/auth-card-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!identifier) {
      setError("Please enter your email or student ID.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-otp?email=${encodeURIComponent(identifier)}`)
    }, 1000)
  }

  return (
    <AuthCardShell
      title="Forgot Password?"
      description="Enter your email or student ID and we'll send you a code to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive font-medium text-center">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Email / Student ID</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
            <Input
              type="text"
              placeholder="Enter your email or student ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="pl-10 h-11 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-sm font-semibold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending OTP...
            </>
          ) : (
            "Send OTP"
          )}
        </Button>
      </form>

      {/* Mail Illustration Graphic matching Mockup */}
      <div className="mt-8 flex flex-col items-center justify-center pt-2 pb-1 text-center">
        <div className="relative flex size-20 items-center justify-center rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-[#5E46E8] border border-indigo-100 dark:border-indigo-900/40 shadow-inner">
          <Send className="size-9 stroke-[1.75] text-[#5E46E8] -rotate-12 translate-x-0.5 -translate-y-0.5" />
          <div className="absolute -top-1 -right-1 size-3 rounded-full bg-[#5E46E8] animate-ping" />
        </div>
      </div>
    </AuthCardShell>
  )
}
