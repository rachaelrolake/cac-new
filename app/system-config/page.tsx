import { SystemConfigurationPage } from "@/components/system-config/system-config"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"

export default function SystemConfigPage() {
  return (
    <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
      <SystemConfigurationPage />
    </DashboardLayout>
  )
}
