
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { PreIncorporationConfigPage } from "@/components/system-config/ai-config/pre-incorporation-config"

export default function SystemConfigPage() {
  return (
    <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
      <PreIncorporationConfigPage />
    </DashboardLayout>
  )
}
