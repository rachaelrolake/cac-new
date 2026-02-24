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
import { restrictedWordsAPI, RestrictedWord } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function RestrictedBannedWordsPage() {
  const [data, setData] = useState<RestrictedWord[]>([])
  const [filteredData, setFilteredData] = useState<RestrictedWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<RestrictedWord | null>(null)
  const [deleteItem, setDeleteItem] = useState<RestrictedWord | null>(null)

  useEffect(() => { fetchData() }, [])
  useEffect(() => {
    setFilteredData(searchQuery.trim() ? data.filter(i => 
      i.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.reason.toLowerCase().includes(searchQuery.toLowerCase())
    ) : data)
  }, [searchQuery, data])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await restrictedWordsAPI.getAll()
      setData(result); setFilteredData(result)
    } catch { toast.error("Failed to load restricted words") } finally { setIsLoading(false) }
  }

  const handleExport = () => {
    const csv = [["S/N", "Word", "Category", "Reason", "Active", "Created At"],
      ...filteredData.map((i, idx) => [idx + 1, i.word, i.category, i.reason, i.isActive ? "Yes" : "No", format(new Date(i.createdAt), "MMM dd, yyyy HH:mm")])
    ].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" }), url = URL.createObjectURL(blob), a = document.createElement("a")
    a.href = url; a.download = `restricted-words-${Date.now()}.csv`; a.click()
  }

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div>

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Restricted / Banned Words ({filteredData.length})</h2>
        <div className="flex gap-3">
          <AddEntityModal onSuccess={fetchData} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>
      <div className="relative w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search Restricted Words" className="pl-10 bg-gray-50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>Word</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? <TableRow><TableCell colSpan={7} className="text-center text-gray-400 py-8">No restricted words found</TableCell></TableRow> :
            filteredData.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium text-gray-600">{row.word}</TableCell>
                <TableCell><Badge variant="outline" className="rounded-full">{row.category}</Badge></TableCell>
                <TableCell className="text-gray-500 max-w-xs truncate">{row.reason}</TableCell>
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
  const [word, setWord] = useState(""), [category, setCategory] = useState(""), [reason, setReason] = useState(""), [isActive, setIsActive] = useState(true)

  const handleSubmit = async () => {
    if (!word.trim()) { toast.error("Enter a word"); return }
    if (!category.trim()) { toast.error("Enter a category"); return }
    if (!reason.trim()) { toast.error("Enter a reason"); return }
    setIsSubmitting(true)
    try {
      await restrictedWordsAPI.create({ word: word.trim(), category: category.trim(), reason: reason.trim(), isActive })
      toast.success("Restricted word added")
      setOpen(false); setWord(""); setCategory(""); setReason(""); setIsActive(true); onSuccess()
    } catch (e: any) { toast.error("Failed", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="default" size="xl"><FilePlus className="h-4 w-4" /> Add New</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Add Restricted Word</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div><label className="text-sm font-medium mb-2 block">Word <span className="text-red-500">*</span></label><Input placeholder="Enter restricted word (e.g., Federal)" value={word} onChange={(e) => setWord(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Category <span className="text-red-500">*</span></label><Input placeholder="Enter category (e.g., government)" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Reason for Restriction <span className="text-red-500">*</span></label><Textarea placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)} disabled={isSubmitting} rows={3} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="isActiveWord" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="isActiveWord" className="text-sm font-medium">Is Active</label></div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" className="border-green-800 text-green-800" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-green-800 hover:bg-green-900" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Restricted Word"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditModal({ open, onClose, item, onSuccess }: { open: boolean; onClose: () => void; item: RestrictedWord | null; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [word, setWord] = useState("")
  const [category, setCategory] = useState("")
  const [reason, setReason] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (item) {
      setWord(item.word)
      setCategory(item.category)
      setReason(item.reason)
      setIsActive(item.isActive)
    }
  }, [item])

  const handleSubmit = async () => {
    if (!item) return
    if (!word.trim()) { toast.error("Enter a word"); return }
    if (!category.trim()) { toast.error("Enter a category"); return }
    if (!reason.trim()) { toast.error("Enter a reason"); return }
    setIsSubmitting(true)
    try {
      await restrictedWordsAPI.update(item.id, { word: word.trim(), category: category.trim(), reason: reason.trim(), isActive })
      toast.success("Restricted word updated")
      onClose(); onSuccess()
    } catch (e: any) { toast.error("Failed to update", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Edit Restricted Word</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div><label className="text-sm font-medium mb-2 block">Word <span className="text-red-500">*</span></label><Input placeholder="Enter word" value={word} onChange={(e) => setWord(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Category <span className="text-red-500">*</span></label><Input placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isSubmitting} /></div>
          <div><label className="text-sm font-medium mb-2 block">Reason <span className="text-red-500">*</span></label><Textarea placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)} disabled={isSubmitting} rows={3} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="editIsActiveWord" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={isSubmitting} className="w-4 h-4" /><label htmlFor="editIsActiveWord" className="text-sm font-medium">Is Active</label></div>
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

function DeleteModal({ open, onClose, item, onSuccess }: { open: boolean; onClose: () => void; item: RestrictedWord | null; onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    if (!item) return
    setIsSubmitting(true)
    try {
      await restrictedWordsAPI.delete(item.id)
      toast.success("Restricted word deleted")
      onClose(); onSuccess()
    } catch (e: any) { toast.error("Failed to delete", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Delete Restricted Word</DialogTitle></DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">{item?.word}</span>? This action cannot be undone.</p>
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