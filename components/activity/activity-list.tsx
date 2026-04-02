"use client"

import { useState, useEffect } from "react"
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
import { Search, Filter, Download, Calendar, MoreVertical, ChevronDown, Loader2, X, Eye } from "lucide-react"
import { auditLogsAPI, type AuditLog, type AuditLogFilters } from "@/lib/api/audit-logs"
import { toast } from "sonner"
import { format } from "date-fns"

export function ActivityList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [activities, setActivities] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter states
  const [filters, setFilters] = useState<AuditLogFilters>({
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    fetchActivities()
  }, [currentPage, filters])

  const fetchActivities = async () => {
    setIsLoading(true)
    try {
      const response = await auditLogsAPI.getAuditLogs({
        ...filters,
        page: currentPage,
      })
      setActivities(response.data)
      setTotal(response.total)
    } catch (error: any) {
      toast.error("Failed to load audit logs", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log)
    setIsDetailsOpen(true)
  }

  const handleApplyFilters = (newFilters: Partial<AuditLogFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
    })
    setCurrentPage(1)
    setIsFilterOpen(false)
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
      case "UPDATE_PROFILE":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "OVERRIDE":
        return "bg-gray-50 text-gray-700 border-gray-200"
      case "LOGIN":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "CREATE":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "DELETE":
        return "bg-red-50 text-red-700 border-red-200"
      case "QUERY_ENTITY":
        return "bg-orange-50 text-orange-700 border-orange-200"
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

  const formatActionLabel = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const totalPages = Math.ceil(total / 10)

  const filteredActivities = activities.filter(log => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return (
      log.entityType?.toLowerCase().includes(search) ||
      log.action?.toLowerCase().includes(search) ||
      log.userEmail?.toLowerCase().includes(search)
    )
  })

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
                  <TableHead className="text-gray-500 font-medium">Entity Type</TableHead>
                  <TableHead className="text-gray-500 font-medium">Entity ID</TableHead>
                  <TableHead className="text-gray-500 font-medium">Time-stamp</TableHead>
                  <TableHead className="text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      Action <ChevronDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium">Actor</TableHead>
                  <TableHead className="text-gray-500 font-medium">Device</TableHead>
                  <TableHead className="text-right text-gray-500 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((log, index) => (
                    <TableRow key={log.id} className="hover:bg-gray-50/50 border-b border-gray-50">
                      <TableCell className="text-gray-600">{(currentPage - 1) * 10 + index + 1}</TableCell>
                      <TableCell className="text-gray-600 font-medium">{log.entityType}</TableCell>
                      <TableCell className="text-gray-500 max-w-[200px] truncate font-mono text-xs">
                        {log.entityId}
                      </TableCell>
                      <TableCell className="text-gray-600">{formatTimestamp(log.timestamp)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getActionBadge(log.action)} px-3 py-1 font-medium rounded-full border`}>
                          {formatActionLabel(log.action)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {log.userEmail ? (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 font-medium rounded-full">
                            {log.userEmail}
                          </Badge>
                        ) : (
                          <span className="text-gray-400 text-sm">System</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500 text-xs max-w-[150px] truncate">
                        {log.userAgent || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-100"
                          onClick={() => handleViewDetails(log)}
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
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

      {/* Filter Dialog */}
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        currentFilters={filters}
      />

      {/* Details Modal */}
      <DetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        log={selectedLog}
      />
    </div>
  )
}

// Filter Dialog Component
interface FilterDialogProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: Partial<AuditLogFilters>) => void
  onClear: () => void
  currentFilters: AuditLogFilters
}

function FilterDialog({ isOpen, onClose, onApply, onClear, currentFilters }: FilterDialogProps) {
  const [tempFilters, setTempFilters] = useState<Partial<AuditLogFilters>>({})

  useEffect(() => {
    setTempFilters(currentFilters)
  }, [currentFilters, isOpen])

  const handleApply = () => {
    onApply(tempFilters)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <DialogTitle className="text-2xl font-bold text-gray-800">Filters</DialogTitle>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2 w-full">
              <label className="text-sm font-semibold text-gray-700">User Email</label>
              <Input
                placeholder="Filter by user email"
                className="h-12 border-gray-300 w-full"
                value={tempFilters.user || ''}
                onChange={(e) => setTempFilters({ ...tempFilters, user: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Actions</label>
              <Select
                value={tempFilters.action || 'all'}
                onValueChange={(value) => setTempFilters({ ...tempFilters, action: value === 'all' ? undefined : value })}
              >
                <SelectTrigger className="h-12 border-gray-300 w-full">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="UPDATE_PROFILE">Update Profile</SelectItem>
                  <SelectItem value="QUERY_ENTITY">Query Entity</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="CREATE">Create</SelectItem>
                  <SelectItem value="UPDATE">Update</SelectItem>
                  <SelectItem value="DELETE">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700">Entity Type</label>
            <Select
              value={tempFilters.entityType || 'all'}
              onValueChange={(value) => setTempFilters({ ...tempFilters, entityType: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="h-12 border-gray-300 w-full">
                <SelectValue placeholder="All Entity Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entity Types</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="COMPANYRegistration">Company Registration</SelectItem>
                <SelectItem value="BusinessName">Business Name</SelectItem>
                <SelectItem value="LLP">Limited Liability Partnership</SelectItem>
                <SelectItem value="LP">Limited Partnership</SelectItem>
                <SelectItem value="IncorporatedTrustees">Incorporated Trustees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Start Date</label>
              <div className="relative">
                <Input
                  type="date"
                  className="h-12 border-gray-300 pl-4"
                  value={tempFilters.startDate || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, startDate: e.target.value })}
                />
                {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" /> */}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">End Date</label>
              <div className="relative">
                <Input
                  type="date"
                  className="h-12 border-gray-300 pl-4"
                  value={tempFilters.endDate || ''}
                  onChange={(e) => setTempFilters({ ...tempFilters, endDate: e.target.value })}
                />
                {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" /> */}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={onClear}
              className="text-green-800 border-green-800 px-10 h-12 hover:bg-green-50"
            >
              Clear filter
            </Button>
            <Button
              className="bg-green-800 hover:bg-green-900 text-white px-10 h-12"
              onClick={handleApply}
            >
              Apply filter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Details Modal Component
interface DetailsModalProps {
  isOpen: boolean
  onClose: () => void
  log: AuditLog | null
}

function DetailsModal({ isOpen, onClose, log }: DetailsModalProps) {
  if (!log) return null

  const formatTimestamp = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPpp")
    } catch {
      return dateString
    }
  }

  const formatActionLabel = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Audit Log Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Log ID" value={log.id} mono />
            <InfoItem label="Timestamp" value={formatTimestamp(log.timestamp)} />
            <InfoItem label="Entity Type" value={log.entityType} />
            <InfoItem label="Entity ID" value={log.entityId} mono />
            <InfoItem label="Action" value={formatActionLabel(log.action)} badge />
            <InfoItem label="User Email" value={log.userEmail || "System"} />
            <InfoItem label="User ID" value={log.userId || "N/A"} mono />
            <InfoItem label="IP Address" value={log.ipAddress || "N/A"} />
          </div>

          {/* Device Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Device Information</h3>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 break-all">
                {log.userAgent || "No device information available"}
              </p>
            </div>
          </div>

          {/* Old Values */}
          {log.oldValues && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Previous Values</h3>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(log.oldValues, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* New Values - Dynamic Rendering */}
          {log.newValues && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">New Values</h3>
              <div className="space-y-2">
                {Object.entries(log.newValues).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-green-900 uppercase tracking-wide mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-700 break-all">
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <InfoItem label="Created At" value={formatTimestamp(log.createdAt)} />
            <InfoItem label="Updated At" value={formatTimestamp(log.updatedAt)} />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={onClose}
            className="bg-green-800 hover:bg-green-900 text-white px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Info Item Component
interface InfoItemProps {
  label: string
  value: string
  mono?: boolean
  badge?: boolean
}

function InfoItem({ label, value, mono, badge }: InfoItemProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      {badge ? (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 font-medium">
          {value}
        </Badge>
      ) : (
        <p className={`text-sm text-gray-700 ${mono ? 'font-mono text-xs' : ''} break-all`}>
          {value}
        </p>
      )}
    </div>
  )
}