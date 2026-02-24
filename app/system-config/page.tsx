import { SystemConfigurationPage } from "@/components/system-config/system-config"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { Suspense } from "react"
import { PageLoader } from "@/components/reusables/page-loader"

export default function SystemConfigPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
        <SystemConfigurationPage />
      </DashboardLayout>
    </Suspense>
  )
}
