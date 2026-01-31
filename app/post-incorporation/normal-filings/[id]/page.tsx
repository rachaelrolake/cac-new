"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, User, Calendar, Briefcase, Info, Clock, AlertCircle, ChevronLeft, CheckCircle2, FileText, Building2, Upload, ChevronUp, ChevronDown, Scale, ShieldCheck, UserCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link"
import { useState, useEffect, use } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    filingType: "Annual Returns Filing",
    applicants: "John Doe",
    applicantsType: "Entity Admin",
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
    filingType: "Notice of Change in Address, Email or Phone Number",
    applicants: "Ahmed Hassan",
    applicantsType: "Entity Admin",
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
    filingType: "Increase in Share Capital",
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
    filingType: "Filing of Financial Statements",
    applicants: "Michael Chen",
    applicantsType: "Entity Admin",
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
    filingType: "Change of Directors",
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
    filingType: "Change of Company Name",
    applicants: "Grace Eze",
    applicantsType: "Entity Admin",
  }
]

export default function NormalFilingsDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({
    company: true,
    personDetails: true,
    statutory: true,
    statement: true,
    authentication: true,
    presenter: true,
  });

  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [queryDetailsOpen, setQueryDetailsOpen] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <PageHeader title="Appointment of Receiver/Manager/Administrator" />

      <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800 pt-24">
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="lg"
          className="mb-3"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back</span>
        </Button>

        <div className="max-w-5xl mx-auto p-6">
          {/* Header Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Appointment Details</CardTitle>
              <div className="flex gap-2">
                <Button variant="destructive" size="xl" onClick={() => setRejectModalOpen(true)}>
                  Reject
                </Button>
                <Button size="xl" className="bg-amber-500 hover:bg-amber-600" onClick={() => setQueryModalOpen(true)}>
                  Query
                </Button>
                <Button size="xl" className="bg-green-600 hover:bg-green-700" onClick={() => setApproveModalOpen(true)}>
                  Approve
                </Button>
                <Button variant="outline" size="xl">
                  View Query Messages
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Application Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Application Details</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Case Type</p>
                    <p className="font-medium">Appointment of Receiver/Manager/ Administrator</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <Badge className="bg-amber-100 text-amber-700 border-0">Pending</Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Submission Date</p>
                    <p className="font-medium">2026-01-13 08:30</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Applicant Name</p>
                    <p className="font-medium">John Adebayo</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Applicant Type</p>
                    <p className="font-medium">Insolvency Practitioner</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Accreditation Number</p>
                    <p className="font-medium">AG-001234</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </div>

        {/* Modals */}
        <QueryModal
          open={queryModalOpen}
          onClose={() => setQueryModalOpen(false)}
          applicantName="John Adebayo"
          applicationName="TechVista Solutions Limited"
        />
        <RejectModal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          applicationName="TechVista Solutions Limited"
        />
        <ApproveModal
          open={approveModalOpen}
          onClose={() => setApproveModalOpen(false)}
          applicationName="TechVista Solutions Limited"
        />
      </div>
    </div>
  )
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

function QueryModal({ open, onClose, applicantName, applicationName }: {
  open: boolean;
  onClose: () => void;
  applicantName: string;
  applicationName: string;
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

function RejectModal({ open, onClose, applicationName }: { open: boolean; onClose: () => void; applicationName: string }) {
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