"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AIConfigView } from "./ai-config-view"
import {
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Download,
  Filter,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  ArrowLeft,
  Bell,
} from "lucide-react"
import { Sidebar } from "./sidebar"

interface ConfigurationSection {
  id: string
  title: string
  description?: string
  items: ConfigItem[]
}

interface ConfigItem {
  id: string
  name: string
  createdAt: string
  timestamp: string
  createdBy: string
  badge?: {
    label: string
    color: string
  }
  otherFields?: Record<string, string>
}

type SectionKey =
  | "application-type"
  | "business-type"
  | "business-classification"
  | "nature-of-business"
  | "specific-nature"
  | "reasons-consent"
  | "restricted-words"
  | "proposed-officer"
  | "identification-type"
  | "company-registration"
  | "address-type"
  | "nature-control"
  | "ai-pre-incorporation"
  | "ai-post-incorporation"
  | "ai-insolvency"

const configSections: Record<SectionKey, ConfigurationSection> = {
  "application-type": {
    id: "application-type",
    title: "Application Type",
    items: [
      {
        id: "1",
        name: "Name Reservation",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "Name Requiring Consent",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
      },
      {
        id: "3",
        name: "Business Name Registration",
        createdAt: "Nov 14, 2025",
        timestamp: "1hr ago",
        createdBy: "Support",
      },
      {
        id: "4",
        name: "Company Registration",
        createdAt: "Nov 14, 2025",
        timestamp: "1hr ago",
        createdBy: "Support",
      },
    ],
  },
  "business-type": {
    id: "business-type",
    title: "Business Type",
    items: [
      {
        id: "1",
        name: "Sole Proprietor",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
        otherFields: { category: "Business Name", applicationType: "Name Reservation" },
      },
      {
        id: "2",
        name: "Partnership",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
        otherFields: { category: "Business Name", applicationType: "Name Reservation" },
      },
      {
        id: "3",
        name: "Private Company Limited by Shares",
        createdAt: "Nov 14, 2025",
        timestamp: "1hr ago",
        createdBy: "Support",
        otherFields: { category: "Company", applicationType: "Name Reservation" },
      },
    ],
  },
  "business-classification": {
    id: "business-classification",
    title: "Business Classification",
    items: [
      {
        id: "1",
        name: "Business Name (sole proprietorship or partnership)",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
        otherFields: { applicationType: "Name Reservation" },
      },
      {
        id: "2",
        name: "Incorporated Trustees (Non-profit/charity/NGO)",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
        otherFields: { applicationType: "Name Reservation" },
      },
    ],
  },
  "nature-of-business": {
    id: "nature-of-business",
    title: "Specific Nature of Business",
    items: [
      {
        id: "1",
        name: "Abattoir and meat selling services",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "Accommodation",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
      },
      {
        id: "3",
        name: "Accounting / Auditing Consultancy",
        createdAt: "Nov 14, 2025",
        timestamp: "1hr ago",
        createdBy: "Support",
      },
    ],
  },
  "specific-nature": {
    id: "specific-nature",
    title: "Specific Nature of Business",
    items: [
      {
        id: "1",
        name: "Abattoir and meat selling services",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
    ],
  },
  "reasons-consent": {
    id: "reasons-consent",
    title: "Reasons for Consent Request",
    items: [
      {
        id: "1",
        name: "Registration of Business as Limited",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "Group Holdings / Consortium",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
      },
    ],
  },
  "restricted-words": {
    id: "restricted-words",
    title: "Restricted Words",
    items: [
      {
        id: "1",
        name: "Chamber of Commerce", // Requires RG consent
        createdAt: "Jan 05, 2026",
        timestamp: "10 mins ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "Government / Federal", // Implies state ownership
        createdAt: "Jan 02, 2026",
        timestamp: "1 day ago",
        createdBy: "Admin",
      },
      {
        id: "3",
        name: "Bank / Microfinance", // Requires CBN License/Approval
        createdAt: "Dec 20, 2025",
        timestamp: "2 weeks ago",
        createdBy: "Super Admin",
      },
      {
        id: "4",
        name: "Foundation / Charity", // Restricted to Incorporated Trustees
        createdAt: "Dec 15, 2025",
        timestamp: "3 weeks ago",
        createdBy: "Admin",
      },
      {
        id: "5",
        name: "Police / Army", // Prohibited/Restricted
        createdAt: "Nov 28, 2025",
        timestamp: "1 month ago",
        createdBy: "Super Admin",
      },
      {
        id: "6",
        name: "University / Institute", // Requires Ministry of Education approval
        createdAt: "Nov 15, 2025",
        timestamp: "2 months ago",
        createdBy: "Admin",
      },
      {
        id: "7",
        name: "Consortium", // Requires evidence of multiple companies
        createdAt: "Nov 10, 2025",
        timestamp: "2 months ago",
        createdBy: "Super Admin",
      }
    ],
  },
  "proposed-officer": {
    id: "proposed-officer",
    title: "Proposed Officers",
    items: [
      {
        id: "1",
        name: "Directors",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "Secretary",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
      },
    ],
  },
  "identification-type": {
    id: "identification-type",
    title: "Identification Type",
    items: [
      {
        id: "1",
        name: "NIN",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "BVN",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
      },
    ],
  },
  "company-registration": {
    id: "company-registration",
    title: "Company Registration Type",
    items: [
      {
        id: "1",
        name: "Public Limited by Shares",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
      {
        id: "2",
        name: "Private Limited by Shares",
        createdAt: "Nov 14, 2025",
        timestamp: "1 min ago",
        createdBy: "Admin",
      },
    ],
  },
  "address-type": {
    id: "address-type",
    title: "Address Type",
    items: [
      {
        id: "1",
        name: "Residential Address",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
    ],
  },
  "nature-control": {
    id: "nature-control",
    title: "Nature of Control",
    items: [
      {
        id: "1",
        name: "Board of Directors",
        createdAt: "Nov 15, 2025",
        timestamp: "2hrs ago",
        createdBy: "Super Admin",
      },
    ],
  },
  "ai-pre-incorporation": {
    id: "ai-pre-incorporation",
    title: "Pre-Incorporation",
    items: [
      {
        id: "1",
        name: "AI Pre-Incorporation Config",
        createdAt: "Nov 16, 2025",
        timestamp: "30 min ago",
        createdBy: "AI Admin",
      },
    ],
  },
  "ai-post-incorporation": {
    id: "ai-post-incorporation",
    title: "Post-Incorporation",
    items: [
      {
        id: "1",
        name: "AI Post-Incorporation Config",
        createdAt: "Nov 16, 2025",
        timestamp: "30 min ago",
        createdBy: "AI Admin",
      },
    ],
  },
  "ai-insolvency": {
    id: "ai-insolvency",
    title: "Insolvency",
    items: [
      {
        id: "1",
        name: "AI Insolvency Config",
        createdAt: "Nov 16, 2025",
        timestamp: "30 min ago",
        createdBy: "AI Admin",
      },
    ],
  },
}

const sidebarSections = [
  {
    title: "New Reservation",
    isExpanded: true,
    items: [
      { id: "application-type", label: "Application Type" },
      { id: "business-type", label: "Business Type" },
      { id: "business-classification", label: "Business Classification" },
      { id: "nature-of-business", label: "Nature of Business" },
      { id: "specific-nature", label: "Specific Nature of Business" },
      { id: "reasons-consent", label: "Reasons for Consent Request" },
      { id: "restricted-words", label: "Restricted Words" },
    ],
  },
  {
    title: "Registration Setup",
    isExpanded: false,
    items: [
      { id: "proposed-officer", label: "Proposed Officer Type" },
      { id: "identification-type", label: "Identification Type" },
      { id: "company-registration", label: "Company Registration Type" },
      { id: "address-type", label: "Address Type" },
      { id: "nature-control", label: "Nature of Control" },
    ],
  },
  {
    title: "AI Configuration",
    isExpanded: false,
    items: [
      { id: "ai-pre-incorporation", label: "Pre-Incorporation" },
      { id: "ai-post-incorporation", label: "Post-Incorporation" },
      { id: "ai-insolvency", label: "Insolvency" },
    ],
  },
  {
    title: "Fees Schedule",
    isExpanded: false,
    items: [],
  },
]

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    "Super Admin": "text-purple-800",
    Admin: "text-blue-600",
    Support: "text-purple-600",
    Reviewer: "text-orange-600",
    "AI Admin": "text-green-600",
  }
  return colors[role] || "text-gray-600"
}

function ConfigurationTable({
  section,
  onAddNew,
}: {
  section: ConfigurationSection
  onAddNew: () => void
}) {
  const columns =
    section.id === "business-type"
      ? [
        "S/N",
        "Name of Business Type",
        "Category",
        "Application Type",
        "Created At",
        "Timestamp",
        "Created by",
        "Actions",
      ]
      : section.id === "business-classification"
        ? ["S/N", "Name of Classification", "Application Type", "Created At", "Timestamp", "Created by", "Actions"]
        : [
          "S/N",
          section.title === "Specific Nature of Business" ? "Name of specific Business" : `Name`,
          "Created At",
          "Timestamp",
          "Created by",
          "Actions",
        ]

  return (
    <div className="rounded-lg border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.items.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                {section.id === "business-type" && (
                  <>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.otherFields?.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.otherFields?.applicationType}</td>
                  </>
                )}
                {section.id === "business-classification" && (
                  <td className="px-6 py-4 text-sm text-gray-600">{item.otherFields?.applicationType}</td>
                )}
                <td className="px-6 py-4 text-sm text-gray-600">{item.createdAt}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.timestamp}</td>
                <td className={`px-6 py-4 text-sm font-medium ${getRoleColor(item.createdBy)}`}>{item.createdBy}</td>
                <td className="px-6 py-4 text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t bg-white px-6 py-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <div className="flex gap-2">
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <button
              key={index}
              className={`rounded px-3 py-1 text-sm font-medium ${page === 1 ? "bg-emerald-700 text-white" : "border text-gray-700 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}

export function SystemConfigurationPage() {
  const [selectedSection, setSelectedSection] = useState<SectionKey>("application-type")
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "New Reservation",
    "Registration Setup",
    "AI Configuration",
    "Fees Schedule",
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const isAIConfigSection = selectedSection.startsWith("ai-")
  const currentSection = !isAIConfigSection ? configSections[selectedSection] : null

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleAddNew = () => {
    router.push(`/system-config/add?section=${selectedSection}`)
  }

  const getAIConfigType = (): "pre-incorporation" | "post-incorporation" | "insolvency" => {
    switch (selectedSection) {
      case "ai-pre-incorporation":
        return "pre-incorporation"
      case "ai-post-incorporation":
        return "post-incorporation"
      case "ai-insolvency":
        return "insolvency"
      default:
        return "pre-incorporation"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      </div>

      <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
        <header className="border-b bg-white">
          <div className="flex h-20 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">System Configuration</h1>
              <p className="text-sm text-gray-500">Configure system settings, and access</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search" className="pl-10" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex gap-6 p-8">
            {/* Left Sidebar */}
            <div className="w-72 flex-shrink-0">
              <Card className="sticky top-6 overflow-hidden">
                <CardContent className="p-0">
                  <Accordion
                    type="single"  // Changed to single so only one stays open at a time
                    collapsible    // Allows the user to close all items if they wish
                    defaultValue="New Reservation" // Matches the title of the first sidebarSection
                    className="w-full"
                  >
                    {sidebarSections.map((sidebarSection) => (
                      <AccordionItem
                        key={sidebarSection.title}
                        value={sidebarSection.title} // This value must match the defaultValue above
                        className="border-b last:border-0 px-4"
                      >
                        <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold text-gray-900">
                          {sidebarSection.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pb-2">
                            {sidebarSection.items.length > 0 ? (
                              sidebarSection.items.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => setSelectedSection(item.id as SectionKey)}
                                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedSection === item.id
                                      ? "bg-emerald-50 font-medium text-emerald-700"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                  {item.label}
                                </button>
                              ))
                            ) : (
                              <p className="px-3 py-2 text-xs text-muted-foreground italic">
                                No items configured
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {isAIConfigSection ? (
                <AIConfigView currentConfigType={getAIConfigType()} />
              ) : (
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <ArrowLeft className="h-5 w-5 text-gray-400" />
                      <h1 className="text-2xl font-bold text-gray-900">{currentSection?.title}</h1>
                      <span className="text-gray-500">({currentSection?.items.length})</span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Search and Filters */}
                      <div className="flex flex-1 gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="text"
                            placeholder={`Search ${currentSection?.title.toLowerCase()}...`}
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                        <Button onClick={handleAddNew} className="gap-2 bg-emerald-700 hover:bg-emerald-800" size="sm">
                          <Plus className="h-4 w-4" />
                          Add New
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  {currentSection && <ConfigurationTable section={currentSection} onAddNew={handleAddNew} />}
                </div>
              )}
            </div>
          </div>
        </main>

      </div>

    </div>
  )
}
