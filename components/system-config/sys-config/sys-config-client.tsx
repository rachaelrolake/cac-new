"use client"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import RestrictedBannedWordsPage from "@/components/system-config/sys-config/restricted-banned-words"
import ServiceFeesPage from "@/components/system-config/sys-config/service-fees"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import NoticesPage from "./notices-configuration"

export default function SystemConfigSysClientPage() {
  const searchParams = useSearchParams()
  const pageType = searchParams.get("pageType")
  const tab = searchParams.get("tab") // Get the tab param
  const router = useRouter()

  const handleBack = () => {
    // Preserve the tab param when going back
    const backUrl = tab ? `/system-config?tab=${tab}` : '/system-config'
    router.push(backUrl)
  }

  return (
    <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" /> Back
        </Button>
      </div>


      {pageType === "fees" && (
        <ServiceFeesPage />
      )}

      {pageType === "banned-words" && (
        <RestrictedBannedWordsPage />
      )}

      {pageType === "notices" && <NoticesPage />}

    </DashboardLayout>
  )
}
