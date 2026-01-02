"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

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
    ],
  },
  {
    title: "Registration Setup",
    isExpanded: true,
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
    isExpanded: true,
    items: [
      { id: "ai-pre-incorporation", label: "Pre-Incorporation" },
      { id: "ai-post-incorporation", label: "Post-Incorporation" },
      { id: "ai-insolvency", label: "Insolvency" },
    ],
  },
]

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    "Super Admin": "bg-purple-100 text-purple-800",
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
              className={`rounded px-3 py-1 text-sm font-medium ${
                page === 1 ? "bg-emerald-700 text-white" : "border text-gray-700 hover:bg-gray-100"
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
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const isAIConfigSection = selectedSection.startsWith("ai-")
  const currentSection = !isAIConfigSection ? configSections[selectedSection] : null

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleAddNew = () => {
    router.push(`/dashboard/system-config/add?section=${selectedSection}`)
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
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="w-72 flex-shrink-0">
        <Card className="sticky top-6">
          <CardContent className="space-y-4 p-4">
            {sidebarSections.map((sidebarSection) => (
              <div key={sidebarSection.title}>
                <button
                  onClick={() => toggleSection(sidebarSection.title)}
                  className="flex w-full items-center justify-between rounded-lg hover:bg-gray-100 p-2"
                >
                  <span className="font-medium text-gray-900">{sidebarSection.title}</span>
                  {expandedSections.includes(sidebarSection.title) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.includes(sidebarSection.title) && (
                  <div className="ml-2 mt-2 space-y-1">
                    {sidebarSection.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedSection(item.id as SectionKey)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          selectedSection === item.id
                            ? "bg-emerald-50 font-medium text-emerald-700"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
  )
}
