"use client"

import { useState, useEffect } from "react"
import { MoreVertical, Download, Search, FilePlus, Edit, Trash2, Loader2 } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { serviceFeesAPI, type ServiceFee } from "@/lib/api/service-fees"
import { toast } from "sonner"
import { format } from "date-fns"

export default function CompaniesFeesPage() {
  const [fees, setFees] = useState<ServiceFee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchFees()
  }, [])

  const fetchFees = async () => {
    setIsLoading(true)
    try {
      const data = await serviceFeesAPI.getServiceFees()
      // Filter for company entity type
      const companyFees = data.filter(fee => fee.entityType === "company")
      setFees(companyFees)
    } catch (error: any) {
      toast.error("Failed to load fees", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fee?")) return
    
    try {
      await serviceFeesAPI.deleteServiceFee(id)
      toast.success("Fee deleted successfully")
      fetchFees()
    } catch (error: any) {
      toast.error("Failed to delete fee", {
        description: error.response?.data?.message || "Please try again"
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return dateString
    }
  }

  const formatCurrency = (amount: string | null) => {
    if (!amount) return "N/A"
    return `₦${parseFloat(amount).toLocaleString()}`
  }

  const filteredFees = fees.filter(fee => 
    fee.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Companies Fees ({fees.length})
          </h2>
          <div className="flex gap-3">
            <AddEntityModal onSuccess={fetchFees} />
            <Button variant="outlineprimary" size="xl">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-72 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search fees" 
            className="pl-10 bg-gray-50" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
          </div>
        ) : (
          <div className="rounded-md overflow-x-auto">
            <Table className="table-fixed">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-xs w-[50px]">S/N</TableHead>
                  <TableHead className="text-xs">Fee Name</TableHead>
                  <TableHead className="text-xs">Description</TableHead>
                  <TableHead className="text-xs">Ltd/Gte Fee (₦)</TableHead>
                  <TableHead className="text-xs">Small Company Fee (₦)</TableHead>
                  <TableHead className="text-xs">Private other<br /> than small Fee (₦)</TableHead>
                  <TableHead className="text-xs">Public Fee</TableHead>
                  <TableHead className="text-xs">Created At</TableHead>
                  <TableHead className="text-xs">Created by ↓</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-12 text-gray-500">
                      No fees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFees.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description || "N/A"}</TableCell>
                      <TableCell>{formatCurrency(row.ltdGteFee)}</TableCell>
                      <TableCell>{formatCurrency(row.smallCompanyFee)}</TableCell>
                      <TableCell>{formatCurrency(row.privateOtherThanSmallFee)}</TableCell>
                      <TableCell>{formatCurrency(row.publicFee)}</TableCell>
                      <TableCell>{formatDate(row.createdAt)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-full font-normal">
                          System Admin
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <EditEntityModal fee={row} onSuccess={fetchFees} />
                            <DropdownMenuItem 
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleDelete(row.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  )
}

function AddEntityModal({ onSuccess }: { onSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ltdGteFee: "",
    smallCompanyFee: "",
    privateOtherThanSmallFee: "",
    publicFee: "",
  })

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      await serviceFeesAPI.createServiceFee({
        name: formData.name,
        code: formData.name.toUpperCase().replace(/\s+/g, '_'),
        description: formData.description,
        amount: 0,
        currency: "NGN",
        entityType: "company",
        feeType: "registration",
        isActive: true,
        ltdGteFee: parseFloat(formData.ltdGteFee) || 0,
        smallCompanyFee: parseFloat(formData.smallCompanyFee) || 0,
        privateOtherThanSmallFee: parseFloat(formData.privateOtherThanSmallFee) || 0,
        publicFee: parseFloat(formData.publicFee) || 0,
      })
      toast.success("Fee added successfully")
      setIsOpen(false)
      setFormData({
        name: "",
        description: "",
        ltdGteFee: "",
        smallCompanyFee: "",
        privateOtherThanSmallFee: "",
        publicFee: "",
      })
      onSuccess()
    } catch (error: any) {
      toast.error("Failed to add fee", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="xl">
          <FilePlus className="h-4 w-4" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Add Companies Fee
          </DialogTitle>
        </DialogHeader>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Fee Name <span className="text-red-500">*</span>
          </label>
          <Input 
            placeholder="Enter name of Fee" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Description
          </label>
          <Textarea 
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Ltd/Gte Fee (₦)
            </label>
            <Input 
              placeholder="Enter Ltd/Gte Fee" 
              type="number"
              value={formData.ltdGteFee}
              onChange={(e) => setFormData({ ...formData, ltdGteFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Small Company Fee (₦)
            </label>
            <Input 
              placeholder="Enter Small Company Fee" 
              type="number"
              value={formData.smallCompanyFee}
              onChange={(e) => setFormData({ ...formData, smallCompanyFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Private other than small Fee (₦)
            </label>
            <Input 
              placeholder="Enter Private other than small Fee" 
              type="number"
              value={formData.privateOtherThanSmallFee}
              onChange={(e) => setFormData({ ...formData, privateOtherThanSmallFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Public Fee (₦)
            </label>
            <Input 
              placeholder="Enter Public Fee" 
              type="number"
              value={formData.publicFee}
              onChange={(e) => setFormData({ ...formData, publicFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end sm:justify-end gap-2">
          <Button 
            variant="outline" 
            className="w-32 border-green-800 text-green-800"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            className="w-auto bg-green-800 hover:bg-green-900 px-6"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Fee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditEntityModal({ fee, onSuccess }: { fee: ServiceFee; onSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: fee.name,
    description: fee.description || "",
    ltdGteFee: fee.ltdGteFee || "",
    smallCompanyFee: fee.smallCompanyFee || "",
    privateOtherThanSmallFee: fee.privateOtherThanSmallFee || "",
    publicFee: fee.publicFee || "",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await serviceFeesAPI.updateServiceFee(fee.id, {
        name: formData.name,
        description: formData.description,
        ltdGteFee: parseFloat(formData.ltdGteFee as string) || 0,
        smallCompanyFee: parseFloat(formData.smallCompanyFee as string) || 0,
        privateOtherThanSmallFee: parseFloat(formData.privateOtherThanSmallFee as string) || 0,
        publicFee: parseFloat(formData.publicFee as string) || 0,
      })
      toast.success("Fee updated successfully")
      setIsOpen(false)
      onSuccess()
    } catch (error: any) {
      toast.error("Failed to update fee", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setIsOpen(true) }} className="cursor-pointer">
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </DropdownMenuItem>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Edit Companies Fee
          </DialogTitle>
        </DialogHeader>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Fee Name <span className="text-red-500">*</span>
          </label>
          <Input 
            placeholder="Enter name of Fee" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium mb-2 block">
            Description
          </label>
          <Textarea 
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Ltd/Gte Fee (₦)
            </label>
            <Input 
              placeholder="Enter Ltd/Gte Fee" 
              type="number"
              value={formData.ltdGteFee}
              onChange={(e) => setFormData({ ...formData, ltdGteFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Small Company Fee (₦)
            </label>
            <Input 
              placeholder="Enter Small Company Fee" 
              type="number"
              value={formData.smallCompanyFee}
              onChange={(e) => setFormData({ ...formData, smallCompanyFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Private other than small Fee (₦)
            </label>
            <Input 
              placeholder="Enter Private other than small Fee" 
              type="number"
              value={formData.privateOtherThanSmallFee}
              onChange={(e) => setFormData({ ...formData, privateOtherThanSmallFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-2 block">
              Public Fee (₦)
            </label>
            <Input 
              placeholder="Enter Public Fee" 
              type="number"
              value={formData.publicFee}
              onChange={(e) => setFormData({ ...formData, publicFee: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end sm:justify-end gap-2">
          <Button 
            variant="outline" 
            className="w-32 border-green-800 text-green-800"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            className="w-auto bg-green-800 hover:bg-green-900 px-6"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Updating...</> : "Update Fee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}