import { MoreVertical, Plus, Download, Search, FilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const data = [
  {
    sn: 1,
    name: "Name Reservation",
    desc: "N/A",
    feeAmount: "5,000",
    createdAt: "Nov 15, 2025",
    timestamp: "2hrs ago",
    createdBy: "Super Admin"
  },
  {
    sn: 2,
    name: "Name Reservation for  restricted words and Ltd/Gte",
    desc: "N/A",
    feeAmount: "5,000  where applicable",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Admin"
  },
  {
    sn: 3,
    name: "Incorporation of Company Limited by Guarantee. ",
    desc: "This includes CTC of first  incorporation documents without additional charge) ",
    feeAmount: "5,000",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Support"
  },
  {
    sn: 4,
    name: "Incorporation of private/public company limited by shares ",
    desc: "(this  includes CTC of first  incorporation documents  without additional charge).  Issued share capital of  N1million or less",
    feeAmount: "5,000",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Support"
  },
  {
    sn: 5,
    name: "Registration of charges ",
    desc: "(this  includes CTC of first  incorporation documents  without additional charge).  Issued share capital of  N1million or less",
    feeAmount: "25,000 or 0.35% of the amount secured by the charge whichever is higher.",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Support"
  },
]

export default function LLPFeesPage() {
  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Limited Liability Partnership Fees (5)
          </h2>
          <div className="flex gap-3">
            <AddEntityModal />
            <Button variant="outlineprimary" size="xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-72 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search Nature of Business" className="pl-10 bg-gray-50" />
        </div>

        {/* Table */}
        <div className="rounded-md">
          <Table className="table-fixed">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-xs w-[50px]">S/N</TableHead>
                <TableHead className="text-xs">Fee Name</TableHead>
                <TableHead className="text-xs">Fee Amount (₦)</TableHead>
                <TableHead className="text-xs">Created At</TableHead>
                <TableHead className="text-xs">Timestamp</TableHead>
                <TableHead className="text-xs">Created by ↓</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.sn}>
                  <TableCell>{row.sn}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.feeAmount}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full font-normal">
                      {row.createdBy}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export function AddEntityModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="xl">
          <FilePlus className="h-4 w-4" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Add Limted Liability Partnership Fee
          </DialogTitle>
        </DialogHeader>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Fee Name <span className="text-red-500">*</span>
          </label>
          <Input placeholder="Enter name of Fee" />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Fee Amount (₦)<span className="text-red-500">*</span>
          </label>
          <Input placeholder="Enter Fee Amount" />
        </div>

        <DialogFooter className="flex justify-end sm:justify-end gap-2">
          <Button variant="outline" className="w-32 border-green-800 text-green-800">
            Cancel
          </Button>
          <Button className="w-auto bg-green-800 hover:bg-green-900 px-6">
            Add Fee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}