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
  { sn: 1, nameOfSpecificBusiness: "Abattoir and meat selling services", name: "Abattoir and meat selling services", createdAt: "Nov 15, 2025", timestamp: "2hrs ago", createdBy: "Super Admin" },
  { sn: 2, nameOfSpecificBusiness: "Accomodation", name: "Accomodation", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Admin" },
  { sn: 3, nameOfSpecificBusiness: "Agricultural Engineering", name: "Agricultural Engineering", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 4, nameOfSpecificBusiness: "Limited Partnership (LP)", name: "Limited Partnership (LP)", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 5, nameOfSpecificBusiness: "Bulk SMS Services", name: "Bulk SMS Services", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 6, nameOfSpecificBusiness: "Arts, Crafts and designing", name: "Arts, Crafts and designing", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 7, nameOfSpecificBusiness: "Automobile Repairs / Mechanical Services", name: "Automobile Repairs / Mechanical Services", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 8, nameOfSpecificBusiness: "Information Technology Consultancy", name: "Information Technology Consultancy", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
]

export default function SpecificNatureOfBusinessPage() {
  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Specific Nature of Business (100)
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
                <TableHead>Nature of Business</TableHead>
                <TableHead>Name of specific Business</TableHead>
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
                  <TableCell className="font-medium text-gray-600">{row.nameOfSpecificBusiness}</TableCell>
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
            Nature of Business <span className="text-red-500">*</span>
          </label>
          <Input placeholder="Select name of business" />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Specific Name of Nature of Business <span className="text-red-500">*</span>
          </label>
          <Input placeholder="Enter specific nature of business" />
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