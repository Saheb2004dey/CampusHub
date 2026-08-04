"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TeacherRegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {error && (
        <div className="rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive font-medium text-center">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="pl-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#16A34A]"
            required
          />
        </div>
      </div>

      {/* Email / Student ID */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Email / Student ID</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
          <Input
            type="text"
            placeholder="Enter your email or student ID"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#16A34A]"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#16A34A]"
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
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground/70" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="pl-10 pr-10 h-10 rounded-xl text-sm border-slate-200 focus-visible:ring-[#16A34A]"
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
        className="w-full h-11 text-sm font-semibold rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white shadow-md shadow-emerald-500/20 mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      {/* Footer Link */}
      <div className="pt-2 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-[#16A34A] hover:underline">
          Login
        </Link>
      </div>
    </form>
  )
}
