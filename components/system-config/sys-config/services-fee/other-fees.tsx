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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data = [
  {
    sn: 1,
    name: "Registration of Accredited Agents/Professionals (one-off)",
    desc: "N/A",
    feeType: "Annual Registration of Agents",
    feeAmount: "250",
    otherFee: "5,000",
    createdAt: "Nov 15, 2025",
    timestamp: "2hrs ago",
    createdBy: "Super Admin"
  },
  {
    sn: 2,
    name: "Registration of Insolvency Practitioners (one-offf)",
    desc: "N/A",
    feeType: "Annual Registration of Agents",
    feeAmount: "50,000",
    otherFee: "10,000",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Admin"
  },
  {
    sn: 3,
    name: "SMS notification",
    desc: "Alert for every transaction carried out by an entity to all  officers of the Entity (Annual Subscription)",
    feeType: "Value Added Service",
    feeAmount: "2500",
    otherFee: "5,000",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Support"
  },
  {
    sn: 4,
    name: "Full electronic search per entity (view only)",
    desc: "(this  includes CTC of first  incorporation documents  without additional charge).  Issued share capital of  N1million or less",
    feeType: "Website Search",
    feeAmount: "1000",
    otherFee: "10,000",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Support"
  },
  {
    sn: 5,
    name: "Company Directory Exportable one-off",
    desc: "(name, address, registration number and date of registration, particulars of directors and other post incorporation information)",
    feeType: "DVD Directories",
    feeAmount: "1,000,000",
    otherFee: "12,000",
    createdAt: "Nov 14, 2025",
    timestamp: "1 min ago",
    createdBy: "Support"
  },
]

export default function OtherFees() {
  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Other Fees (12)
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
                <TableHead className="text-xs">Description</TableHead>
                <TableHead className="text-xs">Fee Amount (₦)</TableHead>
                <TableHead className="text-xs">Fee Type (Category)</TableHead>
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
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{row.feeAmount}</TableCell>
                  <TableCell>{row.feeType}</TableCell>
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
            Add Other Fees
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
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea placeholder="Enter Fee Description"></Textarea>
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Fee Type <span className="text-red-500">*</span>
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  ["Annual Registration of Agents/Professionals/Insolvency Practitioners",
                    "Value Added Service", "Website Search", "Appointments", "Bulk Products", "DVD Directories"].map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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