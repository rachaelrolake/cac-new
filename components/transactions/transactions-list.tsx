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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MetricCard } from "./metric-card"
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye, X, Calendar, MoreVertical, Loader2 } from "lucide-react"
import { paymentsAPI, type Payment, type PaymentStats } from "@/lib/api/payments"
import { toast } from "sonner"
import { format } from "date-fns"

export function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [transactions, setTransactions] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<"Pending" | "Paid" | "Failed" | "Refunded" | undefined>()

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [currentPage, statusFilter])

  const fetchStats = async () => {
    try {
      const data = await paymentsAPI.getStats()
      setStats(data)
    } catch (error: any) {
      toast.error("Failed to load payment statistics", {
        description: error.response?.data?.message || "Please try again"
      })
    }
  }

  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      const response = await paymentsAPI.getHistory(currentPage, 10, statusFilter)
      setTransactions(response.data)
      setTotal(response.total)
    } catch (error: any) {
      toast.error("Failed to load transactions", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-50 text-green-700 border-green-200"
      case "Pending": return "bg-orange-50 text-orange-700 border-orange-200"
      case "Failed": return "bg-red-50 text-red-700 border-red-200"
      case "Refunded": return "bg-blue-50 text-blue-700 border-blue-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number, currency: string = "NGN") => {
    return `₦${amount?.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy hh:mma")
    } catch {
      return dateString
    }
  }

  const totalPages = Math.ceil(total / 10)
  return (
    <div className="space-y-6">


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={stats ? formatCurrency(stats.totalRevenue) : "₦0"}
          icon="users"
          iconColor="blue"
          percentage="+12.5%"
          subtitle="2 New transactions this week"
        />
        <MetricCard
          title="Completed Transactions"
          value={stats?.transactionCount.toString() || "0"}
          icon="checkmark"
          iconColor="green"
          percentage="-12.5%"
          subtitle="1 New Last week"
        />
        <MetricCard
          title="Failed Transactions"
          value={stats?.failed.count.toString() || "0"}
          icon="cross"
          iconColor="red"
          percentage="+12.5%"
          subtitle="10 failed this week"
        />
        <MetricCard
          title="Pending Transactions"
          value={stats ? formatCurrency(stats.pending.amount) : "₦0"}
          icon="clock"
          iconColor="orange"
          percentage="+12.5%"
          subtitle="1 undergoing (< 24hrs)"
        />
      </div>

      <Card style={{ width: "calc(100vw - 145px)" }}>
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction ID, Servi..."
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
                <TableRow>
                  <TableHead className="w-[60px]">S/N</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Organization Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((tx, index) => (
                    <TableRow key={tx.id} className="hover:bg-gray-50/50 border-b">
                      <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                      <TableCell className="text-gray-600">{tx.orderId}</TableCell>
                      <TableCell className="font-medium text-gray-700">{tx.payerName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-100 text-gray-600 font-normal px-3 py-1">
                          {tx.entityType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(tx.amount, tx.currency)}</TableCell>
                      <TableCell className="text-gray-500 text-xs">{formatDate(tx.transactionDate)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusBadge(tx.status)} px-3 py-1 font-medium`}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Link href={`/transactions/${tx.id}/details`}>
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                  <Eye className="h-4 w-4" />
                                  View transaction details
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                                <Flag className="h-4 w-4 text-red-600" />
                                Flag
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                <label className="text-sm font-semibold text-gray-700">Service Types</label>
                <Select >
                  <SelectTrigger className="h-12 border-gray-300 w-full">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="name-reservation">Name Reservation</SelectItem>
                    <SelectItem value="company-reg">Company Registration</SelectItem>
                    <SelectItem value="company-reg">Change of Name</SelectItem>
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
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
