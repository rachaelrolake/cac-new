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
import { MetricCard } from "./metric-card"
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye, X, Calendar, MoreVertical } from "lucide-react"

interface TransactionListProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const mockTransactions = [
  { id: 1, sn: 1, txId: "TXN-7654321", orgName: "GLOBAL VENTURES", service: "Change of Name", paidBy: "John Doe", amount: "N50,000", method: "Remitta", date: "Nov 15, 2025 09:49AM", status: "Completed" },
  { id: 2, sn: 2, txId: "TXN-7654321", orgName: "JOHNSON & SONS", service: "Business Name Reg", paidBy: "John Doe", amount: "N50,000", method: "Remitta", date: "Nov 14, 2025 09:50AM", status: "Pending" },
  { id: 3, sn: 3, txId: "TXN-7654321", orgName: "SUNRISE VENTURES LIMITED", service: "Company Name Reg", paidBy: "John Doe", amount: "N50,000", method: "Remitta", date: "Nov 14, 2025 12:09PM", status: "Failed" },
  { id: 4, sn: 4, txId: "TXN-7654321", orgName: "NATIONAL BANK OF COMMERCE LIMITED", service: "Name Req Consent", paidBy: "John Doe", amount: "N50,000", method: "Remitta", date: "Nov 10, 2025 01:34PM", status: "Completed" },
]

export function TransactionList({ activeCategory, setActiveCategory }: TransactionListProps) {
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
        <MetricCard title="Total Revenue" value="N700,790,00" icon="users" iconColor="blue" percentage="+12.5%" subtitle="2 New transactions this week" />
        <MetricCard title="Completed Transactions" value="120" icon="checkmark" iconColor="green" percentage="-12.5%" subtitle="1 New Last week" />
        <MetricCard title="Failed Transactions" value="45" icon="cross" iconColor="red" percentage="+12.5%" subtitle="10 failed this week" />
        <MetricCard title="Pending Transactions" value="5" icon="clock" iconColor="orange" percentage="+12.5%" subtitle="1 undergoing (< 24hrs)" />

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
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-gray-50/50 border-b">
                  <TableCell>{tx.sn}</TableCell>
                  <TableCell className="text-gray-600">{tx.txId}</TableCell>
                  <TableCell className="font-medium text-gray-700">{tx.orgName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 font-normal px-3 py-1">
                      {tx.service}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tx.amount}</TableCell>
                  <TableCell className="text-gray-500 text-xs">{tx.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusBadge(tx.status)} px-3 py-1 font-medium`}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
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
