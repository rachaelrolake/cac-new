"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Download,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lock,
  Users,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatCard } from "../reusables/stat-card"
import { entityAccountsAPI, type EntityAccount } from "@/lib/api/users-management"
import { toast } from "sonner"
import { format } from "date-fns"

export function EntityAccountComponent() {
  const router = useRouter()
  const [entities, setEntities] = useState<EntityAccount[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, suspended: 0, pending: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeTab, setActiveTab] = useState<"accounts" | "applications">("accounts")
  const itemsPerPage = 20

  useEffect(() => {
    fetchEntities()
    fetchStats()
  }, [currentPage, activeTab])

  const fetchEntities = async () => {
    setIsLoading(true)
    try {
      const statusFilter = activeTab === "accounts" ? "active" : "pending"

      const response = await entityAccountsAPI.getEntityAccounts(
        currentPage,
        itemsPerPage,
        statusFilter
      )
      setEntities(response.data)
      setTotalPages(response.totalPages)
    } catch (error: any) {
      toast.error("Failed to load entity accounts", {
        description: error.response?.data?.message || "Please try again later"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await entityAccountsAPI.getEntityAccountsStats()
      setStats(statsData)
    } catch (error: any) {
      console.error("Failed to load stats:", error)
    }
  }

  // Filter entities - API already filters by status
  const tabFilteredEntities = entities

  const filteredEntities = tabFilteredEntities.filter((entity) => {
    const fullName = `${entity.firstName || ''} ${entity.lastName || ''}`.toLowerCase()
    const orgName = (entity.organizationName || '').toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
      entity.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orgName.includes(searchQuery.toLowerCase())

    const matchesFilter = activeFilters.length === 0 ||
      (activeFilters.includes("Active") && entity.isActive) ||
      (activeFilters.includes("Approved") && entity.accountStatus === "active") ||
      (activeFilters.includes("Suspended") && !entity.isActive) ||
      (activeFilters.includes("Pending") && entity.accountStatus === "pending") ||
      (activeFilters.includes("Declined") && entity.accountStatus === "declined")

    return matchesSearch && matchesFilter
  })

  const paginatedEntities = filteredEntities

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "N/A"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Entities" value={stats.total} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Entity Accounts" value={stats.active + stats.inactive} icon={<CheckCircle2 className="h-6 w-6" />} color="emerald" />
        <StatCard title="Applications" value={stats.pending} icon={<XCircle className="h-6 w-6" />} color="rose" />
        <StatCard title="Suspended" value={stats.suspended} icon={<Users className="h-6 w-6" />} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value as any); setCurrentPage(1); }} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="accounts" className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Entity Accounts ({stats.active + stats.inactive})
          </TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Applications ({stats.pending})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card className="bg-white">
            <CardHeader className="border-b space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg">Entity Accounts ({filteredEntities.length})</CardTitle>
                <div className="flex gap-3 w-full sm:w-auto">
                  <ExportButton />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, email or organization..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="pl-9"
                  />
                </div>
                <FilterDropdown activeFilters={activeFilters} setActiveFilters={setActiveFilters} activeTab={activeTab} />
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[50px]">S/N</TableHead>
                    <TableHead>Entity ID</TableHead>
                    <TableHead>Organization Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEntities.map((entity, index) => (
                    <TableRow key={entity.id}>
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{entity.staffId || "N/A"}</TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {entity.organizationName || "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-orange-700 flex items-center justify-center text-xs text-white font-medium">
                            {entity.firstName?.[0] || entity.email[0].toUpperCase()}
                            {entity.lastName?.[0] || ''}
                          </div>
                          <span className="font-medium text-gray-900">
                            {entity.firstName && entity.lastName
                              ? `${entity.firstName} ${entity.lastName}`
                              : entity.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{entity.email}</TableCell>
                      <TableCell className="text-gray-600">{formatDate(entity.createdAt)}</TableCell>
                      <TableCell>
                        <Badge className={entity.accountStatus === "active" ? "bg-emerald-100 text-emerald-700" : entity.accountStatus === "pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}>
                          {entity.accountStatus === "active" ? "Active" : entity.accountStatus === "pending" ? "Pending" : "Declined"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => router.push(`/users-management/${entity.id}/details?userType=${entity.accountStatus === "active" ? 'entity-approved' : 'entity-requests'}`)}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/users-management/${entity.id}/password-reset`)}
                              className="gap-2"
                            >
                              <Lock className="h-4 w-4" /> Reset Password
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {paginatedEntities.length === 0 && (
                <div className="py-20 text-center text-gray-500">No records found.</div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExportButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 py-6"><Download className="h-4 w-4" /> Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Export as PDF</DropdownMenuItem>
        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem>Export as Excel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function FilterDropdown({ activeFilters, setActiveFilters, activeTab }: any) {
  const toggle = (s: string) => {
    setActiveFilters((prev: string[]) => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  // Determine filter options based on active tab
  const filterOptions = activeTab === "accounts"
    ? ["Active", "Approved", "Suspended", "Inactive"]
    : ["Pending", "Declined"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2"><Filter className="h-3 w-3" /> Filters</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {filterOptions.map(status => (
          <div key={status} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer" onClick={() => toggle(status)}>
            <input type="checkbox" checked={activeFilters.includes(status)} readOnly />
            <span className="text-sm">{status}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}