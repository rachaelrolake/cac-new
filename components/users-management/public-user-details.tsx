"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Search, X, Zap, CheckCircle2, Loader2, ArrowLeft, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserActionDialog } from "../reusables/action-dialog"
import { publicUsersAPI, usersAPI, type PublicUser } from "@/lib/api/users-management"
import { toast } from "sonner"
import { format } from "date-fns"


export default function PublicUsersDetails() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string
  const [user, setUser] = useState<PublicUser | null>(null)
  const [userWithDocs, setUserWithDocs] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeDialog, setActiveDialog] = useState<"suspend" | "deactivate" | null>(null)

  const [activityLogs, setActivityLogs] = useState<any[]>([])
  const [activityPage, setActivityPage] = useState(1)

  useEffect(() => {
    fetchUserDetails()
    fetchActivityLogs()
    fetchUserDocuments()
  }, [userId])

  const fetchUserDetails = async () => {
    setIsLoading(true)
    try {
      const userData = await publicUsersAPI.getPublicUserById(userId)
      setUser(userData)
    } catch (error: any) {
      toast.error("Failed to load user details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserDocuments = async () => {
    try {
      const userData = await usersAPI.getUserById(userId)
      setUserWithDocs(userData)
    } catch (error: any) {
      console.error("Failed to load documents:", error)
    }
  }

  const fetchActivityLogs = async () => {
    try {
      const logs = await usersAPI.getActivityLogs(userId, activityPage, 20)
      setActivityLogs(logs.data)
    } catch (error) {
      console.error("Failed to load activity logs:", error)
    }
  }

  const handleToggleStatus = async () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      await publicUsersAPI.toggleUserStatus(userId, user.isActive)
      toast.success(`User ${user.isActive ? 'suspended' : 'activated'} successfully`)
      setActiveDialog(null)
      // Refresh user data
      fetchUserDetails()
    } catch (error: any) {
      toast.error(`Failed to ${user.isActive ? 'suspend' : 'activate'} user`, {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeactivate = async () => {
    setIsSubmitting(true)
    try {
      await publicUsersAPI.deactivateUser(userId)
      toast.success("User account deactivated successfully")
      setActiveDialog(null)
      router.push('/users-management')
    } catch (error: any) {
      toast.error("Failed to deactivate user", {
        description: error.response?.data?.message || "Please try again"
      })
      setIsSubmitting(false)
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
  ]

  return (
    <>
      {/* Header section */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-xl font-bold">User Details</CardTitle>
          <div className="flex gap-3">
            {/* <Button
              variant="outlineprimary"
              size="lg"
              onClick={() => setActiveDialog("suspend")}
              disabled={isSubmitting}
            >
              {user.isActive ? "Suspend User" : "Activate User"}
            </Button> */}
            <Button
              variant="destructive"
              size="lg"
              onClick={() => setActiveDialog("deactivate")}
              disabled={isSubmitting}
            >
              Deactivate Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {details.map((item) => (
              <div key={item.label} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <div className="flex items-center gap-2">
                  {item.icon && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  <p className="font-medium text-sm text-slate-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>


          {/* Documents Section */}
          {userWithDocs?.documents && userWithDocs.documents.length > 0 && (
            <>
              <hr className="my-5" />
              <h2 className="font-bold mb-3">Uploaded Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userWithDocs.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center gap-3 p-4 border rounded-lg bg-white hover:border-green-500 transition-colors">
                    <div className="bg-gray-100 p-2 rounded">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{doc.fileName}</p>
                      <p className="text-[10px] text-gray-400">{(parseInt(doc.fileSize) / 1024).toFixed(2)} KB</p>
                      <p className="text-[10px] text-gray-500">{doc.documentType}</p>
                    </div>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>


      {/* Suspend/Activate Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "suspend"}
        onClose={() => setActiveDialog(null)}
        title={user.isActive ? "Suspend user?" : "Activate user?"}
        description={user.isActive ? "Are you sure you want to suspend this user?" : "Are you sure you want to activate this user?"}
        confirmText={user.isActive ? "Suspend User" : "Activate User"}
        onConfirm={handleToggleStatus}
        isLoading={isSubmitting}
      />

      {/* Deactivate Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "deactivate"}
        onClose={() => setActiveDialog(null)}
        title="Deactivate user account?"
        description="Are you sure you want to deactivate user account? Note that this will not delete the user details from the database."
        confirmText="Deactivate Account"
        onConfirm={handleDeactivate}
        isLoading={isSubmitting}
      />

      {/* Bottom Section */}
      <Card>
        <Tabs defaultValue="activity" className="w-full">
          <div className="px-6 pt-6 border-b">
            <CardTitle className="text-lg font-bold mb-4">Activity Log</CardTitle>

            <div className="relative my-4 w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>

          <div className="px-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-16">S/N</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamps</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLogs.length > 0 ? (
                  activityLogs.map((log, index) => (
                    <TableRow key={log.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.entityType}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>{format(new Date(log.timestamp), "MMM dd, yyyy HH:mm")}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      No activity logs available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination controls would go here */}
        </Tabs>
      </Card>
    </>
  )
}