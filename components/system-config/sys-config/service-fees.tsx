"use client"

import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import CompaniesFeesPage from "@/components/system-config/sys-config/services-fee/companies-fees"
import LLPFeesPage from "@/components/system-config/sys-config/services-fee/llp-fees"
import LPFeesPage from "@/components/system-config/sys-config/services-fee/lp-fees"
import BNFeesPage from "@/components/system-config/sys-config/services-fee/bn-fees"
import ITFeesPage from "@/components/system-config/sys-config/services-fee/it-fees"
import PenaltiesFees from "@/components/system-config/sys-config/services-fee/penalty-fees"
import OtherFees from "@/components/system-config/sys-config/services-fee/other-fees"

const tabsConfig = [
  { id: "companies", label: "Companies" },
  { id: "llp", label: "LLP" },
  { id: "lp", label: "LP" },
  { id: "business-name", label: "Business Names" },
  { id: "it", label: "Incorporated Trustees" },
  { id: "penalties", label: "Penalties" },
  { id: "others", label: "Other Fees" },
]

export default function ServiceFeesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("companies")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/system-config/sys-config?pageType=fees`)
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-end">
          <TabsList className="w-fit bg-gray-200 mb-6">
            {tabsConfig.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="companies">
          <CompaniesFeesPage />
        </TabsContent>

        <TabsContent value="llp">
          <LLPFeesPage />
        </TabsContent>

        <TabsContent value="lp">
          <LPFeesPage />
        </TabsContent>

        <TabsContent value="business-name">
          <BNFeesPage />
        </TabsContent>

        <TabsContent value="it">
          <ITFeesPage />
        </TabsContent>

        <TabsContent value="penalties">
          <PenaltiesFees />
        </TabsContent>

        <TabsContent value="others">
          <OtherFees />
        </TabsContent>
      </Tabs>
    </>
  )
}