"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ArrowLeft, File, Eye, Search, Bell, Zap, Bot, Check, CheckCircle, CircleAlert, AlertCircle, X } from "lucide-react"
import { Input } from "../ui/input"

interface ApplicationDetailsProps {
  applicationId: string
  type: "consent" | "reservation"
}

export function ApplicationDetails({ applicationId, type }: ApplicationDetailsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("business-info")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const pageTitle = "Post Incorporation Activity Review"

  const [modalType, setModalType] = useState<"override" | "approve" | "reject" | null>(null)
  const [reason, setReason] = useState("")

  const closeModal = () => {
    setModalType(null)
    setReason("")
  }

  const handleAction = () => {
    console.log(`Action: ${modalType}, Reason: ${reason}`)
    // Add your API call logic here
    closeModal()
  }

  // Configuration for different modal states
  const modalConfig = {
    override: {
      title: "Override AI Recommendation",
      titleColor: "text-red-600",
      description: "You are about to override an AI recommendation. This action will be logged and requires a reason.",
      buttonClass: "bg-red-500 hover:bg-red-600",
      buttonLabel: "Confirm Override",
      icon: <AlertCircle className="h-6 w-6 text-red-600" />
    },
    approve: {
      title: "Approve Application",
      titleColor: "text-green-600",
      description: "Are you sure you want to approve this filing? This will update the entity records.",
      buttonClass: "bg-green-600 hover:bg-green-700",
      buttonLabel: "Approve Filing",
      icon: <CheckCircle className="h-6 w-6 text-green-600" />
    },
    reject: {
      title: "Reject Application",
      titleColor: "text-red-600",
      description: "Please provide a reason for rejecting this application. The applicant will be notified.",
      buttonClass: "bg-red-600 hover:bg-red-700",
      buttonLabel: "Confirm Rejection",
      icon: <X className="h-6 w-6 text-red-600" />
    }
  }

  const currentModal = modalType ? modalConfig[modalType] : null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      </div>

      <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
        <header className="border-b bg-white">
          <div className="flex h-20 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
              <p className="text-sm text-gray-500">Manage post-incorporation activities for registered entities</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search" className="pl-10" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-4">
              <Button variant="outline" size="sm" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Proposed Name Card */}
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <File className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Business Name</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Status: Approved
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          Activity: Annual Returns Filling
                        </Badge>
                      </div>
                      <h2 className="text-xl font-bold text-foreground">FEDERAL BANK OF NIGERIA LIMITED</h2>
                      <p className="text-sm text-muted-foreground mt-1">Approved On: Nov 15, 2025 09:49AM</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                      <p className="text-lg font-semibold text-foreground">AV-2018-09</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                      <p className="text-lg font-semibold text-foreground">Nov 15, 2025 09:45AM</p>
                    </div>
                  </div>
                </Card>

                {/* Applicant Details Card */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-6 text-foreground">Applicant Details</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Nam</p>
                      <p className="text-foreground">John Doe</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Email Address</p>
                      <p className="text-foreground">jdoe@gmail.com</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Phone Number</p>
                      <p className="text-foreground">09065342516</p>
                    </div>
                  </div>
                </Card>

                {/* Tabs Section */}
                <Card>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full p-4">
                    <TabsList className="flex gap-2 rounded-lg bg-gray-100 p-1">
                      <TabsTrigger
                        value="business-info"
                        className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                      >
                        Business Information
                      </TabsTrigger>
                      <TabsTrigger
                        value="uploads"
                        className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                      >
                        Uploads
                      </TabsTrigger>
                      <TabsTrigger
                        value="payment"
                        className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                      >
                        Payment History
                      </TabsTrigger>
                      <TabsTrigger
                        value="logs"
                        className="cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                      >
                        Logs
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="business-info" className="p-6 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-foreground">Business Details</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Business Classification</p>
                            <p className="text-foreground">Business Name (sole proprietorship or partnership)</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Business Types</p>
                            <p className="text-foreground">Sole Proprietor</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Nature of Business Category</p>
                            <p className="text-foreground">Real Estates</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Specific Nature of Business</p>
                            <p className="text-foreground">Estate Agency</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border pt-6">
                        <h4 className="font-semibold mb-4 text-foreground">Principal Place of Business</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Nature of Business Category</p>
                            <p className="text-foreground">Real Estates</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Specific Nature of Business</p>
                            <p className="text-foreground">Estate Agency</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border pt-6">
                        <h4 className="font-semibold mb-4 text-foreground">Particulars of Proprietor</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Nature of Business Category</p>
                            <p className="text-foreground">Real Estates</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Specific Nature of Business</p>
                            <p className="text-foreground">Estate Agency</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border pt-6">
                        <h4 className="font-semibold mb-4 text-foreground">Nature of Business</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Nature of Business Category</p>
                            <p className="text-foreground">Real Estates</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Specific Nature of Business</p>
                            <p className="text-foreground">Estate Agency</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="uploads" className="p-6 space-y-4">
                      <h4 className="font-semibold mb-4 text-foreground">Documents</h4>
                      <div className="space-y-3">
                        {[
                          { name: "National ID.pdf", size: "200 kB" },
                          { name: "Driver License.pdf", size: "200 kB" },
                          { name: "Directors Consent.pdf", size: "200 kB" },
                          { name: "Proof of Address.pdf", size: "200 kB" },
                        ].map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-secondary"
                          >
                            <div className="flex items-center gap-3">
                              <File className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-foreground">{doc.name}</p>
                                <p className="text-sm text-muted-foreground">{doc.size}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">
                              Click to view
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="payment" className="p-6 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-foreground">Payment History</h4>
                        <div className="grid grid-cols-2 gap-6 border border-border rounded-lg p-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Amount Paid</p>
                            <p className="text-lg font-semibold text-foreground">N500.00</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4 gap-2 bg-transparent">
                          <Eye className="h-4 w-4" />
                          View Receipt
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="logs" className="p-6 space-y-4">
                      <h4 className="font-semibold mb-4 text-foreground">Activity Logs</h4>
                      <div className="space-y-4">
                        {[
                          { event: "AI Analysis Completed", date: "Nov, 5 2025 at 09:35AM", color: "bg-green-500" },
                          { event: "Application Submitted", date: "Nov, 5 2025 at 09:34AM", color: "bg-orange-500" },
                        ].map((log, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className={`h-3 w-3 rounded-full ${log.color}`} />
                            <div>
                              <p className="font-medium text-foreground">{log.event}</p>
                              <p className="text-sm text-muted-foreground">{log.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>

                {/* Admin Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Admin Actions</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="text-primary border-primary bg-transparent"
                      onClick={() => setModalType("override")}
                    >
                      Override AI Decisions
                    </Button>
                    <Button
                      variant="outline"
                      className="text-muted-foreground"
                      onClick={() => setModalType("approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="text-muted-foreground"
                      onClick={() => setModalType("reject")}
                    >
                      Reject
                    </Button>

                    {/* <Button variant="default" className="text-white border-primary bg-primary cursor-pointer">
                      Request Documents
                    </Button> */}
                  </div>


                </Card>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* AI Analysis Card */}
                <Card className="border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-foreground">AI Analysis</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-800 mb-2">AI: Recommended for Approval</Badge>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-white p-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Confidence Score</p>
                      <p className="text-2xl font-bold text-foreground">90%</p>
                      <p className="text-xs text-green-600">High Confidence</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-600">Documents Verifications</h4>
                      <div className="space-y-2">
                        {["Audited Financial Statements", "Directors Report", "Tax Clearance Certificate", "Board Resolution"].map((item, idx) => (
                          <div key={idx} className="rounded-lg bg-white p-3 text-sm">
                            <div className="flex justify-between">
                              <p>{item}</p>
                              <span className="text-green-600 flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3" /> Verified</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-600">Compliance Checks</h4>
                      <div className="space-y-2">
                        {["Business Name Active", "No Outstanding Fees", "Proprietor Identity Verified", "New Address Verification", "Payment of ₦60,000.00"].map((item, idx) => (
                          <div key={idx} className="rounded-lg bg-white p-3 text-sm">
                            <div className="flex justify-between">
                              <p>{item}</p>
                              <span className="text-green-600 flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3" /></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </Card>

                {/* Why AI Recommended */}
                <Card className="border-green-200 bg-green-50 p-4">
                  <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Bot className="h-5 w-5 text-green-600" />
                    Why AI Recommended Approval
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "All required documents submitted and verified",
                      "Entity registration is valid and active",
                      "Activity type is appropriate for this entity type",
                    ].map((reason, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-foreground">{reason}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-green-200">
                    <CircleAlert className="h-4 w-4 text-green-600 inline mr-1" /> This Recommendation Was Generated Using CAC AI Review Engine.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Dialog open={!!modalType} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
            {currentModal && (
              <>
                {/* Top Warning Banner (Matching your image) */}
                <div className={`${modalType === 'approve' ? 'bg-green-50' : 'bg-red-50'} p-6 border-b`}>
                  <div className="flex items-center gap-3">
                    {currentModal.icon}
                    <DialogTitle className={`text-xl font-bold ${currentModal.titleColor}`}>
                      {currentModal.title}
                    </DialogTitle>
                  </div>
                  <p className={`mt-2 text-sm ${modalType === 'approve' ? 'text-green-700' : 'text-red-600'}`}>
                    {currentModal.description}
                  </p>
                </div>

                {/* Input Area */}
                <div className="p-6">
                  <label className="text-sm font-bold text-gray-700 block mb-2">
                    Reason for {modalType ? modalType.charAt(0).toUpperCase() + modalType.slice(1) : ''}
                  </label>
                  <Textarea
                    placeholder={`Please provide a detailed reason for ${modalType}...`}
                    className="min-h-[120px] bg-white border-gray-300"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <p className="mt-4 text-xs text-gray-500 italic">
                    This action will be recorded in the audit logs with your user identity and timestamp.
                  </p>
                </div>

                {/* Actions */}
                <DialogFooter className="p-6 pt-0 flex justify-end gap-3">
                  <Button variant="outline" onClick={closeModal} className="border-green-600 text-green-700 hover:bg-green-50 px-8">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAction}
                    className={`${currentModal.buttonClass} text-white px-8`}
                    disabled={!reason && modalType !== 'approve'} // Require reason for override/reject
                  >
                    {currentModal.buttonLabel}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}
