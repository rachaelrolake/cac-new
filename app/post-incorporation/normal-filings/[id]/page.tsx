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

          {/* Company Details */}
          <Collapsible open={openSections.company} onOpenChange={() => toggleSection('company')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Company Details</CardTitle>
                    </div>
                    {openSections.company ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Company Name</p>
                      <p className="font-medium">TechVista Solutions Limited</p>
                    </div>
                    <div>
                      <p className="text-gray-500">RC Number</p>
                      <p className="font-medium">1234567890</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Details of Person who Appointed */}
          <Collapsible open={openSections.personDetails} onOpenChange={() => toggleSection('personDetails')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Details of the Person who Appointed or Obtained an Order to Appoint an Administrator, Receiver, Manager or Supervisor</CardTitle>
                    </div>
                    {openSections.personDetails ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-sm font-medium text-gray-700 mb-3">Personal Information</p>
                  <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p className="font-medium">Basheer Madu</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone number</p>
                      <p className="font-medium">07121387621 3</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">abujabank@example.com</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Number/Building Name</p>
                      <p className="font-medium">12</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Street Name</p>
                      <p className="font-medium">One Way Street</p>
                    </div>
                    <div>
                      <p className="text-gray-500">City/Town/Village</p>
                      <p className="font-medium">abujabank@example.com</p>
                    </div>
                    <div>
                      <p className="text-gray-500">LGA</p>
                      <p className="font-medium">Nassarawa</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Identity Type</p>
                      <p className="font-medium">National Identity</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Identity Number</p>
                      <p className="font-medium">1234567890</p>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 border rounded-lg p-3 w-fit">
                        <FileText className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Nationalid.pdf</p>
                          <p className="text-xs text-gray-500">200 KB</p>
                          <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3 mt-6">Date of Appointment</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Appointment Date</p>
                      <p className="font-medium">12/12/2025</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Appointment Type</p>
                      <p className="font-medium">Administrator</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3 mt-6">Details of Appointment</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Appointment Date</p>
                      <p className="font-medium">12/12/2025</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Mode of appointment</p>
                      <p className="font-medium">Under the powers contained in the instrument</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Statutory Declaration */}
          <Collapsible open={openSections.statutory} onOpenChange={() => toggleSection('statutory')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Statutory Declaration (Pursuant to Section 455(2), CAMA Part B</CardTitle>
                    </div>
                    {openSections.statutory ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Holder Name</p>
                      <p className="font-medium">Madu Gbenu</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Holder Capacity</p>
                      <p className="font-medium">Administrator</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Holder Address</p>
                      <p className="font-medium">123 Qtrs, Maitama</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">i</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Declaration</p>
                        <p className="text-sm text-gray-700">
                          WE <strong>Madu Gbenu</strong> of <strong>123 Qtrs, Maitama</strong> being the <strong>Administrator</strong> do solemnly and sincerely declare:
                        </p>
                        <ol className="text-sm text-gray-700 mt-2 space-y-1 list-decimal list-inside">
                          <li>That we hold floating charge in respect of the Company's property.</li>
                          <li>That each floating charge is enforceable on the date of the appointment.</li>
                          <li>That consents of holders of prior floating charges have been obtained where applicable.</li>
                          <li>That the appointment is in accordance with Chapter 17 and other general provisions of the Companies and Allied Matters Act.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Declared at</p>
                      <p className="font-medium">Court of Appeal Kano</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date of Declaration</p>
                      <p className="font-medium">12/02/2025</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Commissioner for Oaths / Notary Public</p>
                      <p className="font-medium">Adamu Garba</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 border rounded-lg p-3 w-fit">
                        <FileText className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Signature.pdf</p>
                          <p className="text-xs text-gray-500">200 KB</p>
                          <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Statement by Administrator */}
          <Collapsible open={openSections.statement} onOpenChange={() => toggleSection('statement')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Statement by Administrator (Pursuant to Section 455(3), CAMA Part C</CardTitle>
                    </div>
                    {openSections.statement ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Administrator Name(s)</p>
                      <p className="font-medium">Adamu Danjuma</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Company/Entity Name</p>
                      <p className="font-medium">Dangote Industries</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">i</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Statement</p>
                        <p className="text-sm text-gray-700">
                          I(we), <strong>Adamu Danjuma</strong>, consent to my(our) appointment as Administrator(s) in respect of <strong>Dangote Industries</strong>.
                          That in my(our) opinion the purpose of administration is likely to be achieved.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Phone number</p>
                      <p className="font-medium">09123392123</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">adamu@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border rounded-lg p-3 w-fit">
                    <FileText className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Signature.pdf</p>
                      <p className="text-xs text-gray-500">200 KB</p>
                      <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Authentication */}
          <Collapsible open={openSections.authentication} onOpenChange={() => toggleSection('authentication')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Authentication</CardTitle>
                    </div>
                    {openSections.authentication ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Declarant Name</p>
                      <p className="font-medium">Basheer Madu</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Position</p>
                      <p className="font-medium">Director</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date of Declaration</p>
                      <p className="font-medium">12/12/2025</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Signature</p>
                      <div className="flex items-center gap-3 border rounded-lg p-3 w-fit mt-1">
                        <FileText className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Signature.pdf</p>
                          <p className="text-xs text-gray-500">200 KB</p>
                          <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Presenter */}
          <Collapsible open={openSections.presenter} onOpenChange={() => toggleSection('presenter')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Presenter</CardTitle>
                    </div>
                    {openSections.presenter ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Presenter Name</p>
                      <p className="font-medium">Sarah Okafor</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email Address</p>
                      <p className="font-medium">sarah@example.com</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone Number</p>
                      <p className="font-medium">09140912345</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Accreditation Number</p>
                      <p className="font-medium">Age/14091234 5</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
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