"use client"

import { useEffect, useState } from "react"
import { MoreVertical, Download, Search, FilePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { businessClassificationsAPI, BusinessClassification } from "@/lib/api/reference"
import { toast } from "sonner"
import { format } from "date-fns"

export default function EntityClassificationPage() {
  const [data, setData] = useState<BusinessClassification[]>([])
  const [filteredData, setFilteredData] = useState<BusinessClassification[]>([])
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
      const result = await businessClassificationsAPI.getAll()
      setData(result)
      setFilteredData(result)
    } catch (error: any) {
      toast.error("Failed to load classifications", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ["S/N", "Name", "Code", "Requires Consent", "Created At"],
      ...filteredData.map((item, i) => [
        i + 1,
        item.name,
        item.code || "",
        item.requiresConsent ? "Yes" : "No",
        format(new Date(item.createdAt), "MMM dd, yyyy HH:mm")
      ])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `entity-classifications-${Date.now()}.csv`
    a.click()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Entity Classification (Business Classification) ({filteredData.length})
        </h2>
        <div className="flex gap-3">
          <AddEntityModal onSuccess={fetchData} />
          <Button variant="outlineprimary" size="xl" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="relative w-72 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search Entity Classification" 
          className="pl-10 bg-gray-50" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-16">S/N</TableHead>
              <TableHead>Name of Entity Classification</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Requires Consent</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No entity classifications found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium text-gray-600">{row.name}</TableCell>
                  <TableCell className="text-gray-500">{row.code || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={row.requiresConsent ? "default" : "secondary"} className="rounded-full">
                      {row.requiresConsent ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {format(new Date(row.createdAt), "MMM dd, yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function AddEntityModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [requiresConsent, setRequiresConsent] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name")
      return
    }

    setIsSubmitting(true)
    try {
      await businessClassificationsAPI.create({
        name: name.trim(),
        code: code.trim() || undefined,
        requiresConsent
      })
      toast.success("Entity classification added successfully")
      setOpen(false)
      setName("")
      setCode("")
      setRequiresConsent(false)
      onSuccess()
    } catch (error: any) {
      toast.error("Failed to add classification", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="xl">
          <FilePlus className="h-4 w-4" /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Add Entity Classification (Business Classification)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Name of Entity Classification <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="Enter entity classification" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Code (Optional)
            </label>
            <Input 
              placeholder="Enter code (e.g., BN, IT)" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="requiresConsent" 
              checked={requiresConsent}
              onChange={(e) => setRequiresConsent(e.target.checked)}
              disabled={isSubmitting}
              className="w-4 h-4"
            />
            <label htmlFor="requiresConsent" className="text-sm font-medium">
              Requires Consent
            </label>
          </div>
        </div>
        <DialogFooter className="flex justify-end sm:justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-32 border-green-800 text-green-800" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button 
            className="w-auto bg-green-800 hover:bg-green-900 px-6" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Adding...</> : "Add Entity Classification"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}