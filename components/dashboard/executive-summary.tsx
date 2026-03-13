"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Search, Calendar, Download, ChevronRight, AlertTriangle, ShieldAlert, Info, CheckCircle2, Clock, MessageSquare, XCircle, Wallet, CreditCard, BarChart3, RefreshCcw } from "lucide-react"
import {

  // Sample data for metrics
  DollarSign,
  Users,
  Building2,
  ClipboardList,
  UserCheck,
  AlertCircle,
  FileText,
  FileCheck,
  Settings,
  Building,
  Tag,
  Scale,
} from "lucide-react"
import { SectionHeader } from "../reusables/section-header"
import { DashboardMetricCard } from "../reusables/dashboard-metric-card"
import { Progress } from "../ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FinanceCard } from "../reusables/finance-card"

const pendingApprovals = [
  { "label": "Name reservation", "value": 87, "oldest": "4 days" },
  { "label": "Registrations", "value": 64, "oldest": "2 days" },
  { "label": "Name Requiring Consent", "value": 43, "oldest": "6 days" },
  { "label": "Insolvency Filings", "value": 52, "oldest": "6 days" }
]

const financialOversight = [
  { "label": "Total Transaction", "value": "₦1,000,790,000", "background": "#F1F9F1" },
  { "label": "Transactions Today", "value": "1,234", "background": "#F9FAFB" },
  { "label": "Failed Payments", "value": "45", "background": "#FFF5F5" }
]

const slaData = {
  "stats": [
    { "label": "Within SLA", "value": 285, "color": "text-green-600" },
    { "label": "Nearing Breach", "value": 52, "color": "text-orange-500" },
    { "label": "Breached", "value": 39, "color": "text-red-500" }
  ],
  "contributors": [
    { "name": "Consent Applications", "count": 15 },
    { "name": "Insolvency Filings", "count": 12 },
    { "name": "Change of Directors", "count": 8 }
  ]
}

const complianceStatus = [
  {
    "title": "Non-Compliant Entities",
    "sub": "Overdue Annual Returns",
    "value": "1,247",
    "bg": "bg-[#FFF5F5]",
    "text": "text-[#C53030]"
  },
  {
    "title": "Blocked Entities",
    "sub": "Service restrictions active",
    "value": "89",
    "bg": "bg-[#FFF7ED]",
    "text": "text-[#F54900]"
  }
]

const applicationOverview = [
  { label: "Total", value: "30,790", icon: <ClipboardList className="w-4 h-4" />, color: "bg-slate-50 text-slate-600" },
  { label: "Approved", value: "19,790", icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-600" },
  { label: "Pending", value: "834", icon: <Clock className="w-4 h-4" />, color: "bg-amber-50 text-amber-600" },
  { label: "Queried", value: "412", icon: <MessageSquare className="w-4 h-4" />, color: "bg-orange-50 text-orange-600" },
  { label: "Rejected", value: "187", icon: <XCircle className="w-4 h-4" />, color: "bg-rose-50 text-rose-600" },
];

const applicationData = [
  { name: "Name Reservation", value: 1245 },
  { name: "Name Requiring Consent", value: 987 },
  { name: "Registration", value: 876 },
  { name: "Post Incorporation", value: 734 },
];

const finanlcialRow: Array<{ title: string; value: string; subValue: string; variant: "green" | "blue" | "yellow" | "purple" | "red"; icon: typeof Wallet; trend?: "up" | "down" }> = [
  { title: "Total Revenue", value: "₦487.6M", subValue: "+15.2% YoY", variant: "green", icon: Wallet, trend: "up" },
  { title: "This Month", value: "₦156.2M", subValue: "+6.7% vs last", variant: "blue", icon: CreditCard, trend: "up" },
  { title: "Today's Revenue", value: "₦12.3M", subValue: "28,456 total txns", variant: "yellow", icon: Wallet },
  { title: "Avg Transaction", value: "₦17,134", subValue: "26,123 successful", variant: "purple", icon: BarChart3 },

  { title: "Successful", value: "26,123", subValue: "Successful", variant: "green", icon: CheckCircle2 },
  { title: "Failed", value: "1,478", subValue: "Failed", variant: "red", icon: XCircle },
  { title: "Pending", value: "855", subValue: "Pending", variant: "yellow", icon: Clock },
  { title: "Refunded", value: "87", subValue: "Refunded (₦3.5M)", variant: "purple", icon: RefreshCcw },
];

export function ExecutiveSummary() {
  const maxVal = 1300; // Normalizing the progress bar length

  return (
    <div className="space-y-6">

      <div>
        <SectionHeader>Users</SectionHeader>
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardMetricCard
            label="Total"
            title="Public Users"
            value={100790}
            trend={8}
            description="this month"
            icon="users"
            iconColor="green"
          />

          <DashboardMetricCard
            label="Total"
            title="Entity Accounts"
            value={100790}
            trend={9.5}
            description="this month"
            icon="building"
            iconColor="yellow"
          />

          <DashboardMetricCard
            label="Total"
            title="Accredited Agents"
            value={9790}
            trend={12}
            description="this month"
            icon="agents"
            iconColor="purple"
          />

          <DashboardMetricCard
            label="Total"
            title="Insolvency Practitioners"
            value={98}
            trend={12}
            description="this month"
            icon="agents"
            iconColor="purple"
          />

        </div>
      </div>

      {/* Application Overview */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <SectionHeader>Application Overview</SectionHeader>
            <div className="flex gap-3 items-center">
              <Select>
                <SelectTrigger className="h-8 w-[180px] border">
                  <SelectValue placeholder="All Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-8 w-[180px] border">
                  <SelectValue placeholder="All Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </CardHeader>
        <CardContent className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {applicationOverview.map((stat) => (
              <Card key={stat.label} className={`border-none shadow-sm ${stat.color}`}>
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <div className="flex items-center gap-1.5 opacity-80">
                    {stat.icon}
                    <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="text-sm font-bold text-slate-600">Top Application Types (by volume)</h3>
            <div className="space-y-4">
              {applicationData.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="w-48 text-sm text-slate-500">{item.name}</span>
                  <Progress
                    value={(item.value / maxVal) * 100}
                    className="h-2.5 bg-slate-100 [&>div]:bg-blue-500"
                  />
                  <span className="w-12 text-right text-sm font-bold text-slate-700">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

      </Card>

      {/* SECTION: SUMMARIES (Pending & Financial) */}
      <div className="grid grid-cols-1 gap-8">
        {/* Pending Approvals */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <SectionHeader>Pending Approvals Summary (246)</SectionHeader>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Map through pendingApprovals JSON here */}
            {["Name reservation", "Registrations", "Name Requiring Consent", "Insolvency Filings"].map((item, i) => (
              <div key={i} className="p-4 bg-[#F9FAFB] rounded-xl flex justify-between items-center group cursor-pointer transition-all">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{item}</p>
                  <p className="text-xl font-bold">87</p>
                  <p className="text-[10px] text-gray-400">Oldest: 4 days</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-600" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Financial Oversight */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <SectionHeader>Financial Oversight</SectionHeader>
              <Button variant="default" size="lg">
                Full Transactions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {finanlcialRow.map((card, i) => (
                <FinanceCard
                  key={i}
                  title={card.title}
                  value={card.value}
                  subValue={card.subValue}
                  variant={card.variant}
                  icon={card.icon}
                  trend={card.trend}
                />

              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Overview */}
        <Card className="p-6">
          <SectionHeader>SLA Overview</SectionHeader>
          <div className="grid grid-cols-3 text-center mb-8">
            {slaData.stats.map((stat, i) => (
              <div key={i}>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700">Top Contributors to Breaches</p>
            {slaData.contributors.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.name}</span>
                <span className="font-bold text-red-600">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Fraud & Compliance Alerts */}
        <Card className="p-6">
          <SectionHeader>Fraud & Compliance Alerts</SectionHeader>
          <div className="space-y-3">
            {[
              { label: "Flagged Users/Entities", val: 12, icon: AlertTriangle },
              { label: "New Fraud Flags Today", val: 3, icon: ShieldAlert },
              { label: "Escalated Cases", val: 7, icon: Info }
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <alert.icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">{alert.label}</p>
                    <p className="text-lg font-bold">{alert.val}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-600" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status Summary */}
        <Card className="p-6">
          <SectionHeader>Compliance Status Summary</SectionHeader>

          <div className="space-y-4">
            {complianceStatus.map((item, i) => (
              <div
                key={i}
                className={`${item.bg} p-6 rounded-2xl flex justify-between items-center border border-transparent hover:border-gray-200 transition-all cursor-pointer group`}
              >
                <div>
                  <h3 className="text-md font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xl font-black ${item.text}`}>{item.value}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Support & System Issues */}
        <Card className="p-6">
          <SectionHeader>Support & System Issues</SectionHeader>
          <div className="space-y-3">
            {[
              { label: "Open Support Tickets", val: 87, icon: AlertCircle },
              { label: "High Priority Tickets", val: 14, icon: AlertTriangle },
              { label: "Escalated Tickets", val: 9, icon: TrendingUp }
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <alert.icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">{alert.label}</p>
                    <p className="text-lg font-bold">{alert.val}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-600" />
              </div>
            ))}
          </div>
        </Card>
      </div>



    </div>
  )
}
