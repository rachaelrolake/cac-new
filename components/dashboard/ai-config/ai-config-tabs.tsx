"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIConfigPanel } from "./ai-config-panel"

type AppType = "name-reservation" | "consent-names" | "company-account" | "company-insolvency"
type ConfigType = "pre-incorporation" | "post-incorporation" | "insolvency"

interface AIConfigTab {
  id: AppType
  label: string
  types: ConfigType[]
}

const appTypeConfigs: AIConfigTab[] = [
  { id: "name-reservation", label: "Name Reservation", types: ["pre-incorporation"] },
  { id: "consent-names", label: "Name Requiring Consent", types: ["pre-incorporation"] },
  { id: "company-account", label: "Company Account", types: ["pre-incorporation", "post-incorporation"] },
  { id: "company-insolvency", label: "Company Insolvency", types: ["insolvency"] },
]

interface AIConfigTabsProps {
  configType: ConfigType
}

export function AIConfigTabs({ configType }: AIConfigTabsProps) {
  const [selectedAppType, setSelectedAppType] = useState<AppType>("name-reservation")

  const applicableConfigs = appTypeConfigs.filter((config) => config.types.includes(configType))

  return (
    <Tabs value={selectedAppType} onValueChange={(value) => setSelectedAppType(value as AppType)}>
      <TabsList
        className="grid w-full gap-2"
        style={{ gridTemplateColumns: `repeat(${applicableConfigs.length}, 1fr)` }}
      >
        {applicableConfigs.map((config) => (
          <TabsTrigger key={config.id} value={config.id} className="text-xs sm:text-sm">
            {config.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {applicableConfigs.map((config) => (
        <TabsContent key={config.id} value={config.id} className="mt-6">
          <AIConfigPanel appType={config.id} configType={configType} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
