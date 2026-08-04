"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Loader2, CheckCircle2 } from "lucide-react"
import { AuthCardShell } from "@/components/auth/auth-card-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <AuthCardShell
      title="Reset Password"
      description="Create a new password for your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive font-medium text-center">
            {error}
          </div>
        )}

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-muted-foreground/70 hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-muted-foreground/70 hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 text-sm font-semibold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

        {/* Success Message Banner matching Mockup */}
        {isSuccess && (
          <div className="space-y-3 pt-2 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 p-3 rounded-xl">
              <CheckCircle2 className="size-4 shrink-0" />
              Password reset successful! You can now login.
            </div>

            <Button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full h-10 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Go to Login
            </Button>
          </div>
        )}
      </form>
    </AuthCardShell>
  )
}
