"use client"

import { useRouter } from "next/navigation"
import { Lock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TrustDeviceForm() {
  const router = useRouter()

  const handleTrust = () => {
    router.push("/dashboard")
  }

  const handleDontTrust = () => {
    router.push("/dashboard")
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
        <h1 className="text-2xl font-semibold text-gray-900">Trust This Device?</h1>
        <p className="mt-4 text-sm text-gray-500">Do you want to mark this device as trusted?</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-500">
          <li>• If you trust it, you won't need to enter a 2FA code when logging in from here again.</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">
          You can manage and remove trusted devices anytime in your profile settings.
        </p>
      </div>

      <Button onClick={handleTrust} className="w-full bg-emerald-700 hover:bg-emerald-800">
        Yes, Trust This Device
      </Button>

      <div className="text-center">
        <button onClick={handleDontTrust} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          No, Don't Trust
        </button>
      </div>
    </div>
  )
}
