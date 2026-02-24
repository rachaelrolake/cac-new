"use client"

import { useEffect, useState } from "react"
import { MoreVertical, Download, Search, FilePlus, Loader2, Edit, Trash2, Pin, PinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { noticesAPI, Notice } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function NoticesPage() {
  const [data, setData] = useState<Notice[]>([])
  const [filteredData, setFilteredData] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Notice | null>(null)
  const [deleteItem, setDeleteItem] = useState<Notice | null>(null)

  useEffect(() => { fetchData() }, [])
  useEffect(() => {
    setFilteredData(searchQuery.trim() ? data.filter(i => 
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) : data)
  }, [searchQuery, data])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await noticesAPI.getAll()
      setData(result); setFilteredData(result)
    } catch { toast.error("Failed to load notices") } finally { setIsLoading(false) }
  }

  const togglePin = async (notice: Notice) => {
    try {
      await noticesAPI.update(notice.id, { isPinned: !notice.isPinned })
      toast.success(notice.isPinned ? "Notice unpinned" : "Notice pinned")
      fetchData()
    } catch (e: any) { toast.error("Failed to update", { description: e.response?.data?.message }) }
  }

  const handleExport = () => {
    const csv = [["S/N", "Title", "Type", "Target Audience", "Pinned", "Active", "Created At"],
      ...filteredData.map((i, idx) => [idx + 1, i.title, i.type, i.targetAudience || "All", i.isPinned ? "Yes" : "No", i.isActive ? "Yes" : "No", format(new Date(i.createdAt), "MMM dd, yyyy HH:mm")])
    ].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" }), url = URL.createObjectURL(blob), a = document.createElement("a")
    a.href = url; a.download = `notices-${Date.now()}.csv`; a.click()
  }

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div>

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Notice Configuration ({filteredData.length})</h2>
        <div className="flex gap-3">
          <AddNoticeModal onSuccess={fetchData} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>
      <div className="relative w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search Notices" className="pl-10 bg-gray-50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Target Audience</TableHead>
            <TableHead>Pinned</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? <TableRow><TableCell colSpan={8} className="text-center text-gray-400 py-8">No notices found</TableCell></TableRow> :
            filteredData.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium text-gray-600">{row.title}</TableCell>
                <TableCell><Badge variant={row.type === "error" ? "destructive" : row.type === "warning" ? "outline" : "default"} className="rounded-full capitalize">{row.type}</Badge></TableCell>
                <TableCell className="text-gray-500">{row.targetAudience || "All Users"}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => togglePin(row)}>
                    {row.isPinned ? <Pin className="h-4 w-4 text-emerald-600 fill-emerald-600" /> : <PinOff className="h-4 w-4 text-gray-400" />}
                  </Button>
                </TableCell>
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

function AddNoticeModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false), [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState(""), [content, setContent] = useState(""), [type, setType] = useState<"info" | "warning" | "success" | "error">("info")
  const [targetAudience, setTargetAudience] = useState(""), [isActive, setIsActive] = useState(true), [isPinned, setIsPinned] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) { toast.error("Enter a title"); return }
    if (!content.trim()) { toast.error("Enter content"); return }
    setIsSubmitting(true)
    try {
      await noticesAPI.create({ title: title.trim(), content: content.trim(), type, targetAudience: targetAudience.trim() || undefined, isActive, isPinned })
      toast.success("Notice created")
      setOpen(false); setTitle(""); setContent(""); setType("info"); setTargetAudience(""); setIsActive(true); setIsPinned(false); onSuccess()
    } catch (e: any) { toast.error("Failed", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="default" size="xl"><FilePlus className="h-4 w-4" /> Add New</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[700px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Create Notice</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4 max-h-[500px] overflow-y-auto">
          <div><label className="text-sm font-medium mb-2 block">Title <span className="text-red-500">*</span></label><Input placeholder="Enter notice title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Content <span className="text-red-500">*</span></label><Textarea placeholder="Enter notice content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isSubmitting} rows={4} /></div>
          <div><label className="text-sm font-medium mb-2 block">Type <span className="text-red-500">*</span></label>
            <Select value={type} onValueChange={(v: "info" | "warning" | "success" | "error") => setType(v)} disabled={isSubmitting}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><label className="text-sm font-medium mb-2 block">Target Audience (Optional)</label><Input placeholder="e.g., Agents, Public Users (leave blank for all)" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} disabled={isSubmitting} /></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><input type="checkbox" id="addIsActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="addIsActive" className="text-sm font-medium">Is Active</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="addIsPinned" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="addIsPinned" className="text-sm font-medium">Pin Notice</label></div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" className="border-green-800 text-green-800" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-green-800 hover:bg-green-900" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Creating...</> : "Create Notice"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditModal({ open, onClose, item, onSuccess }: { open: boolean; onClose: () => void; item: Notice | null; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState(""), [content, setContent] = useState(""), [type, setType] = useState<"info" | "warning" | "success" | "error">("info")
  const [targetAudience, setTargetAudience] = useState(""), [isActive, setIsActive] = useState(true), [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    if (item) {
      setTitle(item.title); setContent(item.content); setType(item.type); setTargetAudience(item.targetAudience || ""); setIsActive(item.isActive); setIsPinned(item.isPinned)
    }
  }, [item])

  const handleSubmit = async () => {
    if (!item) return
    if (!title.trim()) { toast.error("Enter a title"); return }
    if (!content.trim()) { toast.error("Enter content"); return }
    setIsSubmitting(true)
    try {
      await noticesAPI.update(item.id, { title: title.trim(), content: content.trim(), type, targetAudience: targetAudience.trim() || undefined, isActive, isPinned })
      toast.success("Notice updated")
      onClose(); onSuccess()
    } catch (e: any) { toast.error("Failed to update", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Edit Notice</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4 max-h-[500px] overflow-y-auto">
          <div><label className="text-sm font-medium mb-2 block">Title <span className="text-red-500">*</span></label><Input placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Content <span className="text-red-500">*</span></label><Textarea placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} disabled={isSubmitting} rows={4} /></div>
          <div><label className="text-sm font-medium mb-2 block">Type <span className="text-red-500">*</span></label>
            <Select value={type} onValueChange={(v: "info" | "warning" | "success" | "error") => setType(v)} disabled={isSubmitting}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><label className="text-sm font-medium mb-2 block">Target Audience</label><Input placeholder="e.g., Agents (leave blank for all)" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} disabled={isSubmitting} /></div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><input type="checkbox" id="editIsActiveNotice" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="editIsActiveNotice" className="text-sm font-medium">Is Active</label></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="editIsPinned" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="editIsPinned" className="text-sm font-medium">Pin Notice</label></div>
          </div>
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

function DeleteModal({ open, onClose, item, onSuccess }: { open: boolean; onClose: () => void; item: Notice | null; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    if (!item) return
    setIsSubmitting(true)
    try {
      await noticesAPI.delete(item.id)
      toast.success("Notice deleted")
      onClose(); onSuccess()
    } catch (e: any) { toast.error("Failed to delete", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Delete Notice</DialogTitle></DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">{item?.title}</span>? This action cannot be undone.</p>
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