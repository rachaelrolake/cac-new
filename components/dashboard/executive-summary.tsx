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
import { TrendingUp, TrendingDown, Search, Calendar, Download, ChevronRight, AlertTriangle, ShieldAlert, Info } from "lucide-react"
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

export function ExecutiveSummary() {
  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="py-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-500">Public Users</p>
                <p className="mt-2 text-3xl font-bold">10,790</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3">
                <Users className="h-6 w-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-500">Accredited Agents</p>
                <p className="mt-2 text-3xl font-bold">9,790</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3">
                <UserCheck className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-500">Entity Accounts</p>
                <p className="mt-2 text-3xl font-bold">10,790</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-3">
                <Building className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Insolvency</p>
                <p className="text-sm font-medium text-gray-500">Practitioners</p>
                <p className="mt-2 text-3xl font-bold">98</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION: SUMMARIES (Pending & Financial) */}
      <div className="grid grid-cols-1 gap-8">
        {/* Pending Approvals */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <SectionHeader>Pending Approvals Summary (246)</SectionHeader>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <SectionHeader>Financial Oversight</SectionHeader>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {financialOversight.map((financially, i) => (
              <div className={`p-6 bg-[${financially.background}] rounded-xl flex justify-between items-center`} key={i}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{financially.label}</p>
                  <p className="text-xl font-bold text-[#1B4332]">{financially.value}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
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
        {/* SLA Overview */}
        <Card className="p-6">
          <SectionHeader>SLA Overview</SectionHeader>

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
