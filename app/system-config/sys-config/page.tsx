"use client"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import RestrictedBannedWordsPage from "@/components/system-config/sys-config/restricted-banned-words"
import ServiceFeesPage from "@/components/system-config/sys-config/service-fees"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

export default function SystemConfigSysConPage() {
  const searchParams = useSearchParams()
  const pageType = searchParams.get("pageType")
  const router = useRouter()

  return (
    <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
      <div className="flex items-center gap-2 mb-6" onClick={() => router.back()}>
        <Button variant="outline" size="sm"><ArrowLeft className="h-5 w-5" /> Back</Button>
      </div>


      {pageType === "fees" && (
        <ServiceFeesPage />
      )}

      {pageType === "banned-words" && (
        <RestrictedBannedWordsPage />
      )}


    </DashboardLayout>
  )
}
