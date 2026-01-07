"use client"

import { useState, Suspense } from "react"
import { Search, Download, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MetricCard } from "@/components/pre-incorporation/metric-card"
import { AIReviewQueueTable } from "@/components/pre-incorporation/ai-review-queue-table"

function AIReviewQueueContent() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">AI Review Queue</h1>
        <p className="text-sm text-muted-foreground">Applications requiring manual review across all types</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
      <Card className="p-6">
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
    </>
  )
}

export default function AIReviewQueuePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <AIReviewQueueContent />
      </Suspense>
    </div>
  )
}
