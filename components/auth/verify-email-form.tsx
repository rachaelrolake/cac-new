"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function VerifyEmailForm() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(59)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="rounded-2xl bg-gray-100 p-8">
            <Mail className="h-16 w-16 text-gray-400" />
            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
              <span className="text-sm font-bold text-gray-900">!</span>
            </div>
          </div>
          <Send className="absolute -left-8 top-4 h-8 w-8 text-emerald-700" />
          <Send className="absolute -right-8 top-8 h-6 w-6 text-emerald-700" />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Verify Your Email</h1>
        <p className="mt-2 text-sm text-gray-500">
          We've sent a 6-digit verification code to <span className="font-medium text-gray-900">bash@gmail.com</span>.
        </p>
        <p className="mt-1 text-sm text-gray-500">Enter it below to activate 2FA on your account.</p>
      </div>

      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-14 w-14 text-center text-xl font-semibold"
          />
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">Resend OTP in {countdown}</div>

      <Button
        onClick={handleVerify}
        className="w-full bg-gray-200 text-gray-400 hover:bg-gray-300"
        disabled={code.some((digit) => !digit)}
      >
        Verify
      </Button>
    </div>
  )
}
