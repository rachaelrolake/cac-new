"use client"

import { useEffect, useState } from "react"
import { MoreVertical, Download, Search, FilePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { naturesOfBusinessAPI, NatureOfBusiness } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function NatureOfBusinessPage() {
  const [data, setData] = useState<NatureOfBusiness[]>([])
  const [filteredData, setFilteredData] = useState<NatureOfBusiness[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredData(data.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    } else {
      setFilteredData(data)
    }
  }, [searchQuery, data])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await naturesOfBusinessAPI.getAll()
      setData(result)
      setFilteredData(result)
    } catch (error: any) {
      toast.error("Failed to load natures of business")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ["S/N", "Business Category", "Created At"],
      ...filteredData.map((item, i) => [i + 1, item.name, format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")])
    ].map(row => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nature-of-business-${Date.now()}.csv`
    a.click()
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div>
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Nature of Business ({filteredData.length})</h2>
        <div className="flex gap-3">
          <AddEntityModal onSuccess={fetchData} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>
      <div className="relative w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search Nature of Business" className="pl-10 bg-gray-50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-16">S/N</TableHead>
            <TableHead>Business Category</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">No natures of business found</TableCell></TableRow>
          ) : (
            filteredData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium text-gray-600">{row.name}</TableCell>
                <TableCell className="text-gray-500">{format(new Date(row.createdAt), "MMM dd, yyyy HH:mm")}</TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function AddEntityModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error("Please enter a name"); return }
    setIsSubmitting(true)
    try {
      await naturesOfBusinessAPI.create({ name: name.trim() })
      toast.success("Nature of business added successfully")
      setOpen(false)
      setName("")
      onSuccess()
    } catch (error: any) {
      toast.error("Failed to add", { description: error.response?.data?.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="default" size="xl"><FilePlus className="h-4 w-4" /> Add New</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Add Nature of Business</DialogTitle></DialogHeader>
        <div className="py-4">
          <label className="text-sm font-medium mb-2 block">Name of Nature of Business <span className="text-red-500">*</span></label>
          <Input placeholder="Enter nature of business" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" className="border-green-800 text-green-800" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-green-800 hover:bg-green-900" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Nature of Business"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}