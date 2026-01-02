"use client"

import { useRouter } from "next/navigation"
import { Lock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TwoFactorSetup() {
  const router = useRouter()

  const handleEnable = () => {
    router.push("/auth/verify-email")
  }

  const handleSkip = () => {
    router.push("/auth/trust-device")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="flex gap-4">
            <div className="rounded-2xl bg-emerald-50 p-6">
              <Lock className="h-12 w-12 text-emerald-700" />
            </div>
            <div className="rounded-2xl bg-emerald-50 p-6">
              <Smartphone className="h-12 w-12 text-emerald-700" />
            </div>
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-lg bg-emerald-700 px-3 py-1">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-white"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Secure Your Account with 2FA</h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-500">
          For your protection, we've introduced Two-Factor Authentication (2FA).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          This adds an extra layer of security to your account by requiring a unique code sent to your email each time
          you log in from a new device.
        </p>
      </div>

      <Button onClick={handleEnable} className="w-full bg-emerald-700 hover:bg-emerald-800">
        Enable 2FA
      </Button>

      <div className="text-center">
        <button onClick={handleSkip} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          Not Now (I'll do this later)
        </button>
      </div>
    </div>
  )
}
