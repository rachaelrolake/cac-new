"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronUp, ArrowLeft, User, Lock, Users, LayoutDashboard, Check, ShieldCheck, PlusSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"


const PERMISSIONS_DATA = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5 text-emerald-600" />,
    items: [
      { id: "overview", label: "Overview" },
      { id: "exec-summary", label: "Executive Summary" },
    ],
  },
  {
    id: "user-management",
    title: "User Management",
    icon: <Users className="h-5 w-5 text-emerald-600" />,
    items: [
      { id: "sys-admins", label: "System Admins" },
      { id: "acc-agents", label: "Accredited Agents" },
      { id: "ins-agents", label: "Insolvency Agents" },
      { id: "pub-users", label: "Public Users" },
      { id: "ent-accounts", label: "Entity Accounts" },
    ],
  },
  {
    id: "pre-incorp",
    title: "Pre Incorporation",
    icon: <PlusSquare className="h-5 w-5 text-emerald-600" />, // Import PlusSquare or similar
    items: [
      { id: "biz-reg", label: "Business Name Registration" },
      { id: "name-res", label: "Name Reservation" },
      { id: "consent", label: "Name Requiring Consent" },
      { id: "trustees", label: "Trustees" },
    ],
  },
  // Add System Configuration, Transactions, Reports, etc., following this pattern
];

// Define the available user types
type UserType = "System Admin" | "Public User" | "Accredited Agent" | "Insolvency Agent" | "Entity Account"

export default function AddUserPage() {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<string[]>(["User Information", "Permissions"])
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");

  // Map the URL slug back to the readable Role name
  const roleMap: Record<string, UserType> = {
    "system-admin": "System Admin",
    "public-user": "Public User",
    "accredited-agent": "Accredited Agent",
    "insolvency-agent": "Insolvency Agent",
    "entity-account": "Entity Account",
  };

  const [formData, setFormData] = useState({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userRole: roleMap[typeFromUrl as string] || "" as UserType | "",
    status: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-10 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium text-sm">Back</span>
          </Button>
        </div>

        <form className="space-y-6">
          {/* Section 1: User Information */}
          <Card className="border border-gray-200 shadow-sm overflow-hidden rounded-xl">
            <div
              className="flex items-center justify-between px-6 py-5 cursor-pointer bg-white"
              onClick={() => toggleSection("User Information")}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">User Information</h3>
              </div>
              <ChevronUp className={cn("h-5 w-5 text-gray-400 transition-transform", !expandedSections.includes("User Information") && "rotate-180")} />
            </div>

            {expandedSections.includes("User Information") && (
              <div className="p-8 pt-0 bg-white border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-6">
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-bold text-[#344054]">Staff ID *</Label>
                    <Input name="staffId" placeholder="Enter Staff ID" className="h-12 border-gray-300 rounded-lg placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-bold text-[#344054]">First Name *</Label>
                    <Input name="firstName" placeholder="Enter Firstname" className="h-12 border-gray-300 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-bold text-[#344054]">Last Name *</Label>
                    <Input name="lastName" placeholder="Enter Lastname" className="h-12 border-gray-300 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-bold text-[#344054]">Email Address *</Label>
                    <Input name="email" type="email" placeholder="Enter Email Address" className="h-12 border-gray-300 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-bold text-[#344054]">Phone Number *</Label>
                    <Input name="phone" placeholder="+234" className="h-12 border-gray-300 rounded-lg" />
                  </div>

                  {/* User Role Selection */}
                  <div className="space-y-1.5">
                    <Label className="text-[13px] font-bold text-[#344054]">User role *</Label>
                    <Select onValueChange={(val: UserType) => setFormData(prev => ({ ...prev, userRole: val }))}>
                      <SelectTrigger className="h-12 border-gray-300 rounded-lg w-full">
                        <SelectValue placeholder="Type Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="System Admin">System Admin</SelectItem>
                        <SelectItem value="Public User">Public User</SelectItem>
                        <SelectItem value="Accredited Agent">Accredited Agent</SelectItem>
                        <SelectItem value="Insolvency Agent">Insolvency Agent</SelectItem>
                        <SelectItem value="Entity Account">Entity Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label className="text-[13px] font-bold text-[#344054]">Status *</Label>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={formData.status}
                        onCheckedChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                      <span className="text-sm text-gray-500">{formData.status ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Conditional Rendering for Permissions */}
          {formData.userRole === "System Admin" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-1 pt-4 text-[#344054]">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-wider">Permissions</span>
              </div>

              {PERMISSIONS_DATA.map((section) => (
                <Card key={section.id} className="border border-gray-200 shadow-sm overflow-hidden rounded-xl">
                  <div
                    className="flex items-center justify-between px-6 py-5 cursor-pointer bg-white"
                    onClick={() => toggleSection(section.title)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                        {section.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <ChevronUp
                      className={cn(
                        "h-5 w-5 text-gray-400 transition-transform",
                        !expandedSections.includes(section.title) && "rotate-180"
                      )}
                    />
                  </div>

                  {expandedSections.includes(section.title) && (
                    <div className="px-8 pb-8 bg-white border-t border-gray-100">
                      <div className="bg-[#FDFDFD] rounded-xl p-6 border border-gray-100 space-y-6 mt-6">

                        {/* Header Row for alignment reference if needed */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-[#475467]">Access control</span>
                          <div className="flex items-center gap-12">
                            {["Read", "Write", "Full Access"].map((label) => (
                              <div key={label} className="flex items-center gap-3 w-20 justify-end">
                                <Switch className="scale-75 data-[state=checked]:bg-emerald-600" />
                                <span className="text-[10px] font-medium text-gray-400 uppercase">{label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sub-Items Mapped from Array */}
                        {section.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-t border-gray-100 pt-5">
                            <span className="text-sm font-medium text-[#475467]">{item.label}</span>
                            <div className="flex items-center gap-12">
                              {/* Read Column */}
                              <div className="w-20 flex justify-end">
                                <div className="h-5 w-5 rounded border-2 border-emerald-600 flex items-center justify-center bg-emerald-50">
                                  <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[4]" />
                                </div>
                              </div>
                              {/* Write Column */}
                              <div className="w-20 flex justify-end">
                                <div className="h-5 w-5 rounded border-2 border-gray-300 bg-white" />
                              </div>
                              {/* Full Access Column */}
                              <div className="w-20 flex justify-end">
                                <div className="h-5 w-5 rounded border-2 border-gray-300 bg-white" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-8 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-12 px-10 bg-primary hover:bg-primary-600 text-white font-bold rounded-lg shadow-lg shadow-primary-100"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}