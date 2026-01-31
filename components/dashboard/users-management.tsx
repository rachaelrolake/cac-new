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

const mockPublicUsers: User[] = [
  {
    id: 8,
    name: "John Doe",
    staffId: "PUB-2019-01",
    email: "john@example.com",
    phone: "080-1234-5678",
    role: "Public User",
    createdAt: "Nov 28, 2025",
    lastLogin: "1 day ago",
    status: "Active",
    avatar: "JD",
  },
  {
    id: 9,
    name: "Jane Smith",
    staffId: "PUB-2019-02",
    email: "jane@example.com",
    phone: "080-1234-5679",
    role: "Public User",
    createdAt: "Nov 14, 2025",
    lastLogin: "3 days ago",
    status: "Active",
    avatar: "JS",
  },
  {
    id: 10,
    name: "Mike Johnson",
    staffId: "PUB-2019-03",
    email: "mike@example.com",
    phone: "080-1234-5680",
    role: "Public User",
    createdAt: "Nov 10, 2025",
    lastLogin: "5 days ago",
    status: "Active",
    avatar: "MJ",
  },
  {
    id: 11,
    name: "Sarah Williams",
    staffId: "PUB-2019-04",
    email: "sarah@example.com",
    phone: "080-1234-5681",
    role: "Public User",
    createdAt: "Nov 05, 2025",
    lastLogin: "1 week ago",
    status: "Suspended",
    avatar: "SW",
  },
  {
    id: 12,
    name: "David Brown",
    staffId: "PUB-2019-05",
    email: "david@example.com",
    phone: "080-1234-5682",
    role: "Public User",
    createdAt: "Oct 28, 2025",
    lastLogin: "2 weeks ago",
    status: "Pending",
    avatar: "DB",
  },
]

const mockAccreditedAgents: User[] = [
  {
    id: 15,
    name: "XYZ Laude Company",
    staffId: "AA-2019-01",
    email: "xyz@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 15, 2025",
    lastLogin: "2 hrs ago",
    status: "Active",
    avatar: "XL",
  },
  {
    id: 16,
    name: "Samela Group",
    staffId: "AA-2019-02",
    email: "sum@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 min ago",
    status: "Active",
    avatar: "SG",
  },
  {
    id: 17,
    name: "John James",
    staffId: "AA-2019-03",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 hr ago",
    status: "Active",
    avatar: "JJ",
  },
  {
    id: 18,
    name: "Peterson John",
    staffId: "AA-2019-04",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 15, 2025",
    lastLogin: "Nov 10, 2025",
    status: "Suspended",
    avatar: "PJ",
  },
  {
    id: 19,
    name: "Lylem Groups Co.",
    staffId: "AA-2019-05",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "-/-",
    status: "Pending",
    avatar: "LG",
  },
  {
    id: 20,
    name: "Jadenta Latwon",
    staffId: "AA-2019-06",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 08, 2025",
    lastLogin: "Nov 08, 2025",
    status: "Suspended",
    avatar: "JL",
  },
  {
    id: 21,
    name: "Habma Fatah",
    staffId: "AA-2019-07",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Accredited Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "10 mins ago",
    status: "Active",
    avatar: "HF",
  },
]

const mockInsolvencyAgents: User[] = [
  {
    id: 22,
    name: "Samson Yul",
    staffId: "IA-2019-01",
    email: "yy2@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 15, 2025",
    lastLogin: "2 hrs ago",
    status: "Active",
    avatar: "SY",
  },
  {
    id: 23,
    name: "Samson Yul",
    staffId: "IA-2019-02",
    email: "sum@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 min ago",
    status: "Active",
    avatar: "SY",
  },
  {
    id: 24,
    name: "Samson Yul",
    staffId: "IA-2019-03",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "1 hr ago",
    status: "Active",
    avatar: "SY",
  },
  {
    id: 25,
    name: "Samson Yul",
    staffId: "IA-2019-04",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 15, 2025",
    lastLogin: "Nov 10, 2025",
    status: "Suspended",
    avatar: "SY",
  },
  {
    id: 26,
    name: "Samson Yul",
    staffId: "IA-2019-05",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "-/-",
    status: "Pending",
    avatar: "SY",
  },
  {
    id: 27,
    name: "Samson Yul",
    staffId: "IA-2019-06",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 08, 2025",
    lastLogin: "Nov 08, 2025",
    status: "Suspended",
    avatar: "SY",
  },
  {
    id: 28,
    name: "Samson Yul",
    staffId: "IA-2019-07",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Insolvency Agent",
    createdAt: "Nov 14, 2025",
    lastLogin: "10 mins ago",
    status: "Active",
    avatar: "SY",
  },
]

const mockEntityAccounts: User[] = [
  {
    id: 29,
    name: "XYZ Laude Company",
    staffId: "EA-2019-01",
    email: "yy2@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
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
    createdAt: "Nov 14, 2025",
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
    phone: "080-1234-5678",
    role: "Entity Accounts",
    createdAt: "Nov 15, 2025",
    lastLogin: "Nov 10, 2025",
    status: "Suspended",
    avatar: "XL",
  },
  {
    id: 33,
    name: "XYZ Laude Company",
    staffId: "EA-2019-05",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    createdAt: "Nov 14, 2025",
    lastLogin: "-/-",
    status: "Pending",
    avatar: "XL",
  },
  {
    id: 34,
    name: "XYZ Laude Company",
    staffId: "EA-2019-06",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    createdAt: "Nov 08, 2025",
    lastLogin: "Nov 08, 2025",
    status: "Suspended",
    avatar: "XL",
  },
  {
    id: 35,
    name: "XYZ Laude Company",
    staffId: "EA-2019-07",
    email: "john-john@gmail.com",
    phone: "080-1234-5678",
    role: "Entity Accounts",
    createdAt: "Nov 14, 2025",
    lastLogin: "10 mins ago",
    status: "Active",
    avatar: "XL",
  },
]

const tabs = ["System Admins", "Public Users", "Accredited Agents", "Insolvency Agents", "Entity Accounts"]

const TAB_CONFIG: Record<string, { label: string; type: string; addButton: string }> = {
  "System Admins": { label: "System Admins", type: "system-admin", addButton: "Add New User" },
  "Public Users": { label: "Public Users", type: "public-user", addButton: "Add New User" },
  "Accredited Agents": { label: "Accredited Agents", type: "accredited-agent", addButton: "Add New Agent" },
  "Insolvency Agents": { label: "Insolvency Agents", type: "insolvency-agent", addButton: "Add New User" },
  "Entity Accounts": { label: "Entity Accounts", type: "entity-account", addButton: "Add New Entity" },
}

export function UsersManagement() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("System Admins")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  // Determine current dataset based on tab
  const currentMockData = useMemo(() => {
    switch (activeTab) {
      case "System Admins": return mockSystemAdmins
      case "Public Users": return mockPublicUsers
      case "Accredited Agents": return mockAccreditedAgents
      case "Insolvency Agents": return mockInsolvencyAgents
      case "Entity Accounts": return mockEntityAccounts
      default: return []
    }
  }, [activeTab])

  const config = TAB_CONFIG[activeTab]

  const stats = {
    total: currentMockData.length,
    active: currentMockData.filter((u) => u.status === "Active").length,
    suspended: currentMockData.filter((u) => u.status === "Suspended").length,
    pending: currentMockData.filter((u) => u.status === "Pending").length,
  }

  // Filtering & Pagination
  const filteredUsers = currentMockData.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(user.status)
    return matchesSearch && matchesFilter
  })

  // Mapping which table to show based on the tab
  const renderActiveTable = () => {
    const props = {
      data: paginatedUsers,
      actions: { getStatusColor, getRoleColor, renderMenu: (user: User) => <UserActions user={user} userType={config.type} /> }
    }

    switch (activeTab) {
      case "System Admins": return <SystemAdminTable {...props} />
      case "Accredited Agents": return <AccreditedAgentTable {...props} />
      case "Public Users":
        return <PublicUserTable {...props} /> // You can create a PublicUserTable similarly
      default: return <SystemAdminTable {...props} />
    }
  }

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
      {/* Tab Switcher */}
      <div className="flex gap-2 overflow-x-auto bg-gray-200 rounded-md p-2 w-fit">
        {Object.keys(TAB_CONFIG).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title={activeTab === "Entity Accounts" ? "Total Entities" : "Total Users"} value={stats.total} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Active" value={stats.active} icon={<CheckCircle2 className="h-6 w-6" />} color="emerald" />
        <StatCard title="Suspended" value={stats.suspended} icon={<XCircle className="h-6 w-6" />} color="rose" />
        <StatCard title="Inactive" value={stats.pending} icon={<Users className="h-6 w-6" />} />
      </div>

      <Card className="bg-white">
        <CardHeader className="border-b space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">{config.label} ({filteredUsers.length})</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                onClick={() => router.push(`/dashboard/users/add?type=${config.type}`)}
                className="gap-2 flex-1 sm:flex-none py-6"
              >
                <FilePlus className="h-4 w-4" /> {config.addButton}
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
          {renderActiveTable()}

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

const SystemAdminTable = ({ data, actions }: { data: User[], actions: any }) => (
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
      {data.map((user, index) => (
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
            <Badge className={actions.getRoleColor(user.role)}>{user.role}</Badge>
          </TableCell>
          <TableCell className="text-gray-600">{user.createdAt}</TableCell>
          <TableCell>
            <Badge className={actions.getStatusColor(user.status)}>{user.status}</Badge>
          </TableCell>
          <TableCell className="text-right">{actions.renderMenu(user)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const PublicUserTable = ({ data, actions }: { data: User[], actions: any }) => (
  <Table>
    <TableHeader className="bg-gray-50">
      <TableRow>
        <TableHead className="w-[50px]">S/N</TableHead>
        <TableHead>User ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email Address</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead>Last Login</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((user, index) => (
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
          <TableCell className="text-gray-600">{user.createdAt}</TableCell>
          <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
          <TableCell>
            <Badge className={actions.getStatusColor(user.status)}>{user.status}</Badge>
          </TableCell>
          <TableCell className="text-right">{actions.renderMenu(user)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const AccreditedAgentTable = ({ data, actions }: { data: User[], actions: any }) => (
  <Table>
    <TableHeader className="bg-gray-50">
      <TableRow>
        <TableHead className="w-[50px]">S/N</TableHead>
        <TableHead>Agent/Firm Name</TableHead>
        <TableHead>Accreditation ID</TableHead>
        <TableHead>Contact Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((user, i) => (
        <TableRow key={user.id}>
          <TableCell>{i + 1}</TableCell>
          <TableCell className="font-medium text-emerald-700">{user.name}</TableCell>
          <TableCell>{user.staffId}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell><Badge className={actions.getStatusColor(user.status)}>{user.status}</Badge></TableCell>
          <TableCell className="text-right">{actions.renderMenu(user)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color?: string }) {
  const colorClass = color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : color === 'rose' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-black';
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold mt-5">{value}</p>
          </div>
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClass}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
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