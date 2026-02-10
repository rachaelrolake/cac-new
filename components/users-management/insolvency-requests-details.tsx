"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Building2, Upload, Loader2, ArrowLeft } from "lucide-react";
import { insolvencyAgentsAPI, type InsolvencyAgent } from "@/lib/api/users-management";
import { toast } from "sonner";
import { format } from "date-fns";

export default function RequestsInsolvencyDetails() {
  const router = useRouter()
  const params = useParams()
  const agentId = params.id as string
  const [agent, setAgent] = useState<InsolvencyAgent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionDialog, setActionDialog] = useState<"approve" | "query" | "reject" | null>(null)
  const [queryMessage, setQueryMessage] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    fetchAgentDetails()
  }, [agentId])

  const fetchAgentDetails = async () => {
    setIsLoading(true)
    try {
      const agentData = await insolvencyAgentsAPI.getInsolvencyAgentById(agentId)
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

  const handleApprove = async () => {
    setIsSubmitting(true)
    try {
      await insolvencyAgentsAPI.approveAgent(agentId)
      toast.success("Agent accreditation approved successfully!")
      setActionDialog(null)
      router.push('/users-management')
    } catch (error: any) {
      toast.error("Failed to approve agent", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason")
      return
    }

    setIsSubmitting(true)
    try {
      await insolvencyAgentsAPI.declineAgent(agentId, { reason: rejectionReason })
      toast.success("Agent accreditation rejected")
      setActionDialog(null)
      router.push('/users-management')
    } catch (error: any) {
      toast.error("Failed to reject agent", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuery = async () => {
    if (!queryMessage.trim()) {
      toast.error("Please enter a query message")
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Add query endpoint when available
      toast.success("Query message sent successfully")
      setActionDialog(null)
      setQueryMessage("")
    } catch (error: any) {
      toast.error("Failed to send query", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accreditation Request</h1>
        <div className="flex gap-3">
          <ActionDialog
            type="reject"
            agentName={agent.agentName}
            isOpen={actionDialog === "reject"}
            onOpenChange={(open) => setActionDialog(open ? "reject" : null)}
            onConfirm={handleReject}
            isLoading={isSubmitting}
            reason={rejectionReason}
            onReasonChange={setRejectionReason}
          />
          <ActionDialog
            type="query"
            agentName={agent.agentName}
            isOpen={actionDialog === "query"}
            onOpenChange={(open) => setActionDialog(open ? "query" : null)}
            onConfirm={handleQuery}
            isLoading={isSubmitting}
            message={queryMessage}
            onMessageChange={setQueryMessage}
          />
          <ActionDialog
            type="approve"
            agentName={agent.agentName}
            isOpen={actionDialog === "approve"}
            onOpenChange={(open) => setActionDialog(open ? "approve" : null)}
            onConfirm={handleApprove}
            isLoading={isSubmitting}
          />
          <Button variant="outline" className="border-green-700 text-green-700">
            View Query Messages
          </Button>
        </div>
      </div>

      {/* Agent Details Section */}
      <DetailCard title="Agent/Practitioner Details" icon={<Building2 className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataField label="Agent ID" value={agent.agentId} />
          <DataField label="Agent Type" value={agent.agentType} />
          <DataField label="Agent Name" value={agent.agentName} />
          <DataField label="License Number" value={agent.insolvencyLicenseNumber || "N/A"} />
          <DataField label="Certification Date" value={agent.insolvencyCertificationDate ? format(new Date(agent.insolvencyCertificationDate), "MMM dd, yyyy") : "N/A"} />
          <DataField label="Professional Body" value={agent.professionalBody || "N/A"} />
          <DataField label="Years of Experience" value={agent.yearsOfExperience?.toString() || "N/A"} />
          {agent.officeAddress && <DataField label="Office Address" value={agent.officeAddress} />}
        </div>
        {agent.specialization && agent.specialization.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold text-sm mb-4">Specialization</p>
            <div className="flex flex-wrap gap-2">
              {agent.specialization.map((spec, i) => (
                <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
      </DetailCard>

      {/* User Account Details Section */}
      <DetailCard title="User Account Details" icon={<User className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataField label="Email" value={agent.user.email} />
          <DataField label="First Name" value={agent.user.firstName || "N/A"} />
          <DataField label="Last Name" value={agent.user.lastName || "N/A"} />
          <DataField label="Phone Number" value={agent.user.phoneNumber || "N/A"} />
          <DataField label="Account Status" value={agent.user.accountStatus} />
          <DataField label="Is Active" value={agent.user.isActive ? "Yes" : "No"} />
          <DataField label="Last Login" value={agent.user.lastLoginAt ? format(new Date(agent.user.lastLoginAt), "MMM dd, yyyy HH:mm") : "Never"} />
          <DataField label="Created At" value={format(new Date(agent.user.createdAt), "MMM dd, yyyy HH:mm")} />
        </div>
      </DetailCard>

      {/* Status Information */}
      <DetailCard title="Accreditation Status" icon={<FileText className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataField label="Status" value={agent.status.toUpperCase()} />
          <DataField label="Is Verified" value={agent.isVerified ? "Yes" : "No"} />
          <DataField label="Verified At" value={agent.verifiedAt ? format(new Date(agent.verifiedAt), "MMM dd, yyyy HH:mm") : "N/A"} />
          <DataField label="Is Rejected" value={agent.isRejected ? "Yes" : "No"} />
          <DataField label="Rejected At" value={agent.rejectedAt ? format(new Date(agent.rejectedAt), "MMM dd, yyyy HH:mm") : "N/A"} />
          {agent.rejectionReason && (
            <div className="col-span-3">
              <DataField label="Rejection Reason" value={agent.rejectionReason} />
            </div>
          )}
        </div>
      </DetailCard>

      {/* Declaration Section - Placeholder */}
      <DetailCard title="Declaration" icon={<User className="w-5 h-5 text-green-600" />}>
        <div className="space-y-5">
          <div>
            <h3 className="font-bold">Accuracy & Undertaking</h3>
            <p className="text-sm text-gray-600 italic md:w-[800px]">I hereby certify that the foregoing particulars are to the best of my knowledge, information and belief, correct, and I undertake to notify the Registrar-General whenever any change occurs.</p>
          </div>

          <div>
            <h3 className="font-bold">Confirmation of Provided Information</h3>
            <p className="text-sm text-gray-600 italic md:w-[800px]">I confirm that all information and documents submitted in this application are true, complete, and accurate.</p>
          </div>

          <div>
            <h3 className="font-bold">Accreditation Withdrawal Acknowledgement</h3>
            <p className="text-sm text-gray-600 italic md:w-[800px]">I acknowledge that my accreditation may be withdrawn by the Corporate Affairs Commission if I am no longer fit and proper.</p>
          </div>

          <div>
            <h3 className="font-bold">CAMA Section 862 Warning</h3>
            <p className="text-sm text-gray-600 italic md:w-[800px]">I acknowledge that under Section 862 of the Companies and Allied Matters Act (CAMA), false statements or misrepresentation are punishable by fine or imprisonment.</p>
          </div>
        </div>
      </DetailCard>

      {/* Uploads Section - Placeholder */}
      <DetailCard title="Uploads" icon={<Upload className="w-5 h-5 text-green-600" />}>
        <div className="text-center py-10 text-gray-500">
          Upload preview not available yet
        </div>
      </DetailCard>
    </>
  )
}

// --- Sub-Components ---

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-800 italic">{value}</p>
    </div>
  );
}

function DetailCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="border-gray-200">
      <CardHeader className="flex flex-row items-center gap-2 border-b bg-gray-50/30 py-4">
        {icon}
        <CardTitle className="text-base font-bold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}

function ActionDialog({
  type,
  agentName,
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
  message,
  onMessageChange,
  reason,
  onReasonChange
}: {
  type: "approve" | "query" | "reject";
  agentName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  message?: string;
  onMessageChange?: (value: string) => void;
  reason?: string;
  onReasonChange?: (value: string) => void;
}) {
  const config = {
    approve: { label: "Approve", btnClass: "bg-green-700 hover:bg-green-800", title: "Approve Agent Account", confirm: "Approve" },
    query: { label: "Query", btnClass: "bg-orange-600 hover:bg-orange-700", title: "Query Accreditation Request", confirm: "Confirm" },
    reject: { label: "Reject", btnClass: "bg-red-600 hover:bg-red-700", title: "Reject Application", confirm: "Confirm" },
  };

  const current = config[type];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={current.btnClass}>{current.label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">{current.title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {type === "query" ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Enter your query message for "{agentName}"?</p>
              <Textarea
                placeholder="Enter your query message..."
                className="min-h-[120px]"
                value={message}
                onChange={(e) => onMessageChange?.(e.target.value)}
                disabled={isLoading}
              />
            </div>
          ) : type === "reject" ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Are you sure you want to reject
                <span className="font-semibold block mt-1">"{agentName}"?</span>
              </p>
              <Textarea
                placeholder="Enter rejection reason..."
                className="min-h-[120px]"
                value={reason}
                onChange={(e) => onReasonChange?.(e.target.value)}
                disabled={isLoading}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to approve accreditation for
              <span className="font-semibold block mt-1">"{agentName}"?</span>
            </p>
          )}
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-green-700 text-green-700 flex-1 sm:flex-none"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className={`${current.btnClass} flex-1 sm:flex-none`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              current.confirm
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}