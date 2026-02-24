"use client"

import { useEffect, useState } from "react"
import { MoreVertical, Download, Search, FilePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { businessTypesAPI, businessClassificationsAPI, BusinessType, BusinessClassification } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function EntityTypePage() {
  const [data, setData] = useState<BusinessType[]>([])
  const [filteredData, setFilteredData] = useState<BusinessType[]>([])
  const [classifications, setClassifications] = useState<BusinessClassification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { fetchAll() }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredData(data.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessClassification.name.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    } else {
      setFilteredData(data)
    }
  }, [searchQuery, data])

  const fetchAll = async () => {
    setIsLoading(true)
    try {
      const classifs = await businessClassificationsAPI.getAll()
      setClassifications(classifs)

      const allTypes: BusinessType[] = []
      for (const c of classifs) {
        try {
          const types = await businessTypesAPI.getByClassification(c.id)
          allTypes.push(...types)
        } catch (error) {
          console.error(`Failed to fetch types for ${c.name}:`, error)
        }
      }

      setData(allTypes)
      setFilteredData(allTypes)
    } catch (error: any) {
      toast.error("Failed to load entity types")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ["S/N", "Classification", "Entity Type", "Requires Consent", "Created At"],
      ...filteredData.map((item, i) => [
        i + 1,
        item.businessClassification.name,
        item.name,
        item.requiresConsent ? "Yes" : "No",
        format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")
      ])
    ].map(row => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" }), url = URL.createObjectURL(blob), a = document.createElement("a")
    a.href = url; a.download = `entity-types-${Date.now()}.csv`; a.click()
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Entity Type (Business Type) ({filteredData.length})</h2>
        <div className="flex gap-3">
          <AddEntityModal classifications={classifications} onSuccess={fetchAll} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="relative w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search Entity Type" className="pl-10 bg-gray-50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {isLoading ? <div className="flex items-center justify-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div> : (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-16">S/N</TableHead>
              <TableHead>Entity Classification</TableHead>
              <TableHead>Entity Type</TableHead>
              <TableHead>Requires Consent</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-8">No entity types found</TableCell></TableRow> :
              filteredData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.businessClassification.name}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.name}</TableCell>
                  <TableCell><Badge variant={row.requiresConsent ? "default" : "secondary"} className="rounded-full">{row.requiresConsent ? "Yes" : "No"}</Badge></TableCell>
                  <TableCell className="text-gray-500">{format(new Date(row.createdAt), "MMM dd, yyyy HH:mm")}</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      )}
    </div>
  )
}

function AddEntityModal({ classifications, onSuccess }: { classifications: BusinessClassification[]; onSuccess: () => void }) {
  const [open, setOpen] = useState(false), [isSubmitting, setIsSubmitting] = useState(false)
  const [classificationId, setClassificationId] = useState(""), [name, setName] = useState(""), [requiresConsent, setRequiresConsent] = useState(false)

  const handleSubmit = async () => {
    if (!classificationId) { toast.error("Please select a classification"); return }
    if (!name.trim()) { toast.error("Please enter a name"); return }
    setIsSubmitting(true)
    try {
      await businessTypesAPI.create({ name: name.trim(), businessClassificationId: classificationId, requiresConsent })
      toast.success("Entity type added successfully")
      setOpen(false); setName(""); setClassificationId(""); setRequiresConsent(false); onSuccess()
    } catch (error: any) {
      toast.error("Failed to add entity type", { description: error.response?.data?.message || "Please try again" })
    } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="default" size="xl"><FilePlus className="h-4 w-4" /> Add New</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Add Entity Type (Business Type)</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Entity Classification <span className="text-red-500">*</span></label>
            <Select value={classificationId} onValueChange={setClassificationId} disabled={isSubmitting}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select entity classification" /></SelectTrigger>
              <SelectContent>{classifications.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Name of Entity Type <span className="text-red-500">*</span></label>
            <Input placeholder="Enter entity type" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="requiresConsentType" checked={requiresConsent} onChange={(e) => setRequiresConsent(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" />
            <label htmlFor="requiresConsentType" className="text-sm font-medium">Requires Consent</label>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" className="border-green-800 text-green-800" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-green-800 hover:bg-green-900" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Entity Type"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}