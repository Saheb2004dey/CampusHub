"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle2, RotateCw } from "lucide-react"
import { AuthCardShell } from "@/components/auth/auth-card-shell"
import { OtpInput } from "@/components/auth/otp-input"
import { Button } from "@/components/ui/button"

function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || "sahebdey123@gmail.com"

  const [otpCode, setOtpCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(45)
  const [canResend, setCanResend] = useState(false)
  const [notification, setNotification] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    let timer
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [resendCountdown])

  const handleVerify = (e) => {
    e.preventDefault()
    setError("")

    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP code.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/reset-password?email=${encodeURIComponent(emailParam)}`)
    }, 1000)
  }

  const handleResendOtp = () => {
    if (!canResend) return
    setCanResend(false)
    setResendCountdown(45)
    setNotification("A new 6-digit verification code has been sent.")
    setTimeout(() => setNotification(""), 4000)
  }

  // Format seconds to (00:45) format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0")
    const secs = (seconds % 60).toString().padStart(2, "0")
    return `(${mins}:${secs})`
  }

  return (
    <AuthCardShell
      title="Verify Your Email"
      description={
        <span>
          We&apos;ve sent a 6-digit code to <strong className="text-foreground font-semibold">{emailParam}</strong>
        </span>
      }
    >
      <form onSubmit={handleVerify} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive font-medium text-center">
            {error}
          </div>
        )}

        {notification && (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="size-4 shrink-0" />
            {notification}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">Enter 6-digit OTP</label>
            <button
              type="button"
              onClick={() => setOtpCode("248619")}
              className="text-[11px] font-semibold text-[#5E46E8] hover:underline"
            >
              Fill Demo OTP (248619)
            </button>
          </div>
          <OtpInput length={6} value={otpCode} onChange={setOtpCode} />
        </div>

        {/* Resend OTP Timer & Link */}
        <div className="text-center text-xs text-muted-foreground">
          Didn&apos;t receive code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              className="inline-flex items-center gap-1 font-bold text-[#5E46E8] hover:underline"
            >
              <RotateCw className="size-3" />
              Resend OTP
            </button>
          ) : (
            <span className="font-semibold text-[#5E46E8]">
              Resend OTP {formatTime(resendCountdown)}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-sm font-semibold rounded-xl bg-[#5E46E8] hover:bg-[#4E36D8] text-white shadow-md shadow-indigo-500/20"
          disabled={isLoading || otpCode.length < 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Verifying OTP...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>
    </AuthCardShell>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <AuthCardShell title="Verify Your Email" description="Loading verification session...">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-[#5E46E8]" />
          </div>
        </AuthCardShell>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  )
}
