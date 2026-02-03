"use client"

import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import IdentificationTypePage from "@/components/system-config/registration/identification-type"
import ProposedOfficerPage from "@/components/system-config/registration/proposed-officer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

export default function SystemConfigRegClient() {
  const searchParams = useSearchParams()
  const pageType = searchParams.get("pageType")
  const router = useRouter()

  return (
    <DashboardLayout pageTitle="System Configuration" pageSubTitle="">
      <div
        className="flex items-center gap-2 mb-6 cursor-pointer"
        onClick={() => router.back()}
      >
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-5 w-5" /> Back
        </Button>
      </div>

      {pageType === "proposed-officers" && <ProposedOfficerPage />}
      {pageType === "identification-types" && <IdentificationTypePage />}
    </DashboardLayout>
  )
}
