"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Briefcase, Info, Badge, Edit2, CheckCircle2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link"
import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const mockApplications = [
  {
    id: 1,
    sn: 1,
    avCode: "AV-2019-01",
    proposedName: "TECH INNOVATIONS NIGERIA LIMITED",
    submitted: "Nov 15, 2025 09:49AM",
    reasonForConsent: "New Incorporation",
    aiDecision: "AI: Recommended Approval",
    status: "Pending",
    sla: "Done",
    entityClassification: "Business Name",
    entityType: "Business Name",
    applicants: "John Doe",
    applicantsType: "Public User",
  },
  {
    id: 2,
    sn: 2,
    avCode: "AV-2019-01",
    proposedName: "GLOBAL PETROLEUM SERVICES LIMITED",
    submitted: "Nov 14, 2025 09:50AM",
    reasonForConsent: "Use Of Restricted Word",
    aiDecision: "AI: Needs Human Review",
    status: "Queried",
    sla: "54d left",
    entityClassification: "Company",
    entityType: "Public Limited by Guarantee",
    applicants: "Ahmed Hassan",
    applicantsType: "Public User",
  },
  {
    id: 3,
    sn: 3,
    avCode: "AV-2019-01",
    proposedName: "SUNRISE VENTURES LIMITED",
    submitted: "Nov 14, 2025 12:09PM",
    reasonForConsent: "Group Holdings/ Consortium",
    aiDecision: "AI: Recommended Approval",
    status: "Pending",
    sla: "54d left",
    entityClassification: "Company",
    entityType: "Private Unlimited",
    applicants: "Mary Johnson",
    applicantsType: "Agent",
  },
  {
    id: 4,
    sn: 4,
    avCode: "AV-2019-01",
    proposedName: "NATIONAL BANK OF COMMERCE LIMITED",
    submitted: "Nov 10, 2025 01:34PM",
    reasonForConsent: "Group Holdings/ consortium",
    aiDecision: "AI: Approved",
    status: "Approved",
    sla: "8d left",
    entityClassification: "Limited Liability Partnership",
    entityType: "Limited Liability Partnership",
    applicants: "Michael Chen",
    applicantsType: "Public User",
  },
  {
    id: 5,
    sn: 5,
    avCode: "AV-2019-01",
    proposedName: "SUNNET AGRO LIMITED",
    submitted: "Nov 14, 2025 05:12AM",
    reasonForConsent: "New Incorporation",
    aiDecision: "AI: Approved",
    status: "Approved",
    sla: "24d left",
    entityClassification: "Limited Partnership",
    entityType: "Limited Partnership",
    applicants: "David Okafor",
    applicantsType: "Agent",
  },
  {
    id: 6,
    sn: 6,
    avCode: "AV-2019-01",
    proposedName: "EDU FURNITURES LIMITED",
    submitted: "Nov 08, 2025 09:12PM",
    reasonForConsent: "New Incorporation",
    aiDecision: "AI: Needs Human Review",
    status: "Approved",
    sla: "54d left",
    entityClassification: "Incorporated Trustee",
    entityType: "Incorporated Trustee",
    applicants: "Grace Eze",
    applicantsType: "Public User",
  }
]

export default function RegistrationViewDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [queryDetailsOpen, setQueryDetailsOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const result = mockApplications.find((app) => app.id === Number(unwrappedParams.id));
        setData(result || null);
        setLoading(false);
      }, 500);
    };

    if (unwrappedParams.id) {
      fetchData();
    }
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-red-500 font-bold">Application not found.</div>;

  return (
    <div>
      <PageHeader title="Name Reservation" />

      <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800 pt-24">
        <Link href="/pre-incorporation">
          <Button
            variant="outline"
            size="lg"
            className="mb-3"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back</span>
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-10">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-lg font-medium">Company Registration</CardTitle>
            <div className="flex gap-2">
              <Button variant="destructive" size="xl" onClick={() => setRejectModalOpen(true)}>
                Reject
              </Button>
              <Button
                variant="default"
                size="xl"
                className="bg-amber-500 hover:bg-amber-600"
                onClick={() => setQueryModalOpen(true)}
              >
                Query
              </Button>
              <Button
                variant="default"
                size="xl"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setApproveModalOpen(true)}
              >
                Approve
              </Button>
              <Button variant="outlineprimary" size="xl" onClick={() => setQueryDetailsOpen(true)}>
                View Query Messages
              </Button>
            </div>
          </CardHeader>

          <div className="p-8">
            <div className="space-y-4">
              <ApplicationStatusSection />
              <CompanyInformationSection />
              <ProposedDirectorsSection />
              <ShareholdersSection />
            </div>


          </div>
        </div>

        {/* Modals */}
        <QueryModal
          open={queryModalOpen}
          onClose={() => setQueryModalOpen(false)}
          applicantName=""
        />
        <RejectModal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
        />
        <ApproveModal
          open={approveModalOpen}
          onClose={() => setApproveModalOpen(false)}
          applicationName=""
        />
      </div>
    </div>
  )
}

function ApplicationStatusSection() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3 border-b mb-4">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Application Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataItem label="Ref Code" value="APP-098-X" />
        <DataItem label="Status" badge="Pending" />
        <DataItem label="Submission Date" value="Jan 12, 2024" />
        <DataItem label="Application Type" value="New Registration" />
        <DataItem label="Assigned Officer" value="John Doe" />
      </CardContent>
    </Card>
  );
}

function ProposedDirectorsSection() {
  const directors = [1, 2]; // Map your data here

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between border-b mb-4">
        <CardTitle className="text-sm font-bold text-emerald-700">Proposed Directors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {directors.map((i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-sm font-bold bg-slate-100 p-2 rounded">Director {i}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <DataItem label="Full Name" value="Jane Smith Doe" />
              <DataItem label="Nationality" value="American" />
              <DataItem label="ID Number" value="987654321" />
              <DataItem label="Email" value="jane@example.com" />
            </div>
            {i < directors.length && <hr className="border-dashed" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CompanyInformationSection() {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-slate-50/50 rounded-t-lg border-b">
        <CardTitle className="text-sm font-bold text-emerald-800 flex items-center gap-2">
          <div className="w-1.5 h-4 bg-emerald-600 rounded-full" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
          <DataItem label="Proposed Name" value="TechNova Solutions LTD" />
          <DataItem label="Business Type" value="Private Limited Company" />
          <DataItem label="Registration Date" value="Not Yet Assigned" />
        </div>

        <Separator className="bg-slate-100" />

        {/* Registered Office Address */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-tight">Registered Office Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
            <DataItem label="Building/Plot No" value="Flat 402, Skyline Towers" />
            <DataItem label="Street Name" value="Avenue 5, Cyber Park" />
            <DataItem label="City/Town" value="Nairobi" />
            <DataItem label="County" value="Nairobi County" />
            <DataItem label="Postal Code" value="00100" />
          </div>
        </div>

        <Separator className="bg-slate-100" />

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">
          <DataItem label="Email Address" value="admin@technova.co.ke" />
          <DataItem label="Phone Number" value="+254 712 345 678" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ShareholdersSection() {
  return (
    <Card className="shadow-none">
      <CardHeader className="py-3 px-4 bg-slate-50/50 border-b">
        <CardTitle className="text-sm font-bold text-emerald-800 flex items-center gap-2">
          <div className="w-1.5 h-4 bg-emerald-600 rounded-full" />
          Shareholders & Share Capital
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0"> {/* Use p-0 to allow table/divs to hit edges if needed */}

        {/* Share Summary Table */}
        <div className="p-6 bg-emerald-50/30">
          <h4 className="text-xs font-bold text-emerald-900 mb-4 uppercase">Class of Shares Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-slate-500">Ordinary Shares</span>
                <span className="font-bold text-slate-900">1,000 Units</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-slate-500">Nominal Value per Share</span>
                <span className="font-bold text-slate-900">KES 100.00</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b pb-2">
                <span className="text-slate-500">Total Nominal Value</span>
                <span className="font-bold text-slate-900">KES 100,000.00</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Individual Shareholder Entries */}
        <div className="p-6 space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  SHAREHOLDER {i}
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DataItem label="Name of Shareholder" value={i === 1 ? "John Mark Spencer" : "Sarah Williams"} />
                <DataItem label="Type" value="Individual" />
                <DataItem label="Shares Held" value={i === 1 ? "600" : "400"} />
                <DataItem label="Ownership %" value={i === 1 ? "60%" : "40%"} />
                <DataItem label="ID/Passport No" value="A1234567" />
                <DataItem label="Postal Address" value="P.O Box 123-00100" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DataItem({ label, value, badge }: { label: string; value?: string; badge?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      {badge ? (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          {badge}
        </Badge>
      ) : (
        <p className="text-sm font-semibold text-slate-900">{value || "—"}</p>
      )}
    </div>
  );
}

// --- Modal Components ---

function ApproveModal({ open, onClose, applicationName }: {
  open: boolean;
  onClose: () => void;
  applicationName: string;
}) {
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    // Handle approval submission
    console.log({ notes });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Approve Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Application Name Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm">
              <span className="font-medium">Application:</span> {applicationName}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="notes" className="text-sm text-gray-500">
                Approval Notes (Optional)
              </Label>
              <button
                type="button"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Get AI Suggestions
              </button>
            </div>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add any notes or special conditions for this approval..."
              className="w-full resize-none font-normal text-sm"
            />
          </div>

          {/* Upon Approval Info */}
          <div className="bg-green-50/50 border border-green-100 rounded-lg p-4">
            <p className="font-medium text-gray-900 text-sm mb-2">Upon approval:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Certificate of Incorporation will be auto-generated
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Status Report will be auto-generated
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Registration number will be assigned
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Applicant will be notified via email
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!applicationName}
            className="bg-gray-200 text-gray-500 hover:bg-green-600 hover:text-white disabled:opacity-50"
          >
            Confirm Approval
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function QueryModal({ open, onClose, applicantName }: {
  open: boolean;
  onClose: () => void;
  applicantName: string;
}) {
  const [reason, setReason] = useState('Additional documentation required from applicant');
  const [message, setMessage] = useState(
    `Dear [Applicant Name],

Your consent application requires additional documentation.

Please submit:

- [List required documents]

Submit all documents within 5 business days to avoid application expiry.

Regards,
CAC Admin`
  );

  const handleConfirm = () => {
    // Handle query submission
    console.log({ reason, message });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Query Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm text-gray-700">
              Reason for query <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for query"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message" className="text-sm text-gray-500">
                Query Message
              </Label>
              <button
                type="button"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Get AI Suggestions
              </button>
            </div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              className="w-full resize-none font-normal text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-100 text-red-700 hover:bg-red-200 border-0"
          >
            Confirm Query
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RejectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirm = () => {
    // Handle rejection submission
    console.log({ reason, message });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Reject Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm text-gray-700">
              Reason for rejection <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="enter reason for rejection"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message" className="text-sm text-gray-500">
                Rejection Message
              </Label>
              <button
                type="button"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Get AI Suggestions
              </button>
            </div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Provide a formal explanation for your decision. This will be sent to the applicant."
              className="w-full resize-none font-normal text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Confirm Rejection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const DetailItem = ({ label, value, className = "" }: { label: string, value: any, className?: string }) => (
  <div>
    <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
    <p className={`text-sm text-gray-500 ${className}`}>{value}</p>
  </div>
);

