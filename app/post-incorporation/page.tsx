"use client";
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { NameReservation } from "@/components/pre-incorporation/name-reservation";
import { NameRequiringConsent } from "@/components/pre-incorporation/name-requiring-consent";
import { RegistrationPage } from "@/components/pre-incorporation/registration";
import { NormalFilingsPage } from "@/components/post-incorporation/normal-filings";
import { InsolvencyFilingsPage } from "@/components/post-incorporation/insolvency-filings";


const tabs = ["Normal Filings", "Insolvency Filings"]

export default function PreIncorporationMainPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Normal Filings")

  return (
    <DashboardLayout
      pageTitle="Post Incorporation"
      pageSubTitle=""
    >
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex gap-2 overflow-x-auto bg-gray-200 rounded-md p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); }}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Cards */}

        {activeTab === "Normal Filings" && (
          <NormalFilingsPage />
        )}

        {activeTab === "Insolvency Filings" && (
          <InsolvencyFilingsPage />
        )}


      </div>
    </DashboardLayout>
  )
}
