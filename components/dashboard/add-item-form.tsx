"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Map section IDs to titles
const sectionTitles: Record<string, string> = {
  "application-type": "Application Type",
  "business-type": "Business Type",
  "business-classification": "Business Classification",
  "nature-of-business": "Nature of Business",
  "specific-nature": "Specific Nature of Business",
  "reasons-consent": "Reasons for Consent Request",
  "proposed-officer": "Proposed Officer Type",
  "identification-type": "Identification Type",
  "company-registration": "Company Registration Type",
  "address-type": "Address Type",
  "nature-control": "Nature of Control",
}

export function AddItemContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const section = searchParams.get("section") || "application-type"
  const sectionTitle = sectionTitles[section] || "New Item"
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    router.back()
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={handleCancel}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add {sectionTitle}</h1>
        <p className="mt-2 text-gray-600">Create a new {sectionTitle.toLowerCase()} entry</p>
      </div>

      {/* Form Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Enter Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dynamic form based on section */}
          {section === "business-type" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Name of Business Type *</Label>
                <Input
                  id="name"
                  placeholder="Enter name of business type"
                  value={formData.name || ""}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appType">Application Type *</Label>
                <Select
                  value={formData.applicationType || ""}
                  onValueChange={(value) => handleFormChange("applicationType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-- Select --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-reservation">Name Reservation</SelectItem>
                    <SelectItem value="company-reg">Company Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category || ""} onValueChange={(value) => handleFormChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Select --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business-name">Business Name</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {section === "application-type" && (
            <div className="space-y-2">
              <Label htmlFor="appName">Name of Application Type *</Label>
              <Input
                id="appName"
                placeholder="Enter name of application type"
                value={formData.name || ""}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
            </div>
          )}

          {/* Default form for other sections */}
          {section !== "business-type" && section !== "application-type" && (
            <div className="space-y-2">
              <Label htmlFor="itemName">Name *</Label>
              <Input
                id="itemName"
                placeholder={`Enter ${sectionTitle.toLowerCase()}`}
                value={formData.name || ""}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={handleSubmit}>
              Add {sectionTitle}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
