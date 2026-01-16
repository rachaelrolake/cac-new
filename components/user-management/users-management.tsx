"use client"

import { useState } from "react"
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
  XCircle,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"


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
  },
  {
    id: 6,
    name: "Luther Urreri",
    staffId: "CAC-2019-01",
    email: "luther@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Support",
    createdAt: "Nov 08, 2025",
    lastLogin: "Nov 04, 2025",
    status: "Suspended",
    avatar: "LU",
  },
  {
    id: 7,
    name: "Sandra Harris",
    staffId: "CAC-2019-01",
    email: "sandra@cac.gov.ng",
    phone: "080-1234-5678",
    role: "Support",
    createdAt: "Nov 14, 2025",
    lastLogin: "10 mins ago",
    status: "Active",
    avatar: "SH",
  },
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

const mockInadmissibleAgents: User[] = [
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

const tabs = ["System Admins", "Public Users", "Accredited Agents", "Inadmissible Agents", "Entity Accounts"]

export function UsersManagement() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("System Admins")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  let mockUsers: User[] = []
  let tabLabel = ""
  let addButtonLabel = ""
  let totalLabel = ""

  switch (activeTab) {
    case "System Admins":
      mockUsers = mockSystemAdmins
      tabLabel = "System Admins"
      addButtonLabel = "Add New User"
      totalLabel = "Total Users"
      break
    case "Public Users":
      mockUsers = mockPublicUsers
      tabLabel = "Public Users"
      addButtonLabel = "Add New User"
      totalLabel = "Total Users"
      break
    case "Accredited Agents":
      mockUsers = mockAccreditedAgents
      tabLabel = "Accredited Agents"
      addButtonLabel = "Add New Agent"
      totalLabel = "Total Users"
      break
    case "Inadmissible Agents":
      mockUsers = mockInadmissibleAgents
      tabLabel = "Inadmissible Agents"
      addButtonLabel = "Add New User"
      totalLabel = "Total Users"
      break
    case "Entity Accounts":
      mockUsers = mockEntityAccounts
      tabLabel = "Entity Accounts"
      addButtonLabel = "Add New Entity"
      totalLabel = "Total Entities"
      break
  }

  const statusCounts = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "Active").length,
    suspended: mockUsers.filter((u) => u.status === "Suspended").length,
    pending: mockUsers.filter((u) => u.status === "Pending").length,
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.staffId.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilters.length === 0) return matchesSearch

    return matchesSearch && activeFilters.includes(user.status)
  })

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const toggleFilter = (status: string) => {
    setActiveFilters((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700"
      case "Suspended":
        return "bg-rose-100 text-rose-700"
      case "Pending":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Accredited Agent":
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
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto bg-gray-200 rounded-md p-2 border-0 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab)
              setCurrentPage(1)
            }}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "bg-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{totalLabel}</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                <Users className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-emerald-600">{statusCounts.active}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100">
                <Image
                  src="/active.png"
                  alt="Active"
                  width={24}
                  height={24}
                />

              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-rose-600">{statusCounts.suspended}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rose-100">
                <XCircle className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{statusCounts.pending}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                <Image
                  src="/pending.png"
                  alt="Pending"
                  width={24}
                  height={24}
                />

              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg">
                {tabLabel} ({filteredUsers.length})
              </CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <Button
                  onClick={() => {
                    const typeParam =
                      activeTab === "Public Users"
                        ? "?type=public-user"
                        : activeTab === "Accredited Agents"
                          ? "?type=accredited-agent"
                          : ""
                    router.push(`/dashboard/users/add${typeParam}`)
                  }}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
                >
                  + {addButtonLabel}
                </Button>

                <div className="flex flex-col gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 bg-transparent w-full sm:w-auto">
                        <Download className="h-3 w-3" />
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-4 w-4" />
                        Export as PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-4 w-4" />
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-4 w-4" />
                        Export as Excel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 justify-between">
              <div className="relative w-1/3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-9 h-9 text-sm"
                />
              </div>

              <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1 bg-transparent h-8 px-2 text-xs w-full sm:w-auto">
                        <Filter className="h-3 w-3" />
                        <span className="hidden sm:inline">Filters</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <div className="p-2 space-y-2">
                        {["Active", "Suspended", "Pending"].map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters.includes(status)}
                              onChange={() => toggleFilter(status)}
                              className="rounded"
                            />
                            <span className="text-sm">{status}</span>
                          </label>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">S/N</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email Address</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last Login</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                          {user.avatar}
                        </div>
                        <span className="text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{user.phone}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{user.createdAt}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="px-4 py-4 text-sm">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => {
                              const typeParam =
                                activeTab === "Public Users"
                                  ? "?type=public-user"
                                  : activeTab === "Accredited Agents"
                                    ? "?type=accredited-agent"
                                    : ""
                              router.push(`/dashboard/users/${user.id}/details${typeParam}`)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => {
                              const typeParam =
                                activeTab === "Public Users"
                                  ? "?type=public-user"
                                  : activeTab === "Accredited Agents"
                                    ? "?type=accredited-agent"
                                    : ""
                              router.push(`/dashboard/users/${user.id}/edit${typeParam}`)
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => router.push(`/dashboard/users/${user.id}/password-reset`)}
                          >
                            <Lock className="h-4 w-4" />
                            Password Reset
                          </DropdownMenuItem>
                          {user.status === "Active" && (
                            <DropdownMenuItem className="gap-2 text-rose-600">
                              <Shield className="h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                          {user.status === "Suspended" && (
                            <DropdownMenuItem className="gap-2 text-emerald-600">
                              <RotateCcw className="h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="gap-2 text-rose-600">
                            <Trash2 className="h-4 w-4" />
                            De-activate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedUsers.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </CardContent>

        {totalPages > 1 && (
          <div className="flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                  .map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={page === currentPage ? "bg-emerald-600" : ""}
                    >
                      {page}
                    </Button>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
