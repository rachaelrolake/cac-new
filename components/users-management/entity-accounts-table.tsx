"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Download,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Lock,
  Trash2,
  RotateCcw,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  FilePlus,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { getStatusColor } from "../reusables/status-color"



const mockEntityAccounts = [
  {
    id: 29,
    name: "XYZ Laude Company",
    staffId: "EA-2019-01",
    email: "yy2@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Company",
    submissionType: "Self-Registration",
    createdAt: "Nov 15, 2025",
    lastLogin: "2 hrs ago",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 30,
    name: "XYZ Laude Company",
    staffId: "EA-2019-02",
    email: "sum@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Incorporated Trustees",
    createdAt: "Nov 14, 2025",
    submissionType: "Self-Registration",
    lastLogin: "1 min ago",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 31,
    name: "XYZ Laude Company",
    staffId: "EA-2019-03",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Incorporated Trustees",
    submissionType: "Self-Registration",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 hr ago",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 32,
    name: "XYZ Laude Company",
    staffId: "EA-2019-04",
    email: "john-john@gmail.com",
    submissionType: "Admin-Assissted",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Business Name",
    createdAt: "Nov 15, 2025",
    lastLogin: "Nov 10, 2025",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 33,
    name: "XYZ Laude Company",
    staffId: "EA-2019-05",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    submissionType: "Admin-Assissted",
    type: "Company",
    createdAt: "Nov 14, 2025",
    lastLogin: "-/-",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 34,
    name: "XYZ Laude Company",
    staffId: "EA-2019-06",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    submissionType: "Admin-Assissted",
    type: "Limited Company",
    createdAt: "Nov 08, 2025",
    lastLogin: "Nov 08, 2025",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 35,
    name: "XYZ Laude Company",
    staffId: "EA-2019-07",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    submissionType: "Admin-Assissted",
    type: "Limited Company",
    createdAt: "Nov 14, 2025",
    lastLogin: "10 mins ago",
    status: "Active",
    avatar: "XL",
  },
]

const mockRequestEntityAccounts = [
  {
    id: 3,
    name: "XYZ Laude Company",
    staffId: "EA-2019-01",
    email: "yy2@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    submissionType: "Self-Registration",
    type: "Company",
    createdAt: "Nov 15, 2025",
    lastLogin: "2 hrs ago",
    status: "Pending",
    avatar: "XL",
  },
  {
    id: 4,
    name: "XYZ Laude Company",
    staffId: "EA-2019-02",
    email: "sum@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    submissionType: "Self-Registration",
    type: "Incorporated Trustees",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 min ago",
    status: "Pending",
    avatar: "XL",
  },
  {
    id: 5,
    name: "XYZ Laude Company",
    staffId: "EA-2019-03",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Incorporated Trustees",
    submissionType: "Self-Registration",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 hr ago",
    status: "Rejected",
    avatar: "XL",
  },
  {
    id: 6,
    name: "XYZ Laude Company",
    staffId: "EA-2019-04",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Business Name",
    submissionType: "Admin-Assisted",
    createdAt: "Nov 15, 2025",
    lastLogin: "Nov 10, 2025",
    status: "Rejected",
    avatar: "XL",
  },
  {
    id: 7,
    name: "XYZ Laude Company",
    staffId: "EA-2019-05",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Company",
    submissionType: "Admin-Assisted",
    createdAt: "Nov 14, 2025",
    lastLogin: "-/-",
    status: "Queried",
    avatar: "XL",
  },
  {
    id: 8,
    name: "XYZ Laude Company",
    staffId: "EA-2019-06",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Limited Company",
    submissionType: "Admin-Assisted",
    createdAt: "Nov 08, 2025",
    lastLogin: "Nov 08, 2025",
    status: "Pending",
    avatar: "XL",
  },
  {
    id: 9,
    name: "XYZ Laude Company",
    staffId: "EA-2019-07",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    type: "Limited Company",
    submissionType: "Admin-Assisted",
    createdAt: "Nov 14, 2025",
    lastLogin: "10 mins ago",
    status: "Pending",
    avatar: "XL",
  },
]

export function EntityAccountComponent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const stats = {
    total: 900,
    active: 860,
    suspended: 80,
    pending: 78,
  }

  // Filtering & Pagination
  const filteredUsers = mockEntityAccounts.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(user.status)
    return matchesSearch && matchesFilter
  })

  // Mapping which table to show based on the tab

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const toggleFilter = (status: string) => {
    setActiveFilters((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
    setCurrentPage(1)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Accredited Agent":
        return "bg-purple-100 text-purple-700"
      case "Admin":
        return "bg-blue-100 text-blue-700"
      case "Support":
        return "bg-purple-100 text-purple-700"
      case "Insolvency Agent":
        return "bg-teal-100 text-teal-700"
      case "Entity Accounts":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Accounts" value={stats.total} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Active" value={stats.active} icon={<CheckCircle2 className="h-6 w-6" />} color="emerald" />
        <StatCard title="Suspended" value={stats.suspended} icon={<XCircle className="h-6 w-6" />} color="rose" />
        <StatCard title="New Entity Application" value={stats.pending} icon={<Users className="h-6 w-6" />} />
      </div>

      <Card className="bg-white">
        <Tabs defaultValue="approved-agents" className="w-full">
          <CardHeader className="border-b space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg">Entity Accounts ({filteredUsers.length})</CardTitle>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  // onClick={() => router.push(`/users-management/add`)}
                  className="gap-2 flex-1 sm:flex-none py-6"
                >
                  <FilePlus className="h-4 w-4" /> Add New Entity
                </Button>
                <ExportButton />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger
                  value="approved-agents"
                  className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  Entity Accounts</TabsTrigger>
                <TabsTrigger
                  value="accreditation-requests"
                  className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  Application</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-1/3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-9"
                />
              </div>
              <FilterDropdown activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
          </CardHeader>


          <CardContent className="p-4"> {/* P-0 because Table handles internal padding */}
            {/* Dynamically render the specific table */}
            <TabsContent value="approved-agents">
              <TheTable mockEntityAccounts={mockEntityAccounts} getStatusColor={getStatusColor} router={router} type="entity-approved" />
            </TabsContent>

            <TabsContent value="accreditation-requests">
              <TheTable mockEntityAccounts={mockRequestEntityAccounts} getStatusColor={getStatusColor} router={router} type="entity-requests" />
            </TabsContent>


            {paginatedUsers.length === 0 && (
              <div className="py-20 text-center text-gray-500">No records found.</div>
            )}
          </CardContent>


          {/* Pagination Logic */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
              </p>
              <PaginationControls current={currentPage} total={totalPages} setPage={setCurrentPage} />
            </div>
          )}
        </Tabs>

      </Card>
    </div>
  )
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "Accredited Agent":
      return "bg-purple-100 text-purple-700"
    case "Insolvency Agent":
      return "bg-purple-100 text-purple-700"
    case "Admin":
      return "bg-blue-100 text-blue-700"
    case "Support":
      return "bg-purple-100 text-purple-700"
    case "Insolvency Agent":
      return "bg-teal-100 text-teal-700"
    case "Entity Accounts":
      return "bg-orange-100 text-orange-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

function TheTable({ mockEntityAccounts, getStatusColor, router, type }: { mockEntityAccounts: any[], getStatusColor: any, router: any, type: string }) {
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-[50px]">S/N</TableHead>
          <TableHead>RC Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Application Date</TableHead>
          <TableHead>Submission Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockEntityAccounts.map((user, i) => (
          <TableRow key={user.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{user.staffId}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#F9F5FF] flex items-center justify-center text-[10px] text-white overflow-hidden">
                  <User className="text-[#7F56D9] w-4 h-4"  />
                </div>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
            </TableCell>
            <TableCell>{user.type}</TableCell>
            <TableCell>
              <div>
                <p>{user.name}</p>
                <small className="text-gray-500">{user.email}</small>
              </div>
            </TableCell>
            <TableCell>{user.lastLogin}</TableCell>
            <TableCell>{user.submissionType}</TableCell>
            <TableCell><Badge className={getStatusColor(user.status)}>{user.status}</Badge></TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push(`/users-management/${user.id}/details?userType=${type}`)} className="gap-2">
                    <Eye className="h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(`/users-management/${user.id}/password-reset`)} className="gap-2">
                    <Lock className="h-4 w-4" /> Reset Password
                  </DropdownMenuItem>
                  {user.status === "Active" ? (
                    <DropdownMenuItem className="gap-2 text-rose-600"><Shield className="h-4 w-4" /> Suspend</DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="gap-2 text-emerald-600"><RotateCcw className="h-4 w-4" /> Activate</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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

function FilterDropdown({ activeFilters, setActiveFilters }: any) {
  const toggle = (s: string) => {
    setActiveFilters((prev: string[]) => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2"><Filter className="h-3 w-3" /> Filters</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {["Active", "Suspended", "Pending"].map(status => (
          <div key={status} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer" onClick={() => toggle(status)}>
            <input type="checkbox" checked={activeFilters.includes(status)} readOnly />
            <span className="text-sm">{status}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PaginationControls({ current, total, setPage }: any) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}><ChevronLeft className="h-4 w-4" /></Button>
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => i + 1).map(p => (
          <Button key={p} size="sm" variant={p === current ? "default" : "outline"} onClick={() => setPage(p)} className={p === current ? "bg-emerald-600" : ""}>{p}</Button>
        ))}
      </div>
      <Button variant="outline" size="sm" disabled={current === total} onClick={() => setPage(current + 1)}><ChevronRight className="h-4 w-4" /></Button>
    </div>
  )
}