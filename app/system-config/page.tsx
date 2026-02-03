import { SystemConfigurationPage } from "@/components/system-config/system-config"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { Suspense } from "react"

export default function SystemConfigPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
        <SystemConfigurationPage />
      </DashboardLayout>
    </Suspense>
  )
}
