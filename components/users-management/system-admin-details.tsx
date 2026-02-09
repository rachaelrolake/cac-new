"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Search, CheckCircle2, Loader2, ArrowLeft, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { usersAPI, type User, type UserPermission } from "@/lib/api/users-management"
import { toast } from "sonner"
import { format } from "date-fns"

export default function SystemAdminDetails() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserDetails()
  }, [userId])

  const fetchUserDetails = async () => {
    setIsLoading(true)
    try {
      const userData = await usersAPI.getUserById(userId)
      setUser(userData)

      // Fetch user permissions
      const permissionsData = await usersAPI.getUserPermissions(userId)
      setUserPermissions(permissionsData.permissions)
    } catch (error: any) {
      toast.error("Failed to load user details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  if (!user) {
    return <div className="text-center py-20">User not found</div>
  }

  const details = [
    { label: "First Name", value: user.firstName || "N/A" },
    { label: "Surname", value: user.lastName || "N/A" },
    { label: "Email", value: user.email },
    { label: "Phone number", value: user.phoneNumber || "N/A" },
    {
      label: "Account Status",
      value: user.isActive ? "Active" : "Suspended",
      icon: user.isActive
    },
    {
      label: "Date Created",
      value: format(new Date(user.createdAt), "MMM dd, yyyy")
    },
    { label: "Staff ID", value: user.staffId || "N/A" },
    { label: "Organization", value: user.organizationName || "N/A" },
    {
      label: "Last Login",
      value: user.lastLoginAt ? format(new Date(user.lastLoginAt), "MMM dd, yyyy HH:mm") : "Never"
    },
    { label: "MFA Enabled", value: user.mfaEnabled ? "Yes" : "No" },
  ]

  return (
    <>
      {/* Back Button */}
      {/* <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div> */}

      {/* Header section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold">User Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {details.map((item) => (
            <div key={item.label} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <div className="flex items-center gap-2">
                {item.icon && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                <p className="font-medium text-sm text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <Card>
        <Tabs defaultValue="activity" className="w-full">
          <div className="px-6 pt-6 border-b">
            <CardTitle className="text-lg font-bold mb-4">Activity Log</CardTitle>
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Permissions
              </TabsTrigger>
            </TabsList>
            <div className="relative my-4 w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>

          <TabsContent value="activity">
            <div className="px-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-16">S/N</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Timestamps</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                      Activity log not available yet
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="p-6">
            {userPermissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userPermissions.map((permission) => (
                  <div key={permission.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="text-sm font-semibold">{permission.resourceName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                        Has Access
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No permissions assigned</p>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/users-management/${userId}/edit?userType=system-admin`)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Assign Permissions
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </>
  )
}