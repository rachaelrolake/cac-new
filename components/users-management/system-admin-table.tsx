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

interface User {
  id: number
  name: string
  staffId: string
  email: string
  phone: string
  role: string
  createdAt: string
  lastLogin: string
  status: "Active" | "Suspended" | "Pending"
  avatar: string
}

const mockSystemAdmins: User[] = [
  {
    id: 1,
    name: "John Doe",
    staffId: "CAC-2019-01",
    email: "john@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Super Admin",
    createdAt: "Nov 28, 2025",
    lastLogin: "2 hrs ago",
    status: "Active",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Martha Last",
    staffId: "CAC-2019-01",
    email: "martha@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Admin",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 min ago",
    status: "Active",
    avatar: "ML",
  },
  {
    id: 3,
    name: "John Bolton",
    staffId: "CAC-2019-01",
    email: "bolton@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Support",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 hr ago",
    status: "Active",
    avatar: "JB",
  },
  {
    id: 4,
    name: "James Juan",
    staffId: "CAC-2019-01",
    email: "james@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Support",
    createdAt: "Nov 15, 2025",
    lastLogin: "Nov 10, 2025",
    status: "Suspended",
    avatar: "JJ",
  },
  {
    id: 5,
    name: "Ari Benson",
    staffId: "CAC-2019-01",
    email: "ari@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Support",
    createdAt: "Nov 20, 2025",
    lastLogin: "-/-",
    status: "Pending",
    avatar: "AB",
  }
]



export function SystemAdminComponent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const stats = {
    total: mockSystemAdmins.length,
    active: mockSystemAdmins.filter((u) => u.status === "Active").length,
    suspended: mockSystemAdmins.filter((u) => u.status === "Suspended").length,
    pending: mockSystemAdmins.filter((u) => u.status === "Pending").length,
  }

  // Filtering & Pagination
  const filteredUsers = mockSystemAdmins.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(user.status)
    return matchesSearch && matchesFilter
  })

  // Mapping which table to show based on the tab

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-emerald-100 text-emerald-700",
      Suspended: "bg-rose-100 text-rose-700",
      Pending: "bg-orange-100 text-orange-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

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
        <StatCard title="Total Users" value={stats.total} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Active" value={stats.active} icon={<CheckCircle2 className="h-6 w-6" />} color="emerald" />
        <StatCard title="Suspended" value={stats.suspended} icon={<XCircle className="h-6 w-6" />} color="rose" />
        <StatCard title="Inactive" value={stats.pending} icon={<Users className="h-6 w-6" />} />
      </div>

      <Card className="bg-white">
        <CardHeader className="border-b space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">System Admins ({filteredUsers.length})</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                onClick={() => router.push(`/users-management/add`)}
                className="gap-2 flex-1 sm:flex-none py-6"
              >
                <FilePlus className="h-4 w-4" /> Add New User
              </Button>
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
            <FilterDropdown activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
          </div>
        </CardHeader>

        <CardContent className="p-4"> {/* P-0 because Table handles internal padding */}
          {/* Dynamically render the specific table */}

          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px]">S/N</TableHead>
                <TableHead>Admin ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSystemAdmins.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.staffId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] text-white overflow-hidden">
                        <img src="/images/Avatar.png" alt="avatar" />
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.createdAt}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/users-management/${user.id}/details?userType=system-admin`)} className="gap-2">
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/users-management/${user.id}/edit?userType=system-admin`)} className="gap-2">
                          <Edit2 className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/users-management/${user.id}/password-reset`)} className="gap-2">
                          <Lock className="h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        {user.status === "Active" ? (
                          <DropdownMenuItem className="gap-2 text-rose-600"><Shield className="h-4 w-4" /> Suspend</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="gap-2 text-emerald-600"><RotateCcw className="h-4 w-4" /> Activate</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="gap-2 text-rose-600"><Trash2 className="h-4 w-4" /> De-activate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
      </Card>
    </div>
  )
}


function UserActions({ user, userType }: { user: User, userType: string }) {
  const router = useRouter()
  const detailPath = `/dashboard/users/${user.id}/details?type=${userType}`
  const editPath = `/dashboard/users/${user.id}/edit?type=${userType}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(detailPath)} className="gap-2">
          <Eye className="h-4 w-4" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(editPath)} className="gap-2">
          <Edit2 className="h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/dashboard/users/${user.id}/password-reset`)} className="gap-2">
          <Lock className="h-4 w-4" /> Reset Password
        </DropdownMenuItem>
        {user.status === "Active" ? (
          <DropdownMenuItem className="gap-2 text-rose-600"><Shield className="h-4 w-4" /> Suspend</DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="gap-2 text-emerald-600"><RotateCcw className="h-4 w-4" /> Activate</DropdownMenuItem>
        )}
        <DropdownMenuItem className="gap-2 text-rose-600"><Trash2 className="h-4 w-4" /> De-activate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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