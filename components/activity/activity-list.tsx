"use client"

import { useState, useEffect } from "react"
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
import { Search, Filter, Download, Calendar, MoreVertical, ChevronDown, Loader2 } from "lucide-react"
import { dashboardAPI, type ActivityLog } from "@/lib/api/dashboard"
import { toast } from "sonner"
import { format } from "date-fns"

export function ActivityList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchActivities()
  }, [currentPage])

  const fetchActivities = async () => {
    setIsLoading(true)
    try {
      const response = await dashboardAPI.getActivity(currentPage, 10)
      setActivities(response.data)
      setTotal(response.total)
    } catch (error: any) {
      toast.error("Failed to load activity logs", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getActionBadge = (action: string) => {
    switch (action.toUpperCase()) {
      case "APPROVED":
      case "APPROVE":
        return "bg-green-50 text-green-700 border-green-200"
      case "REJECTED":
      case "REJECT":
        return "bg-red-50 text-red-700 border-red-200"
      case "MANUAL REVIEW":
      case "REVIEW":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "SYSTEM CONFIG CHANGE":
      case "UPDATE":
      case "EDIT":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "OVERRIDE":
        return "bg-gray-50 text-gray-700 border-gray-200"
      case "LOGIN":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "CREATE":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "DELETE":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const formatTimestamp = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss")
    } catch {
      return dateString
    }
  }

  const totalPages = Math.ceil(total / 10)

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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
          ) : (
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
                {activities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                      No activity logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  activities.map((log, index) => (
                    <TableRow key={log.id} className="hover:bg-gray-50/50 border-b border-gray-50">
                      <TableCell className="text-gray-600">{(currentPage - 1) * 10 + index + 1}</TableCell>
                      <TableCell className="text-gray-600 font-medium">{log.entityType}</TableCell>
                      <TableCell className="text-gray-500 max-w-[300px] truncate">{log.description}</TableCell>
                      <TableCell className="text-gray-600">{formatTimestamp(log.timestamp)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getActionBadge(log.action)} px-3 py-1 font-medium rounded-full border`}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 font-medium rounded-full">
                          {log.performedBy}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:bg-transparent">
                          <MoreVertical className="h-5 w-5 text-gray-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {[...Array(Math.min(10, totalPages))].map((_, idx) => {
              const page = idx + 1
              return (
                <Button
                  key={idx}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
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
                onClick={() => setIsFilterOpen(false)}
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