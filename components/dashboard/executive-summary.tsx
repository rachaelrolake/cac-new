"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
import { TrendingUp, TrendingDown, Search, Calendar, Download } from "lucide-react"
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

const metricsData = [
  {
    title: "Total Financial Revenue",
    value: "₦1,000,790,000",
    change: 12.5,
    subtitle: "3 Payments this week",
    icon: <DollarSign className="h-6 w-6" />,
    color: "emerald",
  },
  {
    title: "Total Accredited Agents",
    value: "9,790",
    change: -5,
    subtitle: "7 New Last week",
    icon: <UserCheck className="h-6 w-6" />,
    color: "purple",
  },
  {
    title: "Total Entity Accounts",
    value: "10,790",
    change: 9.5,
    subtitle: "60 Pending Verifications",
    icon: <Building2 className="h-6 w-6" />,
    color: "orange",
  },
  {
    title: "Pending Applications",
    value: "98",
    change: -8,
    subtitle: "23 Urgent (< 24hrs)",
    icon: <ClipboardList className="h-6 w-6" />,
    color: "blue",
  },
  {
    title: "Total Public Users",
    value: "10,790",
    change: 12.5,
    subtitle: "20 New this week",
    icon: <Users className="h-6 w-6" />,
    color: "emerald",
  },
  {
    title: "Total Insolvent Agents",
    value: "9,790",
    change: -5,
    subtitle: "7 New Last week",
    icon: <AlertCircle className="h-6 w-6" />,
    color: "purple",
  },
  {
    title: "Total Name Reservations",
    value: "10,790",
    change: 9.5,
    subtitle: "60 Pending Verifications",
    icon: <FileText className="h-6 w-6" />,
    color: "orange",
  },
  {
    title: "Total Annual Filings",
    value: "98",
    change: -8,
    subtitle: "23 Urgent (< 24hrs)",
    icon: <FileCheck className="h-6 w-6" />,
    color: "blue",
  },
  {
    title: "Total System Admins",
    value: "10,790",
    change: 12.5,
    subtitle: "20 New this week",
    icon: <Settings className="h-6 w-6" />,
    color: "emerald",
  },
  {
    title: "Total Limited Liability Company",
    value: "9,790",
    change: -5,
    subtitle: "7 New Last week",
    icon: <Building className="h-6 w-6" />,
    color: "purple",
  },
  {
    title: "Total Business Names",
    value: "10,790",
    change: 9.5,
    subtitle: "60 Pending Verifications",
    icon: <Tag className="h-6 w-6" />,
    color: "orange",
  },
  {
    title: "Total Trustees",
    value: "98",
    change: -8,
    subtitle: "23 Urgent (< 24hrs)",
    icon: <Scale className="h-6 w-6" />,
    color: "blue",
  },
]

// Chart data
const barChartData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 600 },
  { month: "Mar", value: 450 },
  { month: "Apr", value: 650 },
  { month: "May", value: 400 },
  { month: "Jun", value: 500 },
]

const pieChartData = [
  { name: "Resolved", value: 35 },
  { name: "Escalated", value: 25 },
  { name: "Pending", value: 40 },
]

const COLORS = ["#10b981", "#ef4444", "#84cc16"]

export function ExecutiveSummary() {
  const [viewMode, setViewMode] = useState<"cards" | "charts">("cards")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(metricsData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = metricsData.slice(startIndex, startIndex + itemsPerPage)

  const colorMap: Record<string, { bg: string; text: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700" },
    purple: { bg: "bg-purple-50", text: "text-purple-700" },
    orange: { bg: "bg-orange-50", text: "text-orange-700" },
    blue: { bg: "bg-blue-50", text: "text-blue-700" },
  }

  return (
    <div className="space-y-6">
      {/* Header with filters and export */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>--Select--</option>
          </select>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="mm/dd/yy"
              className="rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <Button className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* View toggle and cards/charts tabs */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setViewMode("cards")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${viewMode === "cards" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode("charts")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${viewMode === "charts" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
          >
            Charts
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === "cards" && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {paginatedData.map((metric, index) => {
              const colors = colorMap[metric.color as keyof typeof colorMap]
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{metric.title}</p>
                        <p className="mt-3 text-2xl font-bold text-gray-900">{metric.value}</p>
                        <div className="mt-3 flex items-center gap-1">
                          {metric.change >= 0 ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">+{metric.change}%</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-4 w-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">{metric.change}%</span>
                            </>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">{metric.subtitle}</p>
                      </div>
                      <div className={`rounded-lg ${colors.bg} p-3`}>
                        <span className="text-2xl">{metric.icon}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${currentPage === i + 1
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </div>
        </>
      )}

      {/* Charts View */}
      {viewMode === "charts" && (
        <div className="grid gap-6">
          {/* Bar Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Financial Revenue</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Name Reservation</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Pie Charts */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Escalated Cases</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Annual Filings</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Name Reservation</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* More Bar Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Business Names</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Total Limited Liability Companies</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
