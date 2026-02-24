"use client"

import { useState, useEffect, useCallback } from "react"
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
import { Download, Eye, ListFilter, MoreVertical, Settings, Loader2, ChevronLeft, ChevronRight, Search, CheckCircle, X, MessageCircle } from "lucide-react"
import { reservationsAPI, type Reservation, type ReservationsStats } from "@/lib/api/pre-incorporation"
import { toast } from "sonner"
import { format } from "date-fns"

export function NameReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [stats, setStats] = useState<ReservationsStats>({ total: 0, approved: 0, pending: 0, expiringSoon: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const itemsPerPage = 10

  // Dialog state
  const [activeDialog, setActiveDialog] = useState<"approve" | "reject" | "query" | null>(null)
  const [selectedItem, setSelectedItem] = useState<Reservation | null>(null)
  const [dialogReason, setDialogReason] = useState("")

  useEffect(() => {
    fetchReservations()
    fetchStats()
  }, [currentPage, statusFilter, searchQuery])

  const fetchReservations = async () => {
    setIsLoading(true)
    try {
      const response = await reservationsAPI.getReservations(
        currentPage,
        itemsPerPage,
        statusFilter || undefined,
        searchQuery || undefined
      )
      setReservations(response.data)
      setTotalPages(response.totalPages)
      setTotal(response.total)
    } catch (error: any) {
      toast.error("Failed to load reservations", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await reservationsAPI.getReservationsStats()
      setStats(statsData)
    } catch (error: any) {
      console.error("Failed to load stats:", error)
    }
  }

  // Debounced search - trigger after user stops typing
  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const openDialog = (type: "approve" | "reject" | "query", item: Reservation) => {
    setSelectedItem(item)
    setDialogReason("")
    setActiveDialog(type)
  }

  const handleApprove = async () => {
    if (!selectedItem) return
    setIsSubmitting(true)
    try {
      await reservationsAPI.approveReservation(selectedItem.id)
      toast.success("Reservation approved successfully")
      setActiveDialog(null)
      fetchReservations()
      fetchStats()
    } catch (error: any) {
      toast.error("Failed to approve reservation", {
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
      await reservationsAPI.rejectReservation(selectedItem.id, { reason: dialogReason })
      toast.success("Reservation rejected")
      setActiveDialog(null)
      fetchReservations()
      fetchStats()
    } catch (error: any) {
      toast.error("Failed to reject reservation", {
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
      await reservationsAPI.queryReservation(selectedItem.id, { reason: dialogReason })
      toast.success("Query sent successfully")
      setActiveDialog(null)
      fetchReservations()
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

  const getDaysRemaining = (expiryDate: string | null) => {
    if (!expiryDate) return "N/A"
    const diff = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return <span className="text-red-600">Expired</span>
    if (diff <= 7) return <span className="text-red-600">{diff}d left</span>
    return <span className="text-green-600">{diff}d left</span>
  }

  return (
    <div className="space-y-6">
      {/* Action Dialogs */}
      <Dialog open={activeDialog === "approve"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Approve Reservation</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 py-4">
            Are you sure you want to approve the reservation for <span className="font-semibold">"{selectedItem?.businessName}"</span>?
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

      <Dialog open={activeDialog === "reject"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Reject Reservation</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-gray-500">Provide a reason for rejecting <span className="font-semibold">"{selectedItem?.businessName}"</span>.</p>
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

      <Dialog open={activeDialog === "query"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Query Reservation</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-gray-500">Enter your query message for <span className="font-semibold">"{selectedItem?.businessName}"</span>.</p>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Reservations" value={stats.total.toLocaleString()} icon="files" iconColor="gray" />
        <MetricCard title="Approved" value={stats.approved.toLocaleString()} icon="files" iconColor="green" />
        <MetricCard title="Expiring Soon (Within 7 days)" value={stats.expiringSoon.toLocaleString()} icon="files" iconColor="red" />
      </div>

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <CardHeader>
          <CardTitle>Reservations ({total})</CardTitle>
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
                  <TableHead className="text-sm text-gray-500">AV Code</TableHead>
                  <TableHead className="text-sm text-gray-500">Proposed Name</TableHead>
                  <TableHead className="text-sm text-gray-500">Business Type</TableHead>
                  <TableHead className="text-sm text-gray-500">Classification</TableHead>
                  <TableHead className="text-sm text-gray-500">Applicant</TableHead>
                  <TableHead className="text-sm text-gray-500">Status</TableHead>
                  <TableHead className="text-sm text-gray-500">Days Remaining</TableHead>
                  <TableHead className="text-sm text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.length > 0 ? (
                  reservations.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-secondary text-gray-500">
                      <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{item.avCode}</TableCell>
                      <TableCell>
                        <Link href={`/pre-incorporation/name-reservation/${item.id}?tab=name-reservation`} className="hover:underline text-gray-900 font-medium">
                          {item.businessName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{item.businessType}</TableCell>
                      <TableCell>{item.classification}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span>{item.applicant.firstName} {item.applicant.lastName}</span>
                          <small className="text-gray-900/50">{item.applicant.role || "—"}</small>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{getDaysRemaining(item.expiryDate)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/pre-incorporation/name-reservation/${item.id}?tab=name-reservation`} className="gap-2 flex items-center">
                                <Eye className="w-4 h-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                            {item.status?.toLowerCase() === "pending" || item.status?.toLowerCase() === "pending_review" ? (
                              <>
                                <DropdownMenuItem className="gap-2 text-green-800" onClick={() => openDialog("approve", item)}>
                                  <CheckCircle className="text-green-800" /> Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-red-800" onClick={() => openDialog("reject", item)}>
                                  <X className="w-4 h-4 text-red-800" /> Reject
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2" onClick={() => openDialog("query", item)}>
                                  <MessageCircle className="w-4 h-4" /> Query
                                </DropdownMenuItem>
                              </>
                            ) : null}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-20 text-gray-500">
                      No reservations found
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