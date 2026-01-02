"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronUp, ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "User Information",
    "Permissions",
    "User Management",
  ])
  const [formData, setFormData] = useState({
    staffId: "CAC-2019-01",
    firstName: "John",
    lastName: "Doe",
    email: "john@cac.gov.ng",
    phone: "+234 913 450 7999",
    userRole: "Super Admin",
    status: "Active",
    profileImage: null as File | null,
  })

  const [permissions, setPermissions] = useState({
    dashboard: {
      accessControl: true,
      read: true,
      write: true,
      fullAccess: false,
    },
    overview: true,
    executiveSummary: true,
    userManagement: {
      accessControl: false,
      read: false,
      write: false,
      fullAccess: false,
    },
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
    console.log("Form submitted:", { ...formData, permissions })
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
          <div className="bg-white border border-black rounded-lg p-2 w-fit">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2 p-0 h-auto text-black hover:bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Information Section */}
          <Card className="border-2 border-blue-400 bg-white">
            <div
              className="flex items-center justify-between border-b px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("User Information")}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 border border-blue-400">
                  <Shield className="h-4 w-4 text-blue-600" />
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
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
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
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
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
          <Card className="border-2 border-blue-400 bg-white">
            <div
              className="flex items-center justify-between border-b px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("Permissions")}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
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
                <div className="border-b pb-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">Dashboard</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Access control</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.dashboard.accessControl}
                          onChange={(e) =>
                            setPermissions((prev) => ({
                              ...prev,
                              dashboard: { ...prev.dashboard, accessControl: e.target.checked },
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="dashboard"
                          checked={permissions.dashboard.read}
                          onChange={() =>
                            setPermissions((prev) => ({
                              ...prev,
                              dashboard: { ...prev.dashboard, read: true, write: false, fullAccess: false },
                            }))
                          }
                        />
                        <span className="text-sm">Read</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="dashboard"
                          checked={permissions.dashboard.write}
                          onChange={() =>
                            setPermissions((prev) => ({
                              ...prev,
                              dashboard: { ...prev.dashboard, read: false, write: true, fullAccess: false },
                            }))
                          }
                        />
                        <span className="text-sm">Write</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="dashboard"
                          checked={permissions.dashboard.fullAccess}
                          onChange={() =>
                            setPermissions((prev) => ({
                              ...prev,
                              dashboard: { ...prev.dashboard, read: false, write: false, fullAccess: true },
                            }))
                          }
                        />
                        <span className="text-sm">Full Access</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="border-b pb-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={permissions.overview}
                      onChange={(e) => setPermissions((prev) => ({ ...prev, overview: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Overview</span>
                  </label>
                </div>

                {/* Executive Summary */}
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={permissions.executiveSummary}
                      onChange={(e) => setPermissions((prev) => ({ ...prev, executiveSummary: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Executive Summary</span>
                  </label>
                </div>
              </div>
            )}
          </Card>

          {/* User Management Section */}
          <Card className="border-2 border-blue-400 bg-white">
            <div
              className="flex items-center justify-between border-b px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("User Management")}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
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
                <div className="flex items-center justify-between pb-4 border-b">
                  <label className="text-sm font-medium text-gray-700">Access control</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.userManagement.accessControl}
                      onChange={(e) =>
                        setPermissions((prev) => ({
                          ...prev,
                          userManagement: { ...prev.userManagement, accessControl: e.target.checked },
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userManagement"
                      checked={permissions.userManagement.read}
                      onChange={() =>
                        setPermissions((prev) => ({
                          ...prev,
                          userManagement: { ...prev.userManagement, read: true, write: false, fullAccess: false },
                        }))
                      }
                    />
                    <span className="text-sm">Read</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userManagement"
                      checked={permissions.userManagement.write}
                      onChange={() =>
                        setPermissions((prev) => ({
                          ...prev,
                          userManagement: { ...prev.userManagement, read: false, write: true, fullAccess: false },
                        }))
                      }
                    />
                    <span className="text-sm">Write</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userManagement"
                      checked={permissions.userManagement.fullAccess}
                      onChange={() =>
                        setPermissions((prev) => ({
                          ...prev,
                          userManagement: { ...prev.userManagement, read: false, write: false, fullAccess: true },
                        }))
                      }
                    />
                    <span className="text-sm">Full Access</span>
                  </label>
                </div>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t bg-white p-6 sm:flex-row sm:justify-end rounded-b">
            <Button type="button" variant="outline" onClick={handleBack} className="w-full sm:w-auto bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
