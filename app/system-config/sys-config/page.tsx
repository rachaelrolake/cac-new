import SystemConfigSysClientPage from "@/components/system-config/sys-config/sys-config-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SystemConfigSysClientPage />
    </Suspense>
  )
}
