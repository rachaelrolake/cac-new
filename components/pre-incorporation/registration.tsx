"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MetricCard } from "../reusables/metric-card"
import { Download, Eye, ListFilter, MoreVertical, Loader2, ChevronLeft, ChevronRight, Search, CheckCircle, X, MessageCircle } from "lucide-react"
import { registrationsAPI, type Registration, type RegistrationsStats } from "@/lib/api/pre-incorporation"
import { toast } from "sonner"

export function RegistrationPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [stats, setStats] = useState<RegistrationsStats>({ total: 0, approved: 0, pending: 0, queried: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const itemsPerPage = 10

  // Dialog state
  const [activeDialog, setActiveDialog] = useState<"approve" | "reject" | "query" | null>(null)
  const [selectedItem, setSelectedItem] = useState<Registration | null>(null)
  const [dialogReason, setDialogReason] = useState("")

  useEffect(() => {
    fetchRegistrations()
    fetchStats()
  }, [currentPage, statusFilter, searchQuery])

  const fetchRegistrations = async () => {
    setIsLoading(true)
    try {
      const response = await registrationsAPI.getRegistrations(
        currentPage,
        itemsPerPage,
        statusFilter || undefined,
        searchQuery || undefined
      )
      setRegistrations(response.data)
      setTotalPages(response.totalPages)
      setTotal(response.total)
    } catch (error: any) {
      toast.error("Failed to load registrations", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await registrationsAPI.getRegistrationsStats()
      setStats(statsData)
    } catch (error: any) {
      console.error("Failed to load stats:", error)
    }
  }

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const openDialog = (type: "approve" | "reject" | "query", item: Registration) => {
    setSelectedItem(item)
    setDialogReason("")
    setActiveDialog(type)
  }

  // Derive type slug from entityClassification for type-based endpoints
  const getEntityTypeSlug = (item: Registration) => {
    const cls = item.entityClassification?.toLowerCase()
    if (cls?.includes("business")) return "business_name"
    if (cls?.includes("llp") || cls?.includes("limited liability partnership")) return "llp"
    if (cls?.includes("lp") || cls?.includes("limited partnership")) return "lp"
    if (cls?.includes("incorporated trustee")) return "incorporated_trustees"
    return "company"
  }

  const handleApprove = async () => {
    if (!selectedItem) return
    setIsSubmitting(true)
    try {
      await registrationsAPI.approveRegistration(getEntityTypeSlug(selectedItem), selectedItem.id)
      toast.success("Registration approved successfully")
      setActiveDialog(null)
      fetchRegistrations()
      fetchStats()
    } catch (error: any) {
      toast.error("Failed to approve registration", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!selectedItem) return
    if (!dialogReason.trim()) { toast.error("Please provide a reason"); return }
    setIsSubmitting(true)
    try {
      await registrationsAPI.rejectRegistration(getEntityTypeSlug(selectedItem), selectedItem.id, { reason: dialogReason })
      toast.success("Registration rejected")
      setActiveDialog(null)
      fetchRegistrations()
      fetchStats()
    } catch (error: any) {
      toast.error("Failed to reject registration", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuery = async () => {
    if (!selectedItem) return
    if (!dialogReason.trim()) { toast.error("Please provide a query message"); return }
    setIsSubmitting(true)
    try {
      await registrationsAPI.queryRegistration(getEntityTypeSlug(selectedItem), selectedItem.id, { reason: dialogReason })
      toast.success("Query sent successfully")
      setActiveDialog(null)
      fetchRegistrations()
      fetchStats()
    } catch (error: any) {
      toast.error("Failed to send query", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase()
    if (s === "approved") return "bg-green-100 text-green-800"
    if (s === "pending" || s === "pending_review") return "bg-yellow-100 text-yellow-800"
    if (s === "queried") return "bg-red-100 text-red-800"
    if (s === "rejected") return "bg-rose-100 text-rose-800"
    return "bg-gray-100 text-gray-800"
  }

  const isPending = (status: string) => {
    const s = status?.toLowerCase()
    return s === "pending" || s === "pending_review"
  }

  return (
    <div className="space-y-6">
      {/* Approve Dialog */}
      <Dialog open={activeDialog === "approve"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Approve Registration</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 py-4">
            Are you sure you want to approve the registration for <span className="font-semibold">"{selectedItem?.entityName}"</span>?
          </p>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button className="bg-green-700 hover:bg-green-800" onClick={handleApprove} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={activeDialog === "reject"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Reject Registration</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-gray-500">Provide a reason for rejecting <span className="font-semibold">"{selectedItem?.entityName}"</span>.</p>
            <Textarea placeholder="Enter rejection reason..." className="min-h-[120px]" value={dialogReason} onChange={(e) => setDialogReason(e.target.value)} disabled={isSubmitting} />
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleReject} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Query Dialog */}
      <Dialog open={activeDialog === "query"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Query Registration</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-gray-500">Enter your query message for <span className="font-semibold">"{selectedItem?.entityName}"</span>.</p>
            <Textarea placeholder="Enter query message..." className="min-h-[120px]" value={dialogReason} onChange={(e) => setDialogReason(e.target.value)} disabled={isSubmitting} />
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleQuery} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Send Query"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Registrations" value={stats.total.toLocaleString()} icon="filesplus" iconColor="gray" />
        <MetricCard title="Approved" value={stats.approved.toLocaleString()} icon="filesplus" iconColor="green" />
        <MetricCard title="Pending" value={stats.pending.toLocaleString()} icon="filesplus" iconColor="orange" />
        <MetricCard title="Queried" value={stats.queried.toLocaleString()} icon="filesplus" iconColor="red" />
      </div>

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <CardHeader>
          <CardTitle>Registrations ({total})</CardTitle>
          <div className="flex justify-end">
            <Button variant="outlineprimary" size="xl" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="flex w-full items-center justify-between gap-4 mt-5">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by entity name, AR code, or applicant..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="min-w-[360px]"
              />
              <Button variant="outline" size="sm" onClick={handleSearch} className="gap-1">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ListFilter className="h-4 w-4" />
                  {statusFilter ? statusFilter : "Filters"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => { setStatusFilter(""); setCurrentPage(1); }}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setStatusFilter("approved"); setCurrentPage(1); }}>Approved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setStatusFilter("pending"); setCurrentPage(1); }}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setStatusFilter("queried"); setCurrentPage(1); }}>Queried</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setStatusFilter("rejected"); setCurrentPage(1); }}>Rejected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <div className="w-full overflow-x-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
            </div>
          ) : (
            <Table className="w-full min-w-max">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-sm text-gray-500">S/N</TableHead>
                  <TableHead className="text-sm text-gray-500">AR Code</TableHead>
                  <TableHead className="text-sm text-gray-500">Entity Name</TableHead>
                  <TableHead className="text-sm text-gray-500">Entity Classification</TableHead>
                  <TableHead className="text-sm text-gray-500">Entity Type</TableHead>
                  <TableHead className="text-sm text-gray-500">Applicant</TableHead>
                  <TableHead className="text-sm text-gray-500">Status</TableHead>
                  <TableHead className="text-sm text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.length > 0 ? (
                  registrations.map((reg, index) => (
                    <TableRow key={reg.id} className="hover:bg-secondary text-gray-500">
                      <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{reg.arCode}</TableCell>
                      <TableCell>
                        <Link href={`/pre-incorporation/registration/${getEntityTypeSlug(reg)}/${reg.id}`} className="hover:underline text-gray-900 font-medium">
                          {reg.entityName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{reg.entityClassification}</TableCell>
                      <TableCell>{reg.entityType}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span>{reg.applicant.firstName} {reg.applicant.lastName}</span>
                          <small className="text-gray-900/50">{reg.applicant.role || "—"}</small>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reg.status)}>{reg.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/pre-incorporation/registration/${reg.id}?type=${getEntityTypeSlug(reg)}`} className="gap-2 flex items-center">
                                <Eye className="w-4 h-4" /> View Application Details
                              </Link>
                            </DropdownMenuItem>
                            {isPending(reg.status) && (
                              <>
                                <DropdownMenuItem className="gap-2 text-green-800" onClick={() => openDialog("approve", reg)}>
                                  <CheckCircle className="text-green-800" /> Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-red-800" onClick={() => openDialog("reject", reg)}>
                                  <X className="w-4 h-4 text-red-800" /> Reject
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2" onClick={() => openDialog("query", reg)}>
                                  <MessageCircle className="w-4 h-4" /> Query Application
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-20 text-gray-500">
                      No registrations found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}