"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AddUserPage() {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<string[]>(["User Information"])
  const [formData, setFormData] = useState({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userRole: "",
    status: "Inactive",
    profileImage: null as File | null,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/dashboard/users")
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back button */}
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-white border border-black rounded-lg px-3 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 p-0 h-auto text-black hover:bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Information Section */}
          <Card className="border bg-white">
            <div
              className="flex items-center justify-between border-b px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("User Information")}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-600">
                  <span className="text-xs">👤</span>
                </div>
                <h3 className="font-semibold text-gray-900">User Information</h3>
              </div>
              <ChevronUp
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  !expandedSections.includes("User Information") ? "rotate-180" : ""
                }`}
              />
            </div>

            {expandedSections.includes("User Information") && (
              <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                  {/* Left side form */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Staff ID *</label>
                      <Input
                        name="staffId"
                        placeholder="Enter Staff ID"
                        value={formData.staffId}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Name *</label>
                      <Input
                        name="lastName"
                        placeholder="Enter Lastname"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                      <Input
                        name="phone"
                        placeholder="+234"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Status *</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option>Inactive</option>
                        <option>Active</option>
                      </select>
                    </div>
                  </div>

                  {/* Right side - Profile Image and other fields */}
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                        {formData.profileImage ? (
                          <img
                            src={URL.createObjectURL(formData.profileImage) || "/placeholder.svg"}
                            alt="Profile"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-500">Profile Photo</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profileImage"
                      />
                      <label htmlFor="profileImage" className="cursor-pointer">
                        <span className="text-sm text-blue-600 hover:underline">Upload Photo</span>
                      </label>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">First Name *</label>
                      <Input
                        name="firstName"
                        placeholder="Enter Firstname"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">User role *</label>
                      <Input
                        name="userRole"
                        placeholder="Type Role"
                        value={formData.userRole}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Permissions Section */}
          <Card className="border bg-white">
            <div
              className="flex items-center justify-between border-b px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("Permissions")}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-600">
                  <span className="text-xs">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900">Permissions</h3>
              </div>
              <ChevronUp
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  !expandedSections.includes("Permissions") ? "rotate-180" : ""
                }`}
              />
            </div>

            {expandedSections.includes("Permissions") && (
              <div className="space-y-6 p-6">
                {/* Dashboard */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Dashboard</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="dashboard-access" className="rounded" />
                      <label htmlFor="dashboard-access" className="text-sm">
                        Access control
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="dashboard" value="read" className="rounded" />
                        <span className="text-sm">Read</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="dashboard" value="write" className="rounded" />
                        <span className="text-sm">Write</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="dashboard" value="full" className="rounded" />
                        <span className="text-sm">Full Access</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" id="overview" className="rounded" />
                    <span className="text-sm">Overview</span>
                  </label>
                </div>

                {/* Executive Summary */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" id="summary" className="rounded" />
                    <span className="text-sm">Executive Summary</span>
                  </label>
                </div>
              </div>
            )}
          </Card>

          {/* User Management Section */}
          <Card className="border bg-white">
            <div
              className="flex items-center justify-between border-b px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("User Management")}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-600">
                  <span className="text-xs">👥</span>
                </div>
                <h3 className="font-semibold text-gray-900">User Management</h3>
              </div>
              <ChevronUp
                className={`h-4 w-4 text-gray-600 transition-transform ${
                  !expandedSections.includes("User Management") ? "rotate-180" : ""
                }`}
              />
            </div>

            {expandedSections.includes("User Management") && (
              <div className="space-y-4 p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="user-access" className="rounded" />
                    <label htmlFor="user-access" className="text-sm">
                      Access control
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="users" value="read" className="rounded" />
                      <span className="text-sm">Read</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="users" value="write" className="rounded" />
                      <span className="text-sm">Write</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="users" value="full" className="rounded" />
                      <span className="text-sm">Full Access</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t bg-white p-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={handleBack} className="w-full sm:w-auto bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto">
              Save User
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
