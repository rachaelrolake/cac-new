"use client"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import EntityClassificationPage from "@/components/system-config/reservation/entitiy-classification"
import EntityTypePage from "@/components/system-config/reservation/entity-type"
import NatureOfBusinessPage from "@/components/system-config/reservation/nature-of-business"
import ReasonForConsentPage from "@/components/system-config/reservation/reason-for-consent"
import SpecificNatureOfBusinessPage from "@/components/system-config/reservation/specific-nature-business"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

export default function SystemConfigReserveClientPage() {
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


      {pageType === "classification" && (
        <EntityClassificationPage />
      )}

      {pageType === "entity-type" && (
        <EntityTypePage />
      )}

      {pageType === "nature" && (
        <NatureOfBusinessPage />
      )}

      {pageType === "specific-nature" && (
        <SpecificNatureOfBusinessPage />
      )}

      {pageType === "consent-reasons" && (
        <ReasonForConsentPage />
      )}

    </DashboardLayout>
  )
}
