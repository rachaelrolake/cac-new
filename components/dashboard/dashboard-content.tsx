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
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
  const [activeTab, setActiveTab] = useState("Public Users")

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-500">Public Users</p>
                <p className="mt-2 text-3xl font-bold">10,790</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">+12.5%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">20 New this week</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3">
                <Users className="h-6 w-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-500">Accredited Agents</p>
                <p className="mt-2 text-3xl font-bold">9,790</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-600">-5%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">7 New Last week</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3">
                <UserCheck className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-500">Entity Accounts</p>
                <p className="mt-2 text-3xl font-bold">10,790</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">+9.5%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">60 Pending Verifications</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-3">
                <Building className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-sm font-medium text-gray-500">Applications</p>
                <p className="mt-2 text-3xl font-bold">98</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-600">-8%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">23 Urgent ({"< 24hrs"})</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
        {["Public Users", "Accredited Agents", "Insolvency Agents", "Entity Accounts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="mt-2 text-2xl font-bold">9100</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2">
                <Users className="h-5 w-5 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="mt-2 text-2xl font-bold text-green-600">8234</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[90%] bg-green-600"></div>
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Suspended Users</p>
                <p className="mt-2 text-2xl font-bold text-red-600">30</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[3%] bg-red-600"></div>
                </div>
              </div>
              <div className="rounded-lg bg-red-50 p-2">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Users</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">30</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[3%] bg-blue-600"></div>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Flagged</p>
                <p className="mt-2 text-2xl font-bold text-red-600">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-end gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-900"></div>
              <span className="text-gray-600">Pending</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Line type="monotone" dataKey="flagged" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="pending" stroke="#1f2937" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Applications and System Alerts */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{app.id}</span>
                      <Badge variant={app.priority === "High" ? "destructive" : "secondary"}>{app.priority}</Badge>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{app.type}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{app.submittedBy}</span>
                      <span>•</span>
                      <span>{app.timeAgo}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        app.status === "Under Review"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : app.status === "Pending"
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {app.status}
                    </Badge>
                    <div className="mt-2 text-xs text-gray-500">SLA: {app.sla}</div>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${
                    alert.type === "warning"
                      ? "border-yellow-200 bg-yellow-50"
                      : alert.type === "info"
                        ? "border-blue-200 bg-blue-50"
                        : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`mt-0.5 h-5 w-5 shrink-0 rounded-full ${
                        alert.type === "warning"
                          ? "bg-yellow-500"
                          : alert.type === "info"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      } flex items-center justify-center text-white`}
                    >
                      {alert.type === "warning" ? "!" : alert.type === "info" ? "i" : "!"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="mt-1 text-xs text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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
