"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UserCheck,
  Building,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  X,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ExecutiveSummary } from "./executive-summary"
import { MetricCard } from "./metric-card"
import { DashboardOverview } from "./dashboard-overview"

const chartData = [
  { month: "Jan", flagged: 600, users: 400, pending: 150 },
  { month: "Feb", flagged: 620, users: 420, pending: 170 },
  { month: "Mar", flagged: 630, users: 430, pending: 180 },
  { month: "Apr", flagged: 640, users: 420, pending: 185 },
  { month: "May", flagged: 650, users: 430, pending: 190 },
  { month: "Jun", flagged: 670, users: 450, pending: 180 },
  { month: "Jul", flagged: 680, users: 460, pending: 200 },
  { month: "Aug", flagged: 700, users: 470, pending: 210 },
  { month: "Sep", flagged: 720, users: 490, pending: 220 },
  { month: "Oct", flagged: 740, users: 500, pending: 230 },
  { month: "Nov", flagged: 760, users: 510, pending: 235 },
  { month: "Dec", flagged: 780, users: 520, pending: 240 },
]

const applications = [
  {
    id: "BN-18392",
    type: "Business Name",
    priority: "High",
    status: "Under Review",
    submittedBy: "Grace Okoro",
    timeAgo: "4hours ago",
    sla: "2days Remaining",
  },
  {
    id: "AV-18392",
    type: "Name Reservation",
    priority: "Normal",
    status: "Pending",
    submittedBy: "Ibrahim Ismail",
    timeAgo: "1hours ago",
    sla: "60days Remaining",
  },
  {
    id: "RC-18392",
    type: "Insolvency Filling",
    priority: "High",
    status: "Queried",
    submittedBy: "Akpan John",
    timeAgo: "4hours ago",
    sla: "8days Remaining",
  },
  {
    id: "RC-18392",
    type: "Annual Return",
    priority: "Normal",
    status: "Pending",
    submittedBy: "ABC Company LTD",
    timeAgo: "4hours ago",
    sla: "2days Remaining",
  },
]

const alerts = [
  {
    type: "warning",
    message: "High Volume Of Name Reservation Applications Detected",
    time: "20 minutes ago",
  },
  {
    type: "info",
    message: "Scheduled Maintenance On Friday 10:00 PM - 12:00 AM",
    time: "5 hours ago",
  },
  {
    type: "error",
    message: "5 Cases Exceeded SLA Timeline",
    time: "5 hours ago",
  },
]

export function DashboardContent() {
  const [activeTab2, setActiveTab2] = useState<"overview" | "executive">("overview")
  const [activeTab, setActiveTab] = useState("Public Users")
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

  return (
    <div className="space-y-6">
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-md">
            <CardHeader className="relative">
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👋</span>
                <CardTitle>Welcome, Admin!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Begin managing applications, reviewing documents, tracking statuses, and supporting users across the
                platform.
              </p>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Quick Start Guide</h3>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manage Application Requests</p>
                    <p className="text-xs text-gray-600">Monitor pending, queried and approved requests.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Reports</p>
                    <p className="text-xs text-gray-600">Generate reports, download and share.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Track Payments</p>
                    <p className="text-xs text-gray-600">Manage users payment across applications and changes.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Integrations</p>
                    <p className="text-xs text-gray-600">Integrate Apps to help manage tasks.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Get Help Anytime</p>
                    <p className="text-xs text-gray-600">Access guides, FAQs, or contact support.</p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span className="text-sm text-gray-600">Don't show this again</span>
              </label>

              <Button onClick={() => setShowWelcomeModal(false)} className="w-full bg-emerald-700 hover:bg-emerald-800">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab2("overview")}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${activeTab2 === "overview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab2("executive")}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${activeTab2 === "executive" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Executive Summary
        </button>
      </div>

      {activeTab2 === "overview" && (
        <>
          <DashboardOverview />
        </>
      )}

      {activeTab2 === "executive" && (
        <>
          <ExecutiveSummary />
        </>
      )}


      {/* AI Assistant */}
      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700"
        size="icon"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </Button>
    </div>
  )
}
