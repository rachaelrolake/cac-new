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

const data = [
  { sn: 1, name: "Business Name ", entityType: "Sole Proprietor/Partnership", reason: "Group Holdings / Consortium", createdAt: "Nov 15, 2025", timestamp: "2hrs ago", createdBy: "Super Admin" },
  { sn: 2, name: "Business Name ", entityType: "Sole Proprietor/Partnership", reason: "Use of Restricted Word", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Admin" },
  { sn: 3, name: "Company ", entityType: "Public/Private Company Limited By Shares", reason: "Business Name Upgrade To Limited", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 4, name: "Limited Partnership (LP)", entityType: "Limited Partnership (LP)", reason: "Group Holdings / Consortium", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 5, name: "Bulk SMS Services", entityType: "Bulk SMS Services", reason: "Group Holdings / Consortium", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 6, name: "Arts, Crafts and designing", entityType: "Arts, Crafts and designing", reason: "Change Of Name Of Business / Company", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 7, name: "Automobile Repairs / Mechanical Services", entityType: "Automobile Repairs / Mechanical Services", reason: "Group Holdings / Consortium", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 8, name: "Information Technology Consultancy ", entityType: "Information Technology Consultancy ", reason: "Group Holdings / Consortium ", createdAt: "Nov 14, 2025 ", timestamp: "1 min ago ", createdBy: "Support" }
]

export default function ReasonForConsentPage() {
  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Reason for Consent (9)
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
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-16">S/N</TableHead>
                <TableHead>Entity Classification</TableHead>
                <TableHead className="w-[200px]">Entity Types</TableHead>
                <TableHead>Reasons for Consent Request</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Created by ↓</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.sn}>
                  <TableCell>{row.sn}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.name}</TableCell>
                  <TableCell className="font-medium text-gray-600 w-[200px]">{row.entityType}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.reason}</TableCell>
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
            Add Specific Nature of Business
          </DialogTitle>
        </DialogHeader>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Entity Classification (Business Classification) <span className="text-red-500">*</span>
          </label>
          <Input placeholder="Select entity classification" />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Entity Type (Business Type) <span className="text-red-500">*</span>
          </label>
          <Input placeholder="Select entity type" />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Name of Reason for Consent <span className="text-red-500">*</span>
          </label>
          <Input placeholder="Enter reason for consent" />
        </div>

        <DialogFooter className="flex justify-end sm:justify-end gap-2">
          <Button variant="outline" className="w-32 border-green-800 text-green-800">
            Cancel
          </Button>
          <Button className="w-auto bg-green-800 hover:bg-green-900 px-6">
            Add Specific Nature of Business
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}