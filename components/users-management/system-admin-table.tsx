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
  Edit2,
  Lock,
  Trash2,
  RotateCcw,
  Users,
  CheckCircle2,
  XCircle,
  Shield,
  FilePlus,
  Loader2,
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
import { usersAPI, type User } from "@/lib/api/users-management"
import { toast } from "sonner"
import { format } from "date-fns"

export function SystemAdminComponent() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const itemsPerPage = 50

  // Fetch users from API
  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await usersAPI.getUsers(currentPage, itemsPerPage)
      // Filter only Admin role users
      const adminUsers = response.data.filter(user => user.roles.includes("Admin"))
      setUsers(adminUsers)
      setTotal(adminUsers.length)
      setTotalPages(Math.ceil(adminUsers.length / itemsPerPage))
    } catch (error: any) {
      toast.error("Failed to load users", {
        description: error.response?.data?.message || "Please try again later"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to deactivate ${userName}?`)) return

    try {
      await usersAPI.deleteUser(userId)
      toast.success("User deactivated successfully")
      fetchUsers() // Refresh list
    } catch (error: any) {
      toast.error("Failed to deactivate user", {
        description: error.response?.data?.message || "Please try again"
      })
    }
  }

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await usersAPI.updateUser(userId, { isActive: !currentStatus })
      toast.success(`User ${!currentStatus ? 'activated' : 'suspended'} successfully`)
      fetchUsers() // Refresh list
    } catch (error: any) {
      toast.error("Failed to update user status", {
        description: error.response?.data?.message || "Please try again"
      })
    }
  }

  // Calculate stats from users list
  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    suspended: users.filter((u) => !u.isActive).length,
    pending: 0, // Not available in current data structure
  }

  // Filtering
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = activeFilters.length === 0 || 
      (activeFilters.includes("Active") && user.isActive) ||
      (activeFilters.includes("Suspended") && !user.isActive)
    
    return matchesSearch && matchesFilter
  })

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
    ) : (
      <Badge className="bg-rose-100 text-rose-700">Suspended</Badge>
    )
  }

  const getRoleBadge = (roles: string[]) => {
    const role = roles[0] || "Unknown"
    return <Badge className="bg-blue-100 text-blue-700">{role}</Badge>
  }

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

        <CardContent className="p-4">
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
              {paginatedUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{user.staffId || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center text-xs text-white font-medium">
                        {user.firstName?.[0] || user.email[0].toUpperCase()}
                        {user.lastName?.[0] || ''}
                      </div>
                      <span className="font-medium text-gray-900">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.roles)}</TableCell>
                  <TableCell className="text-gray-600">{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => router.push(`/users-management/${user.id}/details?userType=system-admin`)} 
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => router.push(`/users-management/${user.id}/edit?userType=system-admin`)} 
                          className="gap-2"
                        >
                          <Edit2 className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => router.push(`/users-management/${user.id}/password-reset`)} 
                          className="gap-2"
                        >
                          <Lock className="h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleToggleStatus(user.id, user.isActive)} 
                          className={`gap-2 ${user.isActive ? 'text-rose-600' : 'text-emerald-600'}`}
                        >
                          {user.isActive ? (
                            <>
                              <Shield className="h-4 w-4" /> Suspend
                            </>
                          ) : (
                            <>
                              <RotateCcw className="h-4 w-4" /> Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(user.id, user.firstName || user.email)} 
                          className="gap-2 text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" /> De-activate
                        </DropdownMenuItem>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
            </p>
            <PaginationControls current={currentPage} total={totalPages} setPage={setCurrentPage} />
          </div>
        )}
      </Card>
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
        {["Active", "Suspended"].map(status => (
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
      <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex gap-1">
        {Array.from({ length: Math.min(5, total) }, (_, i) => {
          let pageNum
          if (total <= 5) {
            pageNum = i + 1
          } else if (current <= 3) {
            pageNum = i + 1
          } else if (current >= total - 2) {
            pageNum = total - 4 + i
          } else {
            pageNum = current - 2 + i
          }
          return (
            <Button 
              key={pageNum} 
              size="sm" 
              variant={pageNum === current ? "default" : "outline"} 
              onClick={() => setPage(pageNum)} 
              className={pageNum === current ? "bg-emerald-600" : ""}
            >
              {pageNum}
            </Button>
          )
        })}
      </div>
      <Button variant="outline" size="sm" disabled={current === total} onClick={() => setPage(current + 1)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}