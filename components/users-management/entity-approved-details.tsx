"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, ChevronRight, Download, Filter, InfoIcon, Loader2, ArrowLeft } from "lucide-react";
import { UserActionDialog } from "../reusables/action-dialog";
import { getStatusColor } from "../reusables/status-color";
import { entityAccountsAPI, type EntityAccount } from "@/lib/api/users-management";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ApprovedEntityDetails() {
  const router = useRouter()
  const params = useParams()
  const entityId = params.id as string
  const [entity, setEntity] = useState<EntityAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeDialog, setActiveDialog] = useState<"suspend" | "dissolve" | null>(null)

  useEffect(() => {
    fetchEntityDetails()
  }, [entityId])

  const fetchEntityDetails = async () => {
    setIsLoading(true)
    try {
      const entityData = await entityAccountsAPI.getEntityAccountById(entityId)
      setEntity(entityData)
    } catch (error: any) {
      toast.error("Failed to load entity details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Add suspend/activate endpoint when available
      toast.success("Status updated successfully")
      setActiveDialog(null)
      fetchEntityDetails()
    } catch (error: any) {
      toast.error("Failed to update status", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDissolve = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Add dissolve endpoint when available
      toast.success("Entity account dissolved successfully")
      setActiveDialog(null)
      router.push('/users-management')
    } catch (error: any) {
      toast.error("Failed to dissolve entity", {
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

  if (!entity) {
    return <div className="text-center py-20">Entity not found</div>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <Button variant="default" size="lg">View Detailed Entity Record</Button>
          <InfoIcon />
        </div>
      </div>
      {/* Suspend Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "suspend"}
        onClose={() => setActiveDialog(null)}
        title={entity.isActive ? "Suspend user?" : "Activate user?"}
        description={entity.isActive ? "Are you sure you want to suspend this user?" : "Are you sure you want to activate this user?"}
        confirmText={entity.isActive ? "Suspend User" : "Activate User"}
        onConfirm={handleToggleStatus}
        isLoading={isSubmitting}
      />

      {/* Dissolve Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "dissolve"}
        onClose={() => setActiveDialog(null)}
        title="Dissolve user account?"
        description="Are you sure you want to dissolve user account? Note that this will not delete the user details from the database."
        confirmText="Dissolve Account"
        onConfirm={handleDissolve}
        isLoading={isSubmitting}
      />

      {/* Tabs System */}
      <Card>
        <Tabs defaultValue="user-details" className="w-full space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-lg border-gray-200 m-4">
            <TabsTrigger
              value="user-details"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              User Details
            </TabsTrigger>
            <TabsTrigger
              value="activity-log"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Activity Log
            </TabsTrigger>
            <TabsTrigger
              value="filing-history"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Filing History
            </TabsTrigger>

            <TabsTrigger
              value="other-admins"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Other Admin
            </TabsTrigger>
          </TabsList>

          {/* --- Tab 1: User Details --- */}
          <TabsContent value="user-details">
            <div className="border-gray-200 shadow-none">
              <CardHeader className="flex justify-between">
                <CardTitle className="text-base font-semibold">User Details</CardTitle>

                <div className="flex gap-3">
                  <Button
                    variant="outlineprimary"
                    size="lg"
                    onClick={() => setActiveDialog("suspend")}
                    disabled={isSubmitting}
                  >
                    {entity.isActive ? "Suspend User" : "Activate User"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => setActiveDialog("dissolve")}
                    disabled={isSubmitting}
                  >
                    Dissolve Entity Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Organization Name", value: entity.organizationName || "N/A" },
                    { label: "Entity ID", value: entity.staffId || "N/A" },
                    { label: "Account Status", value: entity.accountStatus, status: entity.isActive },
                    { label: "Email", value: entity.email },
                    { label: "Phone Number", value: entity.phoneNumber || "N/A" },
                    { label: "Created At", value: format(new Date(entity.createdAt), "MMM dd, yyyy") },
                    { label: "Last Login", value: entity.lastLoginAt ? format(new Date(entity.lastLoginAt), "MMM dd, yyyy HH:mm") : "Never" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-100/50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">{item.label}</span>
                      <div className="text-sm font-medium mt-1 flex items-center gap-2">
                        {item.status !== undefined && item.status && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-5" />
                <h1 className="font-bold mb-3">Authorized Officer</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Full Name", value: `${entity.firstName || ''} ${entity.lastName || ''}`.trim() || "N/A" },
                    { label: "Email", value: entity.email },
                    { label: "Phone Number", value: entity.phoneNumber || "N/A" },
                    { label: "Identity Type", value: entity.identityType || "N/A" },
                    { label: "Identity Number", value: entity.identityNumber || "N/A" },
                    { label: "Nationality", value: entity.nationality || "N/A" },
                    { label: "Gender", value: entity.gender || "N/A" },
                    { label: "Date of Birth", value: entity.dob ? format(new Date(entity.dob), "MMM dd, yyyy") : "N/A" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-100/50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">{item.label}</span>
                      <div className="text-sm font-medium mt-1 flex items-center gap-2">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </TabsContent>

          {/* --- Tab 2: Activity Log --- */}
          <TabsContent value="activity-log" className="space-y-4 p-4">
            <div className="flex justify-between items-center">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search logs..." className="pl-10" />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-16">S/N</TableHead>
                    <TableHead>Activity Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Performed By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                      Activity log not available yet
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* --- Tab 3: Filing History --- */}
          <TabsContent value="filing-history" className="p-4">
            <div className="border-gray-200 shadow-none overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-sm">Recent Filings</span>
                <Button variant="ghost" size="sm" className="text-emerald-700">View All</Button>
              </div>
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Filing Type</TableHead>
                    <TableHead>Filed By</TableHead>
                    <TableHead>Filing Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                      Filing history not available yet
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* --- Tab 4: Other Admins --- */}
          <TabsContent value="other-admins" className="p-4">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">S/N</TableHead>
                  <TableHead className="font-semibold text-gray-700">Name & Email</TableHead>
                  <TableHead className="font-semibold text-gray-700">Role</TableHead>
                  <TableHead className="font-semibold text-gray-700">Companies</TableHead>
                  <TableHead className="font-semibold text-gray-700">Total Filings</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    Other admins data not available yet
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  )
}