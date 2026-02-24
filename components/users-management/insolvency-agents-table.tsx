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
import { insolvencyAgentsAPI, type InsolvencyAgent } from "@/lib/api/users-management"
import { toast } from "sonner"
import { format } from "date-fns"

export function InsolvencyAgentComponent() {
  const router = useRouter()
  const [agents, setAgents] = useState<InsolvencyAgent[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, suspended: 0, pending: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeTab, setActiveTab] = useState<"approved" | "requests">("approved")
  const itemsPerPage = 20

  useEffect(() => {
    fetchAgents()
    fetchStats()
  }, [currentPage, activeTab])

  const fetchAgents = async () => {
    setIsLoading(true)
    try {
      const statusFilter = activeTab === "approved" ? "approved" : "pending"
      
      const response = await insolvencyAgentsAPI.getInsolvencyAgents(
        currentPage, 
        itemsPerPage,
        statusFilter
      )
      setAgents(response.data)
      setTotalPages(response.totalPages)
    } catch (error: any) {
      toast.error("Failed to load agents", {
        description: error.response?.data?.message || "Please try again later"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await insolvencyAgentsAPI.getInsolvencyAgentsStats()
      setStats(statsData)
    } catch (error: any) {
      console.error("Failed to load stats:", error)
    }
  }

  // Filter agents - API already filters by status
  const tabFilteredAgents = agents
  
  const filteredAgents = tabFilteredAgents.filter((agent) => {
    const fullName = `${agent.user.firstName || ''} ${agent.user.lastName || ''}`.toLowerCase()
    const agentName = (agent.agentName || '').toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
      agent.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agentName.includes(searchQuery.toLowerCase())

    const matchesFilter = activeFilters.length === 0 ||
      (activeFilters.includes("Active") && agent.user.isActive) ||
      (activeFilters.includes("Approved") && agent.status === "approved") ||
      (activeFilters.includes("Suspended") && !agent.user.isActive) ||
      (activeFilters.includes("Pending") && agent.status === "pending") ||
      (activeFilters.includes("Declined") && agent.status === "declined")

    return matchesSearch && matchesFilter
  })

  const paginatedAgents = filteredAgents

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
        <StatCard title="Total Agents" value={stats.total} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Approved Agents" value={stats.active + stats.inactive} icon={<CheckCircle2 className="h-6 w-6" />} color="emerald" />
        <StatCard title="Accreditation Requests" value={stats.pending} icon={<XCircle className="h-6 w-6" />} color="rose" />
        <StatCard title="Suspended" value={stats.suspended} icon={<Users className="h-6 w-6" />} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => {setActiveTab(value as any); setCurrentPage(1);}} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="approved" className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Approved Agents ({stats.active + stats.inactive})
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Accreditation Requests ({stats.pending})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card className="bg-white">
            <CardHeader className="border-b space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg">
                  Insolvency Agents ({filteredAgents.length})
                </CardTitle>
                <div className="flex gap-3 w-full sm:w-auto">
                  <ExportButton />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search..."
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
                    <TableHead>Agent ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAgents.map((agent, index) => (
                    <TableRow key={agent.id}>
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{agent.agentId || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-teal-700 flex items-center justify-center text-xs text-white font-medium">
                            {agent.user.firstName?.[0] || agent.user.email[0].toUpperCase()}
                            {agent.user.lastName?.[0] || ''}
                          </div>
                          <span className="font-medium text-gray-900">
                            {agent.user.firstName && agent.user.lastName
                              ? `${agent.user.firstName} ${agent.user.lastName}`
                              : agent.agentName || agent.user.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{agent.user.email}</TableCell>
                      <TableCell className="text-gray-600">{agent.user.phoneNumber || "N/A"}</TableCell>
                      <TableCell className="text-gray-600">{formatDate(agent.createdAt)}</TableCell>
                      <TableCell>
                        <Badge className={agent.status === "approved" ? "bg-emerald-100 text-emerald-700" : agent.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}>
                          {agent.status === "approved" ? "Approved" : agent.status === "pending" ? "Pending" : "Declined"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => router.push(`/users-management/${agent.id}/details?userType=${agent.status === "approved" ? 'insolvency-approved' : 'insolvency-requests'}&tab=insolvency-agents`)}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/users-management/${agent.user.id}/password-reset?tab=insolvency-agents`)}
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

              {paginatedAgents.length === 0 && (
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
  const filterOptions = activeTab === "approved" 
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