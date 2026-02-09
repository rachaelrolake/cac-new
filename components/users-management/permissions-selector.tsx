"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ChevronUp, Shield, Database, FileText, Settings, Users, BarChart } from "lucide-react"
import { usersAPI, type Resource } from "@/lib/api/users-management"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface PermissionsSelectorProps {
  selectedPermissions: string[]
  onPermissionsChange: (permissionIds: string[]) => void
  disabled?: boolean
}

// Icon mapping for resources
const getResourceIcon = (resourceName: string) => {
  const name = resourceName.toLowerCase()
  if (name.includes('reservation')) return <Shield className="h-4 w-4 text-emerald-600" />
  if (name.includes('payment')) return <Database className="h-4 w-4 text-emerald-600" />
  if (name.includes('reference')) return <FileText className="h-4 w-4 text-emerald-600" />
  if (name.includes('user')) return <Users className="h-4 w-4 text-emerald-600" />
  if (name.includes('report')) return <BarChart className="h-4 w-4 text-emerald-600" />
  return <Settings className="h-4 w-4 text-emerald-600" />
}

export function PermissionsSelector({
  selectedPermissions,
  onPermissionsChange,
  disabled = false
}: PermissionsSelectorProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    setIsLoading(true)
    try {
      const data = await usersAPI.getResources()
      // Filter out duplicates and only get parent resources
      const uniqueResources = data.filter(r => !r.parent)
      setResources(uniqueResources)
      // Expand all sections by default
      setExpandedSections(uniqueResources.map(r => r.id))
    } catch (error: any) {
      toast.error("Failed to load permissions", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleToggle = (resourceId: string) => {
    if (disabled) return

    const isSelected = selectedPermissions.includes(resourceId)

    if (isSelected) {
      onPermissionsChange(selectedPermissions.filter(id => id !== resourceId))
    } else {
      onPermissionsChange([...selectedPermissions, resourceId])
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-700" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions</CardTitle>
        <p className="text-sm text-gray-500">
          Select the permissions this user should have access to
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No permissions available
            </p>
          ) : (
            resources.map((resource) => (
              <Card
                key={resource.id}
                className="border border-gray-200 shadow-sm overflow-hidden rounded-xl"
              >
                {/* Accordion Header */}
                <div
                  className="flex items-center justify-between px-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(resource.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                      {getResourceIcon(resource.name)}
                    </div>
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                  </div>
                  <ChevronUp
                    className={cn(
                      "h-5 w-5 text-gray-400 transition-transform",
                      !expandedSections.includes(resource.id) && "rotate-180"
                    )}
                  />
                </div>

                {/* Accordion Body */}
                {expandedSections.includes(resource.id) && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="bg-[#FDFDFD] rounded-xl p-6 space-y-6">
                      {/* Parent Resource Checkbox */}
                      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <span className="text-sm font-medium text-[#475467]">
                          {resource.name} (Main Access)
                        </span>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={resource.id}
                            checked={selectedPermissions.includes(resource.id)}
                            onCheckedChange={() => handleToggle(resource.id)}
                            disabled={disabled}
                            className="h-5 w-5 border-gray-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white"
                          />
                          <label
                            htmlFor={resource.id}
                            className="text-sm font-medium text-emerald-600 cursor-pointer"
                          >
                            {selectedPermissions.includes(resource.id) ? 'Enabled' : 'Disabled'}
                          </label>
                        </div>
                      </div>

                      {/* Children Resources */}
                      {resource.children && resource.children.length > 0 && (
                        <div className="space-y-4">
                          <p className="text-xs font-semibold text-gray-500 tracking-wide">
                            Sub-Permissions
                          </p>
                          {resource.children.map((child) => (
                            <div
                              key={child.id}
                              className="flex items-center justify-between py-3 border-t border-gray-100"
                            >
                              <span className="text-sm font-medium text-[#475467]">
                                {child.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={child.id}
                                  checked={selectedPermissions.includes(child.id)}
                                  onCheckedChange={() => handleToggle(child.id)}
                                  disabled={disabled}
                                  className="h-5 w-5 border-gray-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white"
                                />
                                <label
                                  htmlFor={child.id}
                                  className="text-sm font-medium text-emerald-600 cursor-pointer"
                                >
                                  {selectedPermissions.includes(child.id) ? 'Enabled' : 'Disabled'}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* No children message */}
                      {(!resource.children || resource.children.length === 0) && (
                        <p className="text-xs text-gray-400 italic">
                          No sub-permissions available
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>

        {resources.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{selectedPermissions.length}</span> permission(s) selected
              </p>
              {selectedPermissions.length > 0 && (
                <button
                  type="button"
                  onClick={() => onPermissionsChange([])}
                  disabled={disabled}
                  className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}