"use client"

import { useEffect, useState } from "react"
import { MoreVertical, Download, Search, FilePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { specificNaturesOfBusinessAPI, naturesOfBusinessAPI, SpecificNatureOfBusiness, NatureOfBusiness } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function SpecificNatureOfBusinessPage() {
  const [data, setData] = useState<SpecificNatureOfBusiness[]>([])
  const [filteredData, setFilteredData] = useState<SpecificNatureOfBusiness[]>([])
  const [natures, setNatures] = useState<NatureOfBusiness[]>([])
  const [selectedNature, setSelectedNature] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNatures, setIsLoadingNatures] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { fetchNatures() }, [])
  useEffect(() => { if (selectedNature) fetchData(selectedNature) }, [selectedNature])
  useEffect(() => {
    setFilteredData(searchQuery.trim() ? data.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())) : data)
  }, [searchQuery, data])

  const fetchNatures = async () => {
    setIsLoading(true)
    setIsLoadingNatures(true)
    try {
      const result = await naturesOfBusinessAPI.getAll()
      setNatures(result)
      if (result.length > 0) setSelectedNature(result[0].id)
    } catch { toast.error("Failed to load natures") } finally { setIsLoadingNatures(false) }
  }

  const fetchData = async (natureId: string) => {
    setIsLoading(true)
    try {
      const result = await specificNaturesOfBusinessAPI.getByNature(natureId)
      setData(result)
      setFilteredData(result)
    } catch { toast.error("Failed to load specific natures") } finally { setIsLoading(false) }
  }

  const handleExport = () => {
    const csv = [["S/N", "Nature", "Specific Business", "Created At"],
    ...filteredData.map((i, idx) => [idx + 1, i.natureOfBusiness.name, i.name, format(new Date(i.createdAt), "MMM dd, yyyy HH:mm")])
    ].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" }), url = URL.createObjectURL(blob), a = document.createElement("a")
    a.href = url; a.download = `specific-natures-${Date.now()}.csv`; a.click()
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Specific Nature of Business ({filteredData.length})</h2>
        <div className="flex gap-3">
          <AddEntityModal natures={natures} onSuccess={() => selectedNature && fetchData(selectedNature)} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-72">
          <Select value={selectedNature} onValueChange={setSelectedNature} disabled={isLoadingNatures}>
            <SelectTrigger><SelectValue placeholder="Select nature to filter" /></SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {natures.map(n => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search" className="pl-10 bg-gray-50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      {isLoading ? <div className="flex items-center justify-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div> : (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow><TableHead className="w-16">S/N</TableHead><TableHead>Nature of Business</TableHead><TableHead>Name of Specific Business</TableHead><TableHead>Created At</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-gray-400 py-8">
              {data.length === 0 ? "Select a nature of business to filter and view specific natures" : "No specific natures found"}
            </TableCell></TableRow> :
              filteredData.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.natureOfBusiness.name}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.name}</TableCell>
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

function AddEntityModal({ natures, onSuccess }: { natures: NatureOfBusiness[]; onSuccess: () => void }) {
  const [open, setOpen] = useState(false), [isSubmitting, setIsSubmitting] = useState(false)
  const [natureId, setNatureId] = useState(""), [name, setName] = useState("")

  const handleSubmit = async () => {
    if (!natureId) { toast.error("Select a nature"); return }
    if (!name.trim()) { toast.error("Enter a name"); return }
    setIsSubmitting(true)
    try {
      await specificNaturesOfBusinessAPI.create({ name: name.trim(), natureOfBusinessId: natureId })
      toast.success("Specific nature added")
      setOpen(false); setName(""); setNatureId(""); onSuccess()
    } catch (e: any) { toast.error("Failed", { description: e.response?.data?.message }) } finally { setIsSubmitting(false) }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="default" size="xl"><FilePlus className="h-4 w-4" /> Add New</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader><DialogTitle className="text-lg font-bold">Add Specific Nature of Business</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Nature of Business <span className="text-red-500">*</span></label>
            <Select value={natureId} onValueChange={setNatureId} disabled={isSubmitting}>
              <SelectTrigger><SelectValue placeholder="Select nature" /></SelectTrigger>
              <SelectContent className="max-h-[300px]">{natures.map(n => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Specific Name <span className="text-red-500">*</span></label>
            <Input placeholder="Enter specific nature" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild><Button variant="outline" className="border-green-800 text-green-800" disabled={isSubmitting}>Cancel</Button></DialogClose>
          <Button className="bg-green-800 hover:bg-green-900" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Specific Nature"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}