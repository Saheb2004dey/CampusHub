"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: true,
  })
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!formData.identifier || !formData.password) {
      setError("Please enter your email or student ID and password.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true)
    setTimeout(() => {
      setIsGoogleLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive font-medium text-center">
          {error}
        </div>
      )}

      {/* Email / Student ID */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Email / Student ID</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
          <Input
            type="text"
            placeholder="Enter your email or student ID"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            className="pl-10 h-11 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10 h-11 rounded-xl text-sm border-slate-200 focus-visible:ring-[#5E46E8]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3 text-muted-foreground/70 hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center space-x-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            className="size-4 rounded border-slate-300 text-[#5E46E8] focus:ring-[#5E46E8] accent-[#5E46E8]"
          />
          <span className="text-xs font-semibold text-foreground">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-xs font-bold text-[#5E46E8] hover:underline underline-offset-4"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-11 text-sm font-semibold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-3 text-muted-foreground font-medium">or</span>
        </div>
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full h-11 text-sm font-medium rounded-xl border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 gap-2.5"
      >
        {isGoogleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <svg className="size-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        Continue with Google
      </Button>

      {/* Footer Link */}
      <div className="pt-2 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-[#5E46E8] hover:underline">
          Register
        </Link>
      </div>
    </form>
  )
}
