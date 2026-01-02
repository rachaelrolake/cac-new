"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { AIConfigTabs } from "./ai-config/ai-config-tabs"

type ConfigType = "pre-incorporation" | "post-incorporation" | "insolvency"

interface AIConfigViewProps {
  currentConfigType: ConfigType
}

export function AIConfigView({ currentConfigType }: AIConfigViewProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const configTypeLabels: Record<ConfigType, string> = {
    "pre-incorporation": "Pre-Incorporation",
    "post-incorporation": "Post-Incorporation",
    insolvency: "Insolvency",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">AI Configuration</h1>
        <p className="text-gray-600">
          Configure AI-powered auto-approval settings for {configTypeLabels[currentConfigType]} applications
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search configuration..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Config Tabs */}
      <Card>
        <CardContent className="pt-6">
          <AIConfigTabs configType={currentConfigType} />
        </CardContent>
      </Card>
    </div>
  )
}
