import SystemConfigReserveClientPage from "@/components/system-config/reservation/reservation-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SystemConfigReserveClientPage />
    </Suspense>
  )
}
