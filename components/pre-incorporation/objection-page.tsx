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
import { format } from "date-fns"

export function ObjectionPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [stats, setStats] = useState<RegistrationsStats>({ total: 0, approved: 0, pending: 0, queried: 0 })
  const [isLoading, setIsLoading] = useState(false)
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



  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const openDialog = (type: "approve" | "reject" | "query", item: Registration) => {
    setSelectedItem(item)
    setDialogReason("")
    setActiveDialog(type)
  }

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase()
    if (s === "approved") return "bg-green-100 text-green-800"
    if (s === "pending" || s === "pending_review") return "bg-yellow-100 text-yellow-800"
    if (s === "queried") return "bg-red-100 text-red-800"
    if (s === "rejected") return "bg-rose-100 text-rose-800"
    return "bg-gray-100 text-gray-800"
  }

  const objectionsArray = [
    {
      id: "OBJ001",
      objectorName: "John Smith",
      entityName: "Tech Solutions Ltd",
      entityClassification: "Limited Company",
      status: "pending",
    },
    {
      id: "OBJ002",
      objectorName: "Sarah Johnson",
      entityName: "Green Energy Corp",
      entityClassification: "Corporation",
      status: "approved",
    },
    {
      id: "OBJ003",
      objectorName: "Michael Brown",
      entityName: "Digital Ventures",
      entityClassification: "Partnership",
      status: "approved",
    },
    {
      id: "OBJ004",
      objectorName: "Emily Davis",
      entityName: "Global Consulting",
      entityClassification: "Limited Company",
      status: "approved",
    },
    {
      id: "OBJ005",
      objectorName: "David Wilson",
      entityName: "Creative Studios",
      entityClassification: "LLC",
      status: "pending",
    },
    {
      id: "OBJ006",
      objectorName: "Lisa Anderson",
      entityName: "Financial Services Inc",
      entityClassification: "Corporation",
      status: "rejected",
    },
    {
      id: "OBJ007",
      objectorName: "Robert Taylor",
      entityName: "Manufacturing Co",
      entityClassification: "Limited Company",
      status: "approved",
    },
    {
      id: "OBJ008",
      objectorName: "Jennifer White",
      entityName: "Innovation Labs",
      entityClassification: "Partnership",
      status: "pending",
    },
    {
      id: "OBJ009",
      objectorName: "James Martin",
      entityName: "Real Estate Group",
      entityClassification: "Corporation",
      status: "approved",
    },
    {
      id: "OBJ010",
      objectorName: "Patricia Lee",
      entityName: "Healthcare Plus",
      entityClassification: "Limited Company",
      status: "approved",
    },
  ]
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
            <Button className="bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
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
            <Button className="bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
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
            <Button className="bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Send Query"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Objections" value={300} icon="filesplus" iconColor="gray" />
        <MetricCard title="Approved" value={297} icon="filesplus" iconColor="green" />
        <MetricCard title="Pending" value={2} icon="filesplus" iconColor="orange" />
        <MetricCard title="Queried" value={1} icon="filesplus" iconColor="red" />
      </div>

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <CardHeader>
          <CardTitle>Registrations (300)</CardTitle>
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
              {/* <Button variant="outline" size="sm" onClick={handleSearch} className="gap-1">
                <Search className="h-4 w-4" />
              </Button> */}
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
                  <TableHead className="text-sm text-gray-500">Objection ID</TableHead>
                  <TableHead className="text-sm text-gray-500">Objector</TableHead>
                  <TableHead className="text-sm text-gray-500">Entity</TableHead>
                  <TableHead className="text-sm text-gray-500">Entity Type</TableHead>
                  <TableHead className="text-sm text-gray-500">Status</TableHead>
                  <TableHead className="text-sm text-gray-500 text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {objectionsArray.map((item, index) => (
                  <TableRow key={item.id} className="border-b hover:bg-secondary text-gray-500">
                    <TableCell className="text-sm">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="text-sm font-medium">{item.id}</TableCell>
                    <TableCell className="text-sm">{item.objectorName}</TableCell>
                    <TableCell className="text-gray-900 font-medium">{item.entityName}</TableCell>
                    <TableCell className="text-sm">{item.entityClassification}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-end">
                      <Button variant="link" className="p-0">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
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