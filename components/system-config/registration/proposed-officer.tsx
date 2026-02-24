"use client"

import { useEffect, useState } from "react"
import { MoreVertical, Download, Search, FilePlus, Loader2, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { officerTypesAPI, OfficerType } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function ProposedOfficerPage() {
  const [data, setData] = useState<OfficerType[]>([])
  const [filteredData, setFilteredData] = useState<OfficerType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<OfficerType | null>(null)
  const [deleteItem, setDeleteItem] = useState<OfficerType | null>(null)

  useEffect(() => { fetchData() }, [])
  useEffect(() => {
    setFilteredData(searchQuery.trim() ? data.filter(i => 
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.code.toLowerCase().includes(searchQuery.toLowerCase())
    ) : data)
  }, [searchQuery, data])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await officerTypesAPI.getAll()
      setData(result); setFilteredData(result)
    } catch { toast.error("Failed to load officer types") } finally { setIsLoading(false) }
  }

  const handleExport = () => {
    const csv = [["S/N", "Name", "Code", "Description", "Active", "Created At"],
      ...filteredData.map((i, idx) => [idx + 1, i.name, i.code, i.description || "", i.isActive ? "Yes" : "No", format(new Date(i.createdAt), "MMM dd, yyyy HH:mm")])
    ].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" }), url = URL.createObjectURL(blob), a = document.createElement("a")
    a.href = url; a.download = `officer-types-${Date.now()}.csv`; a.click()
  }

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div>

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Proposed Officer Types ({filteredData.length})</h2>
        <div className="flex gap-3">
          <AddEntityModal onSuccess={fetchData} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>
      <div className="relative w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search Officer Types" className="pl-10 bg-gray-50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>Officer Type</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? <TableRow><TableCell colSpan={7} className="text-center text-gray-400 py-8">No officer types found</TableCell></TableRow> :
            filteredData.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium text-gray-600">{row.name}</TableCell>
                <TableCell className="font-mono text-xs text-gray-500">{row.code}</TableCell>
                <TableCell className="text-gray-500 max-w-xs truncate">{row.description || "—"}</TableCell>
                <TableCell><Badge variant={row.isActive ? "default" : "secondary"} className="rounded-full">{row.isActive ? "Yes" : "No"}</Badge></TableCell>
                <TableCell className="text-gray-500">{format(new Date(row.createdAt), "MMM dd, yyyy HH:mm")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { setEditItem(row); setEditModalOpen(true) }}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setDeleteItem(row); setDeleteModalOpen(true) }} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <EditModal open={editModalOpen} onClose={() => setEditModalOpen(false)} item={editItem} onSuccess={fetchData} />
      <DeleteModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} item={deleteItem} onSuccess={fetchData} />
    </div>
  )
}

function AddEntityModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false), [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState(""), [code, setCode] = useState(""), [description, setDescription] = useState(""), [isActive, setIsActive] = useState(true)

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error("Enter a name"); return }
    if (!code.trim()) { toast.error("Enter a code"); return }
    setIsSubmitting(true)
    try {
      await officerTypesAPI.create({ name: name.trim(), code: code.trim().toUpperCase(), description: description.trim() || undefined, isActive })
      toast.success("Officer type added")
      setOpen(false); setName(""); setCode(""); setDescription(""); setIsActive(true); onSuccess()
    } catch (e: any) { toast.error("Failed", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="default" size="xl"><FilePlus className="h-4 w-4" /> Add New</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Add Proposed Officer Type</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div><label className="text-sm font-medium mb-2 block">Officer Type Name <span className="text-red-500">*</span></label><Input placeholder="Enter name (e.g., Director)" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Code <span className="text-red-500">*</span></label><Input placeholder="Enter code (e.g., DIRECTOR)" value={code} onChange={(e) => setCode(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Description</label><Textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isSubmitting} rows={3} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="isActiveOfficer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="isActiveOfficer" className="text-sm font-medium">Is Active</label></div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" className="border-green-800 text-green-800" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-green-800 hover:bg-green-900" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Officer Type"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditModal({ open, onClose, item, onSuccess }: { open: boolean; onClose: () => void; item: OfficerType | null; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (item) {
      setName(item.name)
      setCode(item.code)
      setDescription(item.description || "")
      setIsActive(item.isActive)
    }
  }, [item])

  const handleSubmit = async () => {
    if (!item) return
    if (!name.trim()) { toast.error("Enter a name"); return }
    if (!code.trim()) { toast.error("Enter a code"); return }
    setIsSubmitting(true)
    try {
      await officerTypesAPI.update(item.id, { name: name.trim(), code: code.trim().toUpperCase(), description: description.trim() || undefined, isActive })
      toast.success("Officer type updated")
      onClose(); onSuccess()
    } catch (e: any) { toast.error("Failed to update", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Edit Officer Type</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div><label className="text-sm font-medium mb-2 block">Officer Type Name <span className="text-red-500">*</span></label><Input placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Code <span className="text-red-500">*</span></label><Input placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Description</label><Textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isSubmitting} rows={3} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="editIsActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="editIsActive" className="text-sm font-medium">Is Active</label></div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Updating...</> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteModal({ open, onClose, item, onSuccess }: { open: boolean; onClose: () => void; item: OfficerType | null; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    if (!item) return
    setIsSubmitting(true)
    try {
      await officerTypesAPI.delete(item.id)
      toast.success("Officer type deleted")
      onClose(); onSuccess()
    } catch (e: any) { toast.error("Failed to delete", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Delete Officer Type</DialogTitle></DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">{item?.name}</span>? This action cannot be undone.</p>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Deleting...</> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}