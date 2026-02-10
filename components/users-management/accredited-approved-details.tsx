"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, ChevronRight, Download, Filter, Loader2, ArrowLeft } from "lucide-react";
import { UserActionDialog } from "../reusables/action-dialog";
import { accreditedAgentsAPI, type AccreditedAgent } from "@/lib/api/users-management";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ApprovedAccreditedDetails() {
  const router = useRouter()
  const params = useParams()
  const agentId = params.id as string
  const [agent, setAgent] = useState<AccreditedAgent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeDialog, setActiveDialog] = useState<"suspend" | "deactivate" | null>(null)

  useEffect(() => {
    fetchAgentDetails()
  }, [agentId])

  const fetchAgentDetails = async () => {
    setIsLoading(true)
    try {
      const agentData = await accreditedAgentsAPI.getAccreditedAgentById(agentId)
      setAgent(agentData)
    } catch (error: any) {
      toast.error("Failed to load agent details", {
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
      fetchAgentDetails()
    } catch (error: any) {
      toast.error("Failed to update status", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeactivate = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Add deactivate endpoint when available
      toast.success("Agent deactivated successfully")
      setActiveDialog(null)
      router.push('/users-management')
    } catch (error: any) {
      toast.error("Failed to deactivate agent", {
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

  if (!agent) {
    return <div className="text-center py-20">Agent not found</div>
  }

  return (
    <>
      {/* Suspend Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "suspend"}
        onClose={() => setActiveDialog(null)}
        title={agent.user.isActive ? "Suspend user?" : "Activate user?"}
        description={agent.user.isActive ? "Are you sure you want to suspend this user?" : "Are you sure you want to activate this user?"}
        confirmText={agent.user.isActive ? "Suspend User" : "Activate User"}
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
              Other Admins
            </TabsTrigger>
          </TabsList>

          {/* --- Tab 1: User Details --- */}
          <TabsContent value="user-details">
            <div className="border-gray-200 shadow-none">
              <CardHeader className="flex justify-between">
                <CardTitle className="text-base font-semibold">User Details</CardTitle>

                <div className="flex gap-3">
                  {/* <Button
                    variant="outlineprimary"
                    size="lg"
                    onClick={() => setActiveDialog("suspend")}
                    disabled={isSubmitting}
                  >
                    {agent.user.isActive ? "Suspend User" : "Activate User"}
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
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Agent ID", value: agent.agentId },
                    { label: "Account Status", value: agent.user.accountStatus, status: agent.user.isActive },
                    { label: "Name", value: agent.agentName || `${agent.user.firstName || ''} ${agent.user.lastName || ''}`.trim() || "N/A" },
                    { label: "Agent Type", value: agent.agentType },
                    { label: "Email", value: agent.user.email },
                    { label: "Phone", value: agent.user.phoneNumber || "N/A" },
                    { label: "Accreditation Date", value: agent.verifiedAt ? format(new Date(agent.verifiedAt), "MMM dd, yyyy") : "N/A" },
                    { label: "Last Login", value: agent.user.lastLoginAt ? format(new Date(agent.user.lastLoginAt), "MMM dd, yyyy HH:mm") : "Never" },
                    { label: "Professional Body", value: agent.professionalBody || "N/A" },
                    { label: "License Number", value: agent.licenseNumber || "N/A" },
                    { label: "Years of Experience", value: agent.yearsOfExperience?.toString() || "N/A" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-100/50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">{item.label}</span>
                      <div className="text-sm font-medium mt-1 flex items-center gap-2">
                        {item.status !== undefined && <div className={`w-2 h-2 rounded-full ${item.status ? 'bg-emerald-500' : 'bg-rose-500'}`} />}
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {agent.specialization && agent.specialization.length > 0 && (
                  <>
                    <hr className="my-5" />
                    <div className="p-6 bg-gray-100/50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">Specialization</span>
                      <div className="text-sm font-medium mt-2 flex flex-wrap gap-2">
                        {agent.specialization.map((spec, i) => (
                          <Badge key={i} variant="secondary" className="bg-emerald-50 text-emerald-700">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
                    <TableHead>Activity Description</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
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
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Filed By</TableHead>
                    <TableHead className="text-right">Filing Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
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
                  <TableHead className="font-semibold text-gray-700">Officer</TableHead>
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