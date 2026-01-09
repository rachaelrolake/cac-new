"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
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
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye, X, Calendar, MoreVertical, ChevronDown } from "lucide-react"

interface ActivityListProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const mockLogs = [
  { id: 1, sn: 1, activityType: "Swift Logistics Nigeria", details: "Auto-approved based on 94% confidence score", timestamp: "2024-12-15 10:45:23", action: "Approved", actor: "AI System" },
  { id: 2, sn: 2, activityType: "Apex Financial Consultants", details: "Overrode AI recommendation. Reason: Name co", timestamp: "2024-12-15 10:32:11", action: "Override", actor: "Admin User" },
  { id: 3, sn: 3, activityType: "Threshold Settings", details: "Updated similarity threshold from 25% to 30%", timestamp: "2024-12-15 10:15:45", action: "System Config Change", actor: "Super Admin" },
  { id: 4, sn: 4, activityType: "Diamond Mining Corporation", details: "Sent for manual review - contains sensitive keyw", timestamp: "2024-12-15 09:58:33", action: "Manual Review", actor: "Review Officer" },
  { id: 5, sn: 5, activityType: "Sunrise Agriculture Ltd", details: "Manually approved after review", timestamp: "2024-12-15 09:45:12", action: "Rejected", actor: "Review Officer" },
  { id: 6, sn: 6, activityType: "Change of Directors", details: "Manually approved after review", timestamp: "2024-12-15 09:30:00", action: "Rejected", actor: "Admin User" },
  { id: 7, sn: 7, activityType: "Annual Return Fillings", details: "Manually approved after review", timestamp: "2024-12-15 09:30:00", action: "Approved", actor: "Review Officer" },
]

export function ActivityList({ activeCategory, setActiveCategory }: ActivityListProps) {
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

  const getActionBadge = (action: string) => {
    switch (action) {
      case "Approved": return "bg-green-50 text-green-700 border-green-200"
      case "Rejected": return "bg-red-50 text-red-700 border-red-200"
      case "Manual Review": return "bg-blue-50 text-blue-700 border-blue-200"
      case "System Config Change": return "bg-orange-50 text-orange-700 border-orange-200"
      case "Override": return "bg-gray-50 text-gray-700 border-gray-200"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search Logs"
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
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[60px] text-gray-500 font-medium">S/N</TableHead>
                <TableHead className="text-gray-500 font-medium">Activity Type</TableHead>
                <TableHead className="text-gray-500 font-medium">Details</TableHead>
                <TableHead className="text-gray-500 font-medium">Time-stamp</TableHead>
                <TableHead className="text-gray-500 font-medium">
                  <div className="flex items-center gap-1">
                    Actions <ChevronDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-500 font-medium">Actor</TableHead>
                <TableHead className="text-right text-gray-500 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50/50 border-b border-gray-50">
                  <TableCell className="text-gray-600">{log.sn}</TableCell>
                  <TableCell className="text-gray-600 font-medium">{log.activityType}</TableCell>
                  <TableCell className="text-gray-500 max-w-[300px] truncate">{log.details}</TableCell>
                  <TableCell className="text-gray-600">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getActionBadge(log.action)} px-3 py-1 font-medium rounded-full border`}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 font-medium rounded-full">
                      {log.actor}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="hover:bg-transparent">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </Button>
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
                <label className="text-sm font-semibold text-gray-700">Actors</label>
                <Select >
                  <SelectTrigger className="h-12 border-gray-300 w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="all-actors">All Actors</SelectItem>
                    <SelectItem value="ai-system">AI System</SelectItem>
                    <SelectItem value="human">Human</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Actions</label>
                <Select>
                  <SelectTrigger className="h-12 border-gray-300 w-full">
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="manual-review">Manual Review</SelectItem>
                    <SelectItem value="override">Override</SelectItem>
                    <SelectItem value="system-config-change">System Config Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-sm font-semibold text-gray-700">Entity Type</label>
              <Select>
                <SelectTrigger className="h-12 border-gray-300 w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Business Name">Business Name</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Limited Liability Partnership">Limited Liability Partnership</SelectItem>
                  <SelectItem value="Limited Partnership">Limited Partnership</SelectItem>
                  <SelectItem value="Limited by Guarantee">Limited by Guarantee</SelectItem>
                  <SelectItem value="Incorporated Trustees">Incorporated Trustees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mb-12">
              <label className="text-sm font-semibold text-gray-700">Date Range</label>
              <div className="relative">
                <Input className="h-12 border-gray-300 pl-4 pr-10" placeholder="--select--" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
