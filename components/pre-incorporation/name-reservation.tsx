"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MetricCard } from "./metric-card"
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye, Settings, ListFilter } from "lucide-react"

const mockApplications = [
  {
    id: 1,
    sn: 1,
    avCode: "AV-2019-01",
    proposedName: "TECH INNOVATIONS NIGERIA LIMITED",
    submitted: "Nov 15, 2025 09:49AM",
    reasonForConsent: "New Incorporation",
    aiDecision: "AI: Recommended Approval",
    status: "Pending",
    sla: "Done",
    entityClassification: "Business Name",
    entityType: "Business Name",
    applicants: "John Doe",
    applicantsType: "Public User",
  },
  {
    id: 2,
    sn: 2,
    avCode: "AV-2019-01",
    proposedName: "GLOBAL PETROLEUM SERVICES LIMITED",
    submitted: "Nov 14, 2025 09:50AM",
    reasonForConsent: "Use Of Restricted Word",
    aiDecision: "AI: Needs Human Review",
    status: "Pending",
    sla: "54d left",
    entityClassification: "Company",
    entityType: "Public Limited by Guarantee",
    applicants: "Ahmed Hassan",
    applicantsType: "Public User",
  },
  {
    id: 3,
    sn: 3,
    avCode: "AV-2019-01",
    proposedName: "SUNRISE VENTURES LIMITED",
    submitted: "Nov 14, 2025 12:09PM",
    reasonForConsent: "Group Holdings/ Consortium",
    aiDecision: "AI: Recommended Approval",
    status: "Pending",
    sla: "54d left",
    entityClassification: "Company",
    entityType: "Private Unlimited",
    applicants: "Mary Johnson",
    applicantsType: "Agent",
  },
  {
    id: 4,
    sn: 4,
    avCode: "AV-2019-01",
    proposedName: "NATIONAL BANK OF COMMERCE LIMITED",
    submitted: "Nov 10, 2025 01:34PM",
    reasonForConsent: "Group Holdings/ consortium",
    aiDecision: "AI: Approved",
    status: "Approved",
    sla: "8d left",
    entityClassification: "Limited Liability Partnership",
    entityType: "Limited Liability Partnership",
    applicants: "Michael Chen",
    applicantsType: "Public User",
  },
  {
    id: 5,
    sn: 5,
    avCode: "AV-2019-01",
    proposedName: "SUNNET AGRO LIMITED",
    submitted: "Nov 14, 2025 05:12AM",
    reasonForConsent: "New Incorporation",
    aiDecision: "AI: Approved",
    status: "Approved",
    sla: "24d left",
    entityClassification: "Limited Partnership",
    entityType: "Limited Partnership",
    applicants: "David Okafor",
    applicantsType: "Agent",
  },
  {
    id: 6,
    sn: 6,
    avCode: "AV-2019-01",
    proposedName: "EDU FURNITURES LIMITED",
    submitted: "Nov 08, 2025 09:12PM",
    reasonForConsent: "New Incorporation",
    aiDecision: "AI: Needs Human Review",
    status: "Approved",
    sla: "54d left",
    entityClassification: "Incorporated Trustee",
    entityType: "Incorporated Trustee",
    applicants: "Grace Eze",
    applicantsType: "Public User",
  }
]

export function NameReservation() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Queried":
        return "bg-red-100 text-red-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDecisionColor = (decision: string) => {
    if (decision.includes("Recommended Approval")) return "text-blue-600"
    if (decision.includes("Approved")) return "text-green-600"
    if (decision.includes("Needs Human Review")) return "text-orange-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Reservations" value="10,340" icon="files" iconColor="gray" />
        <MetricCard title="Approved" value="9789" icon="files" iconColor="green" />
        <MetricCard title="Expiring Soon (Within 7 days)" value="312" icon="files" iconColor="red" />
      </div>

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <CardHeader>
          <CardTitle>Applications (300)</CardTitle>
          <div className="flex justify-end gap-4">
            <Button variant="default" size="xl" className="gap-2">
              <Settings className="h-4 w-4" />
              Manage Restricted Words
            </Button>
            <Button variant="outlineprimary" size="xl" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="flex w-full items-center justify-between gap-4 mt-5">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by AV code, name, applicant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-[360px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ListFilter className="h-4 w-4" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem>Approved</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Queried</DropdownMenuItem>
                  <DropdownMenuItem className="border-t mt-2">Nature of Business</DropdownMenuItem>
                  <DropdownMenuItem>Information Technology</DropdownMenuItem>
                  <DropdownMenuItem>Oil & Gas</DropdownMenuItem>
                  <DropdownMenuItem>Finance</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <div className="w-full overflow-x-auto px-4">
          <Table className="w-full min-w-max">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-sm text-gray-500">S/N</TableHead>
                <TableHead className="text-sm text-gray-500">AV Code</TableHead>
                <TableHead className="text-sm text-gray-500">Proposed Name</TableHead>
                <TableHead className="text-sm text-gray-500">Entity Classification</TableHead>
                <TableHead className="text-sm text-gray-500">Entity Type</TableHead>
                <TableHead className="text-sm text-gray-500">Applicants</TableHead>
                <TableHead className="text-sm text-gray-500">Status</TableHead>
                <TableHead className="text-sm text-gray-500">Days Remaining</TableHead>
                <TableHead className="text-sm text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-secondary text-gray-500">
                  <TableCell className="font-medium">{app.sn}</TableCell>
                  <TableCell>{app.avCode}</TableCell>
                  <TableCell>
                    <Link
                      href={`/pre-incorporation/name-reservation/${app.id}`}
                      className=""
                    >
                      {app.proposedName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{app.entityClassification}</TableCell>
                  <TableCell>{app.entityType}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex flex-col">
                      <span>{app.applicants}</span>
                      <small className="text-gray-900/50">{app.applicantsType}</small>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    <p className="text-green-600">{app.sla}</p>
                  </TableCell>
                  <TableCell>
                    <Link href={`/pre-incorporation/name-reservation/${app.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <div className="flex gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
              <Button key={idx} variant={page === 1 ? "default" : "outline"} size="sm" disabled={page === "..."}>
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </Card>
    </div>
  )
}
