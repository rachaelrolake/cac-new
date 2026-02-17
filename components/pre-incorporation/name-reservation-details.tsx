"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Calendar, Briefcase, CreditCard, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { reservationsAPI, type ReservationDetail } from "@/lib/api/pre-incorporation"
import { toast } from "sonner"
import { format, differenceInDays } from "date-fns"


// ─── Helpers ──────────────────────────────────────────────────────

const getStatusColors = (status: string) => {
  const s = status?.toLowerCase()
  if (s === "approved") return "bg-green-100 text-green-700"
  if (s === "pending" || s === "pending_review") return "bg-yellow-100 text-yellow-700"
  if (s === "queried") return "bg-orange-100 text-orange-700"
  if (s === "rejected") return "bg-red-100 text-red-700"
  return "bg-gray-100 text-gray-700"
}

const isPending = (status: string) => {
  const s = status?.toLowerCase()
  return s === "pending" || s === "pending_review"
}

const getDaysInfo = (expiryDate: string | null, issueDate: string | null) => {
  if (!expiryDate || !issueDate) return { daysRemaining: null, totalDays: null, percentage: 0, label: "N/A", color: "text-gray-500" }
  const now = new Date()
  const expiry = new Date(expiryDate)
  const issue = new Date(issueDate)
  const totalDays = differenceInDays(expiry, issue)
  const daysRemaining = differenceInDays(expiry, now)
  const percentage = Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100))

  if (daysRemaining < 0) return { daysRemaining, totalDays, percentage: 0, label: "Expired", color: "text-red-600" }
  if (daysRemaining <= 7) return { daysRemaining, totalDays, percentage, label: `${daysRemaining}d left`, color: "text-red-600" }
  return { daysRemaining, totalDays, percentage, label: `${daysRemaining}d left`, color: "text-green-600" }
}

// ─── Component ────────────────────────────────────────────────────

export default function NameReservationViewDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)

  const [data, setData] = useState<ReservationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeDialog, setActiveDialog] = useState<"approve" | "reject" | "query" | null>(null)
  const [dialogReason, setDialogReason] = useState("")

  useEffect(() => {
    if (unwrappedParams.id) fetchData()
  }, [unwrappedParams.id])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await reservationsAPI.getReservationById(unwrappedParams.id)
      setData(result)
    } catch (error: any) {
      toast.error("Failed to load reservation details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoading(false)
    }
  }

  const openDialog = (type: "approve" | "reject" | "query") => {
    setDialogReason("")
    setActiveDialog(type)
  }

  const handleApprove = async () => {
    if (!data) return
    setIsSubmitting(true)
    try {
      await reservationsAPI.approveReservation(data.id)
      toast.success("Reservation approved successfully")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to approve reservation", { description: error.response?.data?.message || "Please try again" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!data) return
    if (!dialogReason.trim()) { toast.error("Please provide a reason"); return }
    setIsSubmitting(true)
    try {
      await reservationsAPI.rejectReservation(data.id, { reason: dialogReason })
      toast.success("Reservation rejected")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to reject reservation", { description: error.response?.data?.message || "Please try again" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuery = async () => {
    if (!data) return
    if (!dialogReason.trim()) { toast.error("Please provide a query message"); return }
    setIsSubmitting(true)
    try {
      await reservationsAPI.queryReservation(data.id, { reason: dialogReason })
      toast.success("Query sent successfully")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to send query", { description: error.response?.data?.message || "Please try again" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Loading ────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  if (!data) return <div className="p-10 text-center text-red-500 font-bold">Reservation not found.</div>

  const daysInfo = getDaysInfo(data.expiryDate, data.issueDate)
  const applicantFullName = `${data.ownedBy.firstName} ${data.ownedBy.lastName}`
  const applicantRole = data.ownedBy.roles?.[0] || "N/A"

  return (
    <div>
      <PageHeader title="Name Reservation" />

      {/* Dialogs */}
      <Dialog open={activeDialog === "approve"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Approve Reservation</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 py-4">
            Are you sure you want to approve the reservation for <span className="font-semibold">"{data.businessName}"</span>?
          </p>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={handleApprove} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "reject"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Reject Reservation</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-gray-500">Provide a reason for rejecting <span className="font-semibold">"{data.businessName}"</span>.</p>
            <Textarea placeholder="Enter rejection reason..." className="min-h-[120px]" value={dialogReason} onChange={(e) => setDialogReason(e.target.value)} disabled={isSubmitting} />
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleReject} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "query"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Query Reservation</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <p className="text-sm text-gray-500">Enter your query message for <span className="font-semibold">"{data.businessName}"</span>.</p>
            <Textarea placeholder="Enter query message..." className="min-h-[120px]" value={dialogReason} onChange={(e) => setDialogReason(e.target.value)} disabled={isSubmitting} />
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleQuery} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Send Query"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main content */}
      <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800 pt-24">
        <Link href="/pre-incorporation">
          <Button variant="outline" size="lg" className="mb-3">
            <ArrowLeft size={18} />
            <span className="font-medium">Back</span>
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">

            {/* Header + Action Buttons */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-xl font-bold text-slate-800">Reservation Details</h1>
                <p className="text-sm text-gray-500 mt-1">{data.avCode}</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                {isPending(data.status) && (
                  <>
                    <Button variant="destructive" size="xl" onClick={() => openDialog("reject")} disabled={isSubmitting}>
                      Reject
                    </Button>
                    <Button size="xl" className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => openDialog("query")} disabled={isSubmitting}>
                      Query
                    </Button>
                    <Button size="xl" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => openDialog("approve")} disabled={isSubmitting}>
                      Approve
                    </Button>
                  </>
                )}
                <Button variant="outline" size="xl">View Query Messages</Button>
              </div>
            </div>

            {/* Section 1: Application Details */}
            <div className="mb-6 border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-700 border-b pb-4">
                <User size={20} className="text-green-600" />
                <h2 className="font-bold">Application Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8">
                <DetailItem label="AV Code" value={data.avCode} />
                <DetailItem
                  label="Status"
                  value={
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColors(data.status)}`}>
                      {data.status}
                    </span>
                  }
                />
                <DetailItem label="Submission Date" value={format(new Date(data.createdAt), "MMM dd, yyyy HH:mm")} />
                <DetailItem
                  label="Issue Date"
                  value={data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy HH:mm") : "N/A"}
                />
                <DetailItem
                  label="Expiry Date"
                  value={data.expiryDate ? format(new Date(data.expiryDate), "MMM dd, yyyy HH:mm") : "N/A"}
                />
                <DetailItem label="Application Type" value={data.applicationType.name} />
                <DetailItem label="Application Code" value={data.applicationType.code} />
                <DetailItem label="Fee" value={`${data.applicationType.currency} ${parseFloat(data.applicationType.price).toLocaleString()}`} />
              </div>
            </div>

            {/* Section 2: Applicant Information */}
            <div className="mb-6 border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-700 border-b pb-4">
                <User size={20} className="text-green-600" />
                <h2 className="font-bold">Applicant Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8">
                <DetailItem label="Full Name" value={applicantFullName} />
                <DetailItem label="Applicant Type" value={applicantRole} />
                <DetailItem label="Email Address" value={data.ownedBy.email} />
                <DetailItem label="Phone Number" value={data.ownedBy.phoneNumber || "N/A"} />
                <DetailItem label="Account Status" value={data.ownedBy.accountStatus} />
                <DetailItem
                  label="Last Login"
                  value={data.ownedBy.lastLoginAt ? format(new Date(data.ownedBy.lastLoginAt), "MMM dd, yyyy HH:mm") : "Never"}
                />
              </div>
            </div>

            {/* Section 3: Entity Information */}
            <div className="mb-6 border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-700 border-b pb-4">
                <Briefcase size={20} className="text-green-600" />
                <h2 className="font-bold">Entity Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8">
                <DetailItem label="Business Classification" value={data.businessType.businessClassification.name} />
                <DetailItem label="Business Type" value={data.businessType.name} />
                <DetailItem label="Requires Consent" value={data.businessType.requiresConsent ? "Yes" : "No"} />
                <DetailItem label="Primary Name" value={data.businessName} className="font-semibold text-gray-800" />
                {data.proposedName2 && <DetailItem label="Alternative Name 1" value={data.proposedName2} />}
                {data.proposedName3 && <DetailItem label="Alternative Name 2" value={data.proposedName3} />}
                <DetailItem label="Contact Email" value={data.email} />
                <DetailItem
                  label="Business Commencement Date"
                  value={data.businessCommencementDate ? format(new Date(data.businessCommencementDate), "MMM dd, yyyy") : "N/A"}
                />
              </div>
            </div>

            {/* Section 4: Availability Code Information */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-blue-900">
                <Calendar size={20} />
                <h2 className="font-bold">Availability Code Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 mb-8">
                <DetailItem label="AV Code" value={data.avCode} />
                <DetailItem
                  label="Issue Date"
                  value={data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : "N/A"}
                />
                <DetailItem
                  label="Expiry Date"
                  value={data.expiryDate ? format(new Date(data.expiryDate), "MMM dd, yyyy") : "N/A"}
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-gray-700">Time Remaining</p>
                  <p className={`text-sm font-bold ${daysInfo.color}`}>{daysInfo.label}</p>
                </div>
                <div className="w-full bg-green-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${daysInfo.daysRemaining !== null && daysInfo.daysRemaining <= 7 ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${daysInfo.percentage}%` }}
                  />
                </div>
                {daysInfo.daysRemaining !== null && (
                  <p className="text-xs text-gray-400 text-right">
                    {daysInfo.daysRemaining > 0
                      ? `${daysInfo.daysRemaining} of ${daysInfo.totalDays} days remaining`
                      : "This reservation has expired"}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────

const DetailItem = ({ label, value, className = "" }: { label: string; value: any; className?: string }) => (
  <div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <div className={`text-sm text-gray-700 ${className}`}>{value ?? "N/A"}</div>
  </div>
)