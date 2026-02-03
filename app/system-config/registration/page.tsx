import SystemConfigRegClient from "@/components/system-config/registration/registration-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SystemConfigRegClient />
    </Suspense>
  )
}
