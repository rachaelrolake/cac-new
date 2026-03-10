"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserCheck,
  Building,
  FileText,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Flag,
  Eye,
  Trash2,
  PlusSquare,
  Building2,
  File,
} from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import Link from "next/link"
import { MetricCard } from "./metric-card"
import { DashboardMetricCard } from "../reusables/dashboard-metric-card"

const mockData = [
  {
    applicationId: "NR12345",
    applicationType: "Name Reservation",
    avCode: "AV12345",
    applicant: "Adebayo Johnson",
    entityName: "Tech Innovation Solutions Ltd",
    submittedOn: "Sept 17, 2025",
    status: "Approved"
  },
  {
    applicationId: "RC78901",
    applicationType: "Company Registration",
    avCode: "AV12346",
    applicant: "Chioma Nwosu",
    entityName: "Green Energy Holdings Ltd",
    submittedOn: "Sept 16, 2025",
    status: "Pending"
  },
  {
    applicationId: "AR45678",
    applicationType: "Annual Return",
    avCode: "Nil",
    applicant: "Ibrahim Musa",
    entityName: "XYZ Enterprises Ltd",
    submittedOn: "Sept 15, 2025",
    status: "Pending"
  },
  {
    applicationId: "NR23456",
    applicationType: "Name Reservation",
    avCode: "AV12348",
    applicant: "Funke Akindele",
    entityName: "Digital Marketing Hub Ltd",
    submittedOn: "Sept 14, 2025",
    status: "Pending"
  },
  {
    applicationId: "BN67890",
    applicationType: "Change of Directors",
    avCode: "Nil",
    applicant: "Oluwaseun Adekunle",
    entityName: "ABC Manufacturing Ltd",
    submittedOn: "Sept 13, 2025",
    status: "Pending"
  }
];

const quickActions = [
  { label: "Assign Case", icon: PlusSquare, bgColor: "bg-blue-100", textColor: "text-blue-700", iconColor: "text-blue-700" },
  { label: "Send Announcement", icon: Building2, bgColor: "bg-green-100", textColor: "text-green-700", iconColor: "text-green-700" },
  { label: "Update Service Fees", icon: FileText, bgColor: "bg-orange-50", textColor: "text-orange-800", iconColor: "text-orange-800" },
  { label: "View Reports", icon: File, bgColor: "bg-purple-100", textColor: "text-purple-700", iconColor: "text-purple-700" },
];

const metrics = [
  {
    title: "Total Public Users",
    value: "10,790",
    icon: "users",
    iconColor: "green",
    subtitle: "+8% this month",
  },
  {
    title: "Accredited Agents",
    value: "9,790",
    icon: "checkmark",
    iconColor: "blue",
    subtitle: "+12% this month",
  },
  {
    title: "Entity Accounts",
    value: "10,790",
    icon: "users",
    iconColor: "orange",
    subtitle: "+9.5% this month",
  },
  {
    title: "Pending Applications",
    value: "98",
    icon: "clock",
    iconColor: "gray",
    subtitle: "-8%",
  },
]

export function DashboardOverview() {

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <DashboardMetricCard
          label="Total"
          title="Applications"
          value={30790}
          trend={5.2}
          description="this week"
          icon="file"
          iconColor="blue"
        />

        <DashboardMetricCard
          label="Approved"
          title="Application"
          value={19790}
          description="66.5% of total"
          icon="file"
          iconColor="green"
        />

        <DashboardMetricCard
          label="Pending"
          title="Applications"
          value={790}
          description="8.4% of total"
          icon="file"
          iconColor="yellow"
        />

        <DashboardMetricCard
          label="Queried"
          title="Applications"
          value={98}
          description="8.4% of total"
          icon="file"
          iconColor="orange"
        />

        <DashboardMetricCard
          label="Rejected"
          title="Applications"
          value={98}
          description="3.8% of total"
          icon="file"
          iconColor="red"
        />

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
          value={700790}
          trend={9.5}
          description="this month"
          icon="building"
          iconColor="yellow"
        />

        <DashboardMetricCard
          label="Total"
          title="Accredited Agents"
          value={7790}
          trend={12}
          description="this month"
          icon="agents"
          iconColor="purple"
        />
      </div>

      {/* Quick Actions Section */}
      <Card>
        <CardContent>
          <section>
            <div className="mb-6">
              <span className="px-4 py-1.5 text-sm font-semibold border rounded-lg shadow-sm bg-white">
                Quick Actions
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Assign Case */}
              <button className="flex items-center gap-3 p-6 rounded-xl bg-[#E3F2FD] text-[#1976D2] hover:bg-[#BBDEFB] transition-all cursor-pointer">
                <PlusSquare className="h-6 w-6" />
                <span className="font-bold text-sm">Assign Task</span>
              </button>

              {/* Send Announcement */}
              <button className="flex items-center gap-3 p-6 rounded-xl bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] transition-all cursor-pointer">
                <Building2 className="h-6 w-6" />
                <span className="font-bold text-sm">Send Announcement</span>
              </button>

              {/* Update Service Fees */}
              <button className="flex items-center gap-3 p-6 rounded-xl bg-[#F9F3E3] text-[#856404] hover:bg-[#F1E4C1] transition-all cursor-pointer">
                <FileText className="h-6 w-6" />
                <span className="font-bold text-sm">Update Service Fees</span>
              </button>

              {/* View Reports */}
              <button className="flex items-center gap-3 p-6 rounded-xl bg-[#F3E5F5] text-[#7B1FA2] hover:bg-[#E1BEE7] transition-all cursor-pointer">
                <File className="h-6 w-6" />
                <span className="font-bold text-sm">View Reports</span>
              </button>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Recent Applications and System Alerts */}
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Applications</CardTitle>
          <Button variant="ghost" className="text-primary" size="sm">See all applications</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600">Application ID</TableHead>
                  <TableHead className="font-semibold text-gray-600">Application Type</TableHead>
                  <TableHead className="font-semibold text-gray-600">AV Code</TableHead>
                  <TableHead className="font-semibold text-gray-600">Applicant</TableHead>
                  <TableHead className="font-semibold text-gray-600">Entity Name</TableHead>
                  <TableHead className="font-semibold text-gray-600">Submitted On</TableHead>
                  <TableHead className="font-semibold text-gray-600">Status ↓</TableHead>
                  <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((item) => (
                  <TableRow key={item.applicationId} className="border-b hover:bg-gray-50/30 transition-colors py-10">
                    <TableCell className="text-gray-500 font-medium py-4">{item.applicationId}</TableCell>
                    <TableCell className="text-gray-600 py-4">{item.applicationType}</TableCell>
                    <TableCell className="text-gray-500 py-4">{item.avCode}</TableCell>
                    <TableCell className="text-gray-600 py-4">{item.applicant}</TableCell>
                    <TableCell className="text-gray-600 py-4">{item.entityName}</TableCell>
                    <TableCell className="text-gray-500 py-4">{item.submittedOn}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === "Approved"
                          ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-100"
                          : "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-100"
                          }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/review/${item.applicationId}`}
                          className="font-bold text-[#2E7D32] hover:text-[#1b5e20] text-sm transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <p className="p-4">Page 1 of 1</p>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
