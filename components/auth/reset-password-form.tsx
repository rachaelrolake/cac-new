"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ResetPasswordForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Send OTP to:", email)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-2xl bg-gray-100 p-6">
          <Lock className="h-12 w-12 text-emerald-700" />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reset your password</h1>
        <p className="mt-2 text-sm text-gray-500">
          We will send onetime password to your email to reset the passwordto your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <ShieldCheck className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>

        <Button type="submit" className="w-full bg-gray-200 text-gray-400 hover:bg-gray-300" disabled={!email}>
          Send OTP
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">Remembered your password?</span>
        </div>
      </div>

      <div className="text-center">
        <Link href="/auth/login" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          Login
        </Link>
      </div>
    </div>
  )
}
