"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CategoryTabs } from "./category-tabs"
import { MetricCard } from "./metric-card"
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye } from "lucide-react"

interface ConsentApplicationsListProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

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
    natureOfBusiness: "Information Technology",
    applicants: "John Doe",
  },
  {
    id: 2,
    sn: 2,
    avCode: "AV-2019-01",
    proposedName: "GLOBAL PETROLEUM SERVICES LIMITED",
    submitted: "Nov 14, 2025 09:50AM",
    reasonForConsent: "Use Of Restricted Word",
    aiDecision: "AI: Needs Human Review",
    status: "Queried",
    sla: "Done",
    natureOfBusiness: "Oil & Gas",
    applicants: "Ahmed Hassan",
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
    sla: "Done",
    natureOfBusiness: "Investment & Finance",
    applicants: "Mary Johnson",
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
    sla: "8 Hours Remaining",
    natureOfBusiness: "Banking & Financial Services",
    applicants: "Michael Chen",
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
    sla: "24 Days Remaining",
    natureOfBusiness: "Agriculture",
    applicants: "David Okafor",
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
    sla: "8 Hours Remaining",
    natureOfBusiness: "Furniture Manufacturing",
    applicants: "Grace Eze",
  },
  {
    id: 7,
    sn: 7,
    avCode: "AV-2019-01",
    proposedName: "JAGORA VENTURES LIMITED",
    submitted: "Nov 14, 2025 09: 12AM",
    reasonForConsent: "Group Holdings/ Consortium",
    aiDecision: "AI: Recommended Approval",
    status: "Under Review",
    sla: "8 Hours Remaining",
    natureOfBusiness: "Logistics & Transportation",
    applicants: "Chioma Nwankwo",
  },
]

export function RegistrationApplicationList({ activeCategory, setActiveCategory }: ConsentApplicationsListProps) {
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
      <div>
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} type="consent" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {activeCategory === "business-name" && (
          <>
            <MetricCard title="Total Business Name Registration" value="10,340" icon="users" iconColor="gray" />
            <MetricCard title="Auto Approved Reservations" value="9789" icon="checkmark" iconColor="green" />
            <MetricCard title="Out of Turn Around Time" value="312" icon="cross" iconColor="red" />
            <MetricCard title="Rejected by AI" value="3" icon="cross" iconColor="red" />
            <MetricCard title="Pending AI Reviews" value="3" icon="clock" iconColor="blue" />
          </>
        )}
        {activeCategory === "company-name" && (
          <>
            <MetricCard title="Total Company Name Registration" value="10,340" icon="users" iconColor="gray" />
            <MetricCard title="Auto Approved Reservations" value="9789" icon="checkmark" iconColor="green" />
            <MetricCard title="Out of Turn Around Time" value="312" icon="cross" iconColor="red" />
            <MetricCard title="Rejected by AI" value="3" icon="cross" iconColor="red" />
            <MetricCard title="Pending Review by AI" value="3" icon="clock" iconColor="blue" />
          </>
        )}
        {activeCategory === "llp" && (
          <>
            <MetricCard title="Total Limited Liability Partnership Registration" value="10,340" icon="users" iconColor="gray" />
            <MetricCard title="Auto Approved Reservations" value="9789" icon="checkmark" iconColor="green" />
            <MetricCard title="Out of Turn Around Time" value="312" icon="cross" iconColor="red" />
            <MetricCard title="Rejected by AI" value="3" icon="cross" iconColor="red" />
            <MetricCard title="Pending AI Reviews" value="3" icon="clock" iconColor="blue" />
          </>
        )}
        {activeCategory === "lp" && (
          <>
            <MetricCard title="Total Limited Partnership Registration" value="10,340" icon="users" iconColor="gray" />
            <MetricCard title="Auto Approved Reservations" value="9789" icon="checkmark" iconColor="green" />
            <MetricCard title="Out of Turn Around Time" value="312" icon="cross" iconColor="red" />
            <MetricCard title="Rejected by AI" value="3" icon="cross" iconColor="red" />
            <MetricCard title="Pending AI Reviews" value="3" icon="clock" iconColor="blue" />
          </>
        )}
        {activeCategory === "it" && (
          <>
            <MetricCard title="Total Incorporated Trustees Registration" value="10,340" icon="users" iconColor="gray" />
            <MetricCard title="Auto Approved Reservations" value="9789" icon="checkmark" iconColor="green" />
            <MetricCard title="Out of Turn Around Time" value="312" icon="cross" iconColor="red" />
            <MetricCard title="Rejected by AI" value="3" icon="cross" iconColor="red" />
            <MetricCard title="Pending AI Reviews" value="3" icon="clock" iconColor="blue" />
          </>
        )}
      </div>

      <Card style={{width: "calc(100vw - 145px)"}}>
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or Code"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto p-4">
          <Table className="w-full min-w-max">
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>AV Code</TableHead>
                <TableHead>Proposed Name</TableHead>
                <TableHead>Nature of Business</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Reason for Consent</TableHead>
                <TableHead>AI Decision</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-secondary">
                  <TableCell className="font-medium">{app.sn}</TableCell>
                  <TableCell>{app.avCode}</TableCell>
                  <TableCell>
                    <Link
                      href={`/pre-incorporation/application/${app.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {app.proposedName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{app.natureOfBusiness}</TableCell>
                  <TableCell className="text-sm">{app.submitted}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-white">
                        {app.applicants.charAt(0)}
                      </div>
                      <span>{app.applicants}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{app.reasonForConsent}</TableCell>
                  <TableCell className={`text-sm font-medium ${getDecisionColor(app.aiDecision)}`}>
                    {app.aiDecision}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex flex-col gap-2">
                      <span className={app.sla === "Done" ? "text-green-600" : app.sla.includes("Hours") ? "text-orange-600" : "text-red-600"}>{app.sla}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${app.sla === "Done"
                            ? "bg-green-500 w-full"
                            : app.sla.includes("Hours")
                              ? "bg-orange-500 w-1/3"
                              : "bg-red-500 w-1/4"
                            }`}
                        />
                      </div>

                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/pre-incorporation/application/${app.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Registration Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Request Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Flag className="h-4 w-4 text-red-600" />
                          Flag
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash2 className="h-4 w-4 text-red-600" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
