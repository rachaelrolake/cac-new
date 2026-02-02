"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye, X, Calendar, MoreVertical } from "lucide-react"
import { MetricCard } from "../reusables/metric-card"
import { Progress } from "../ui/progress"



const cases = [
  {
    id: "1",
    caseNumber: "CC-2026-001",
    organization: "TECH INNOVATIONS NIGERIA LIMITED",
    type: "Compliance",
    submitted: "Nov 15, 2025 09:49AM",
    reporter: "Ai: Recommendedation",
    status: "Pending",
    sla: "8 Hours Remaining",
    slaProgress: 80,
  },
  {
    id: "2",
    caseNumber: "CC-2026-001",
    organization: "GLOBAL PETROLEUM SERVICES LIMITED",
    type: "Compliance",
    submitted: "Nov 14, 2025 09:50AM",
    reporter: "Reviewer",
    status: "Suspended",
    sla: "8 Hours Remaining",
    slaProgress: 80,
  },
  {
    id: "3",
    caseNumber: "CC-2026-001",
    organization: "SUNRISE VENTURES LIMITED",
    type: "Fraud",
    submitted: "Nov 14, 2025 12:09PM",
    reporter: "Ai: Recommendedation",
    status: "Pending",
    sla: "8 Hours Remaining",
    slaProgress: 80,
  },
  {
    id: "4",
    caseNumber: "CC-2026-001",
    organization: "NATIONAL BANK OF COMMERCE LIMITED",
    type: "Compliance",
    submitted: "Nov 10, 2025 01:34PM",
    reporter: "User",
    status: "Resolved",
    sla: "Done",
    slaProgress: 100,
  },
  {
    id: "5",
    caseNumber: "CC-2026-001",
    organization: "SUNNET AGRO LIMITED",
    type: "Compliance",
    submitted: "Nov 14, 2025 05:12AM",
    reporter: "User",
    status: "Resolved",
    sla: "Done",
    slaProgress: 100,
  },
  {
    id: "6",
    caseNumber: "CC-2026-001",
    organization: "EDU FURNITURES LIMITED",
    type: "Fraud",
    submitted: "Nov 08, 2025 09:12PM",
    reporter: "Reviewer",
    status: "Resolved",
    sla: "Done",
    slaProgress: 100,
  },
  {
    id: "7",
    caseNumber: "CC-2026-001",
    organization: "JAGORA VENTURES LIMITED",
    type: "Fraud",
    submitted: "Nov 14, 2025 09:12AM",
    reporter: "Ai: Recommendedation",
    status: "Under Investigation",
    sla: "24 Days Remaining",
    slaProgress: 40,
  },
];

export function FraudComplianceList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-50 text-green-700 border-green-200"
      case "Pending": return "bg-orange-50 text-orange-700 border-orange-200"
      case "Failed": return "bg-red-50 text-red-700 border-red-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

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


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Cases" value="100" icon="files" iconColor="blue" />
        <MetricCard title="Resolved Cases" value="69" icon="checkmark" iconColor="green" />
        <MetricCard title="Suspended Cases" value="0" icon="cross" iconColor="red" />
        <MetricCard title="Pending Case Reviews" value="3" icon="clock" iconColor="orange" />

      </div>

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <CardHeader>
          <CardTitle>Cases (100)</CardTitle>
        </CardHeader>
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by case number, company..."
                  className="pl-10 h-11 bg-gray-50 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="gap-2 h-11 px-6 border-gray-200 text-gray-600"
              >
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
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12">S/N</TableHead>
                <TableHead>Case Number</TableHead>
                <TableHead>Name of Organization</TableHead>
                <TableHead>Case Type</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">SLA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="text-slate-600">{item.caseNumber}</TableCell>
                  <TableCell className="font-medium text-slate-700">{item.organization}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.submitted}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getReporterStyle(item.reporter)}>
                      {item.reporter}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusStyle(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <span className={`text-xs font-semibold ${getSlaTextStyle(item.sla)}`}>
                        {item.sla}
                      </span>
                      <div className={`h-1.5 w-full bg-gray-200 rounded-full overflow-hidden`}>
                        <div
                          className={`h-full ${getSlaBarColor(item.sla)}`}
                          style={{ width: `${item.slaProgress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/fraud-compliance/${item.id}/details`}>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" />
                            View Registration Detail
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <FileText className="h-4 w-4" />
                          Assign Case
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                          <Flag className="h-4 w-4 text-red-600" />
                          Suspend / Blacklist
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

      {/* Filter Dialog - Matching Screenshot */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <DialogTitle className="text-2xl font-bold text-gray-800">Filters</DialogTitle>
              <DialogClose asChild>
                {/* <Button variant="ghost" size="icon" className="rounded-full bg-blue-50 text-blue-900">
                  <X className="h-5 w-5" />
                </Button> */}
              </DialogClose>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2 w-full">
                <label className="text-sm font-semibold text-gray-700">All Case Types</label>
                <Select >
                  <SelectTrigger className="h-12 border-gray-300 w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Status</label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-300 w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Under Investigation</SelectItem>
                    <SelectItem value="pending">Resoled</SelectItem>
                    <SelectItem value="failed">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mb-12">
              <label className="text-sm font-semibold text-gray-700">Date Range</label>
              <div className="relative">
                <Input className="h-12 border-gray-300 pl-4 pr-10" type="date" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(false)}
                className="text-green-800 border-green-800 px-10 h-12 hover:bg-green-50"
              >
                Clear filter
              </Button>
              <Button
                className="bg-green-800 hover:bg-green-900 text-white px-10 h-12"
              >
                Save filter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// --- Helper Functions for Styling ---

function getReporterStyle(reporter: string) {
  if (reporter.includes("Ai")) return "bg-blue-50 text-blue-600 border-blue-100";
  if (reporter === "Reviewer") return "bg-orange-50 text-orange-600 border-orange-100";
  return "bg-green-50 text-green-600 border-green-100";
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Pending": return "bg-slate-100 text-slate-700";
    case "Suspended": return "bg-red-50 text-red-500 border-red-100";
    case "Resolved": return "bg-green-50 text-green-600 border-green-100";
    case "Under Investigation": return "bg-blue-50 text-blue-600 border-blue-100";
    default: return "";
  }
}

function getSlaTextStyle(sla: string) {
  if (sla === "Done") return "text-green-600";
  if (sla.includes("Hours")) return "text-red-500";
  return "text-orange-500";
}

function getSlaBarColor(sla: string) {
  if (sla === "Done") return "bg-green-500";
  if (sla.includes("Hours")) return "bg-red-500";
  return "bg-orange-500";
}