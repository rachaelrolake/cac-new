"use client"

import { useState, Suspense } from "react"
import { Search, Download, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MetricCard } from "@/components/pre-incorporation/metric-card"
import { AIReviewQueueTable } from "@/components/pre-incorporation/ai-review-queue-table"

interface AIReviewQueuePageProps {
  children: React.ReactNode
  activeTab: "ai-review"
  activeCategory?: string
  setActiveCategory?: (category: string) => void
}


export function AIReviewQueuePage({ children, activeTab }: AIReviewQueuePageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
        {/* Metric Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="In Queue" value="46" icon="clock" iconColor="gray" subtitle="Awaiting Manual Review" />
          <MetricCard
            title="Low Confidence"
            value="12"
            icon="checkmark"
            iconColor="green"
            subtitle="Below 70% confidence"
          />
          <MetricCard title="Flagged" value="312" icon="cross" iconColor="red" subtitle="Flagged as high risk" />
          <MetricCard title="AVG Wait Time" value="1.8hrs" icon="clock" iconColor="blue" subtitle="Time in queue" />
        </div>

        {/* Applications List */}
        <Card className="p-6" style={{width: "calc(100vw - 145px)"}}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Applications (43)</h2>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="Search queue" className="pl-10" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Sliders className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Table */}
          <AIReviewQueueTable />
        </Card>
      </Suspense>
    </div>
  )
}
