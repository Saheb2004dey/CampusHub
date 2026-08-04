"use client"

import { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

export function OtpInput({ length = 6, value = "", onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""))
  const inputRefs = useRef([])

  useEffect(() => {
    if (value !== undefined) {
      const chars = value.slice(0, length).split("")
      const newOtp = Array(length).fill("").map((_, i) => chars[i] || "")
      setOtp(newOtp)
    }
  }, [value, length])

  const handleChange = (e, index) => {
    const val = e.target.value.slice(-1) // Take the last entered character
    if (!/^\d*$/.test(val)) return // Only numbers

    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    if (onChange) onChange(newOtp.join(""))

    // Move focus to next input if digit is entered
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim().slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.split("")
    const newOtp = [...otp]
    digits.forEach((digit, idx) => {
      newOtp[idx] = digit
    })
    setOtp(newOtp)
    if (onChange) onChange(newOtp.join(""))

    // Focus last filled box
    const focusIndex = Math.min(digits.length, length - 1)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="size-11 sm:size-12 text-center text-lg font-bold tracking-widest focus-visible:ring-2 focus-visible:ring-primary rounded-lg border-muted-foreground/30"
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  )
}
