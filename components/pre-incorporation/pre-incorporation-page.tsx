"use client";
import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { NameReservation } from "@/components/pre-incorporation/name-reservation";
import { NameRequiringConsent } from "@/components/pre-incorporation/name-requiring-consent";
import { RegistrationPage } from "@/components/pre-incorporation/registration";

const tabConfig = [
  { id: "name-reservation", label: "Name Reservation" },
  { id: "name-requiring-consent", label: "Name Requiring Consent" },
  { id: "registration", label: "Registration" },
]

export default function PreIncorporationMainPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState(tabParam || "name-reservation")

  // Update active tab when URL changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  return (
    <DashboardLayout
      pageTitle="Pre-Incorporation "
      pageSubTitle=""
    >
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex gap-2 overflow-x-auto bg-gray-200 rounded-md p-1 w-fit">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); }}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}

        {activeTab === "name-reservation" && (
          <NameReservation />
        )}

        {activeTab === "name-requiring-consent" && (
          <NameRequiringConsent />
        )}

        {activeTab === "registration" && (
          <RegistrationPage />
        )}



      </div>
    </DashboardLayout>
  )
}
