"use client"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockUserDetails = {
  id: 1,
  name: "John Doe",
  staffId: "CAC-2019-01",
  firstName: "John",
  lastName: "Doe",
  email: "john@cac.gov.ng",
  phone: "+234 813-454-7899",
  userRole: "Director, Inspections",
  status: "Active",
  avatar: "JD",
  createdAt: "3 Nov, 2025 - 08:30AM",
  lastLogin: "2 hrs ago",
  accountActivationDate: "21 Oct, 2025 - 08:30AM",
  deviceUsed: "Android",
  logs: [
    {
      id: 1,
      action: "Account Created",
      date: "3 Nov, 2025 - 08:30AM",
    },
    {
      id: 2,
      action: "Last Login",
      date: "2 hrs ago",
    },
    {
      id: 3,
      action: "Account Activation Date",
      date: "21 Oct, 2025 - 08:30AM",
    },
    {
      id: 4,
      action: "Device Used",
      date: "Android",
    },
    {
      id: 5,
      action: "Device Used",
      date: "Android",
    },
    {
      id: 6,
      action: "Device Used",
      date: "Android",
    },
    {
      id: 7,
      action: "Device Used",
      date: "Android",
    },
  ],
}

export default function UserDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id

  return (
    <div className="space-y-4 p-6">
      {/* Back Button */}

      <div className="flex items-center mb-5">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-lg shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium text-sm">Back</span>
        </Button>
      </div>

      {/* Main Content Card with Blue Border */}
      <Card className="bg-white">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              User Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Staff ID *</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{mockUserDetails.staffId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Name *</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{mockUserDetails.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{mockUserDetails.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status *</label>
                <div className="mt-1">
                  <Badge className="bg-emerald-100 text-emerald-700">{mockUserDetails.status}</Badge>
                </div>
              </div>
            </div>

            {/* Right Column with Avatar */}
            <div className="flex flex-col items-center gap-4 md:items-end">
              <div>
                <label className="text-sm font-medium text-gray-700">First Name *</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{mockUserDetails.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{mockUserDetails.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">User role *</label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{mockUserDetails.userRole}</p>
              </div>
              {/* Avatar */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-xl font-bold text-white">
                {mockUserDetails.avatar}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Section */}
      <Card className="bg-white">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Dashboard Permission */}
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">Dashboard</h3>
              </div>
              <div className="grid gap-2 pl-6 text-sm">
                <p className="text-gray-600">Overview</p>
                <p className="text-gray-600">Executive Summary</p>
              </div>
            </div>

            {/* User Management Permission */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">User Management</h3>
              </div>
              <div className="grid gap-2 pl-6 text-sm">
                <p className="text-gray-600">Transactions</p>
                <p className="text-gray-600">Financial Statements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Section */}
      <Card className="bg-white">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle>Logs</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {mockUserDetails.logs.map((log, index) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <span className="text-sm text-gray-600">▼ {log.action}</span>
                <span className="text-sm text-gray-500">{log.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end mt-6">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="bg-primary">Save Changes</Button>
      </div>
    </div>
  )
}
