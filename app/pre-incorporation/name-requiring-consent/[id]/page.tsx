"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, User, Calendar, Briefcase, Info, Clock, AlertCircle, ChevronLeft, CheckCircle2, FileText, Building2, Upload } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link"
import { useState, useEffect, use } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProposedName {
  name: string;
  type: 'primary' | 'alternative';
  verified: boolean;
}

interface Proprietor {
  id: number;
  surname: string;
  firstName: string;
  otherName?: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  occupation: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  lga: string;
  city: string;
  houseNumber: string;
  streetName: string;
  meansOfId: string;
  idNumber: string;
}

interface BusinessNature {
  id: number;
  category: string;
  specific: string;
  description: string;
}

interface Document {
  name: string;
  size: string;
  url: string;
}

interface ApplicationData {
  avCode: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Queried';
  submissionDate: string;
  approvalDate?: string;
  applicantName: string;
  applicantType: string;
  reasonForConsent: string;
  proposedNames: ProposedName[];
  businessCommencementDate: string;
  email: string;
  state: string;
  lga: string;
  city: string;
  postCode?: string;
  houseNumber: string;
  streetName: string;
  branchAddress?: string;
  proprietors: Proprietor[];
  businessNatures: BusinessNature[];
  documents: Document[];
}

const applicationData: ApplicationData = {
  avCode: 'AV-2019-01',
  status: 'Pending',
  submissionDate: '2026-01-13 08:30',
  approvalDate: '2026-01-13 08:30',
  applicantName: 'John Adebayo',
  applicantType: 'Public User',
  reasonForConsent: 'Use of restricted word',
  proposedNames: [
    { name: 'National Bank of Abuja Ltd', type: 'primary', verified: false },
    { name: 'National Bank of Abuja', type: 'alternative', verified: false },
    { name: 'National Development Bank of Nigeria Limited', type: 'alternative', verified: false },
  ],
  businessCommencementDate: '01/01/2025',
  email: 'abujabank@example.com',
  state: 'Kano',
  lga: 'Nassarawa',
  city: 'Kano',
  postCode: '123456',
  houseNumber: '123',
  streetName: 'Dangote Street',
  branchAddress: '123 Dangote Street, Nassarawa lga, Kano, Nigeria',
  proprietors: [
    {
      id: 1,
      surname: 'Madu',
      firstName: 'Basheer',
      otherName: 'Sule',
      dateOfBirth: '09/03/1990',
      gender: 'Male',
      nationality: 'Nigerian',
      occupation: 'Designer',
      phone: '+234 9161391234',
      email: 'basheer@example.com',
      country: 'Nigeria',
      state: 'Kano',
      lga: 'Nassarawa',
      city: 'Kano',
      houseNumber: 'No. 7',
      streetName: 'Street Street',
      meansOfId: 'National ID',
      idNumber: '1234567890',
    },
  ],
  businessNatures: [
    {
      id: 1,
      category: 'Accommodation And Food Services Activities',
      specific: 'Operate Restaurant And Catering Services',
      description:
        'We specialize in a delightful fusion of international cuisines, offering everything from savory Italian pastas to spicy Thai curries. Our menu features fresh, locally sourced ingredients, ensuring every dish bursts with flavor. Enjoy a warm, inviting atmosphere perfect for family dinners or romantic evenings. Join us for a culinary adventure that tantalizes your taste buds!',
    },
  ],
  documents: [
    { name: 'National ID.pdf', size: '200 KB', url: '#' },
    { name: 'Driver License.pdf', size: '100 KB', url: '#' },
    { name: 'Directors consent.pdf', size: '200 KB', url: '#' },
    { name: 'Proof of Address.pdf', size: '350 KB', url: '#' },
  ],
};

export default function NameRequiringConsentDetails({ params }: { params: Promise<{ id: string }> }) {
  const [openSections, setOpenSections] = useState({
    business: true,
    proprietors: true,
    nature: true,
    uploads: true,
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
      <PageHeader title="Name Requiring Consent" />

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

        <div className="max-w-5xl mx-auto p-6">

          {/* Request Details Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-medium">Request Details</CardTitle>
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
            <CardContent>
              {/* Application Details Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Application Details</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">AV Code</p>
                    <p className="font-medium text-gray-900">{applicationData.avCode}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      {applicationData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Submission Date</p>
                    <p className="font-medium text-gray-900">{applicationData.submissionDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Approval Date</p>
                    <p className="font-medium text-gray-900">{applicationData.approvalDate || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Applicant Name</p>
                    <p className="font-medium text-gray-900">{applicationData.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Applicant Type</p>
                    <p className="font-medium text-gray-900">{applicationData.applicantType}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm">Reason for Consent</p>
                  <p className="font-medium text-gray-900 text-sm">{applicationData.reasonForConsent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Details Section */}
          <Collapsible open={openSections.business} onOpenChange={() => toggleSection('business')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Business Details</CardTitle>
                    </div>
                    <span className="text-gray-400">{openSections.business ? '▲' : '▼'}</span>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-sm font-medium text-gray-700 mb-4">Business Details</p>

                  {/* Proposed Names */}
                  <div className="space-y-3 mb-6">
                    {applicationData.proposedNames.map((name, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${name.type === 'primary' ? 'border-green-200 bg-green-50' : 'border-gray-200'
                          }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`text-xs ${name.type === 'primary'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-600 text-white'
                              }`}
                          >
                            Proposed name {index + 1}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {name.type === 'primary' ? '(Primary Choice)' : '(Alternative)'}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 mb-2">{name.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Not verified</span>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs h-7">
                            Check Availability
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Business Info Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Business Commencement Date</p>
                      <p className="font-medium text-gray-900">{applicationData.businessCommencementDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{applicationData.email}</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3">Principal Place of Business</p>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">State</p>
                      <p className="font-medium text-gray-900">{applicationData.state}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">LGA</p>
                      <p className="font-medium text-gray-900">{applicationData.lga}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">City/Town/Village</p>
                      <p className="font-medium text-gray-900">{applicationData.city}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Post Code (optional)</p>
                      <p className="font-medium text-gray-900">{applicationData.postCode || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">House Number/Building Name</p>
                      <p className="font-medium text-gray-900">{applicationData.houseNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Street Name</p>
                      <p className="font-medium text-gray-900">{applicationData.streetName}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-500">Full Address of Branches (if any)</p>
                    <p className="font-medium text-gray-900">{applicationData.branchAddress || '-'}</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Proprietors Section */}
          <Collapsible open={openSections.proprietors} onOpenChange={() => toggleSection('proprietors')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Proprietors</CardTitle>
                    </div>
                    <span className="text-gray-400">{openSections.proprietors ? '▲' : '▼'}</span>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {applicationData.proprietors.map((proprietor) => (
                    <div key={proprietor.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          Individual Proprietor {proprietor.id}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-gray-700 mb-3">Personal Details</p>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Surname</p>
                          <p className="font-medium text-gray-900">{proprietor.surname}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">First Name</p>
                          <p className="font-medium text-gray-900">{proprietor.firstName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Other name (optional)</p>
                          <p className="font-medium text-gray-900">{proprietor.otherName || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date of Birth</p>
                          <p className="font-medium text-gray-900">{proprietor.dateOfBirth}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Gender</p>
                          <p className="font-medium text-gray-900">{proprietor.gender}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Nationality</p>
                          <p className="font-medium text-gray-900">{proprietor.nationality}</p>
                        </div>
                      </div>

                      <div className="text-sm mb-4">
                        <p className="text-gray-500">Occupation</p>
                        <p className="font-medium text-gray-900">{proprietor.occupation}</p>
                      </div>

                      <p className="text-sm font-medium text-gray-700 mb-3">Contact Details</p>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Phone number</p>
                          <p className="font-medium text-gray-900">{proprietor.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Email Address</p>
                          <p className="font-medium text-gray-900">{proprietor.email}</p>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-gray-700 mb-3">Address</p>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Country</p>
                          <p className="font-medium text-gray-900">{proprietor.country}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">State</p>
                          <p className="font-medium text-gray-900">{proprietor.state}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">LGA</p>
                          <p className="font-medium text-gray-900">{proprietor.lga}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">City</p>
                          <p className="font-medium text-gray-900">{proprietor.city}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">House Number/Building Name</p>
                          <p className="font-medium text-gray-900">{proprietor.houseNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Street Name</p>
                          <p className="font-medium text-gray-900">{proprietor.streetName}</p>
                        </div>
                      </div>

                      <p className="text-sm font-medium text-gray-700 mb-3">Means of Identification</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Means of Identification</p>
                          <p className="font-medium text-gray-900">{proprietor.meansOfId}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Identity Number</p>
                          <p className="font-medium text-gray-900">{proprietor.idNumber}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Nature of Business Section */}
          <Collapsible open={openSections.nature} onOpenChange={() => toggleSection('nature')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Nature of Business</CardTitle>
                    </div>
                    <span className="text-gray-400">{openSections.nature ? '▲' : '▼'}</span>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {applicationData.businessNatures.map((nature) => (
                    <div key={nature.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Nature of Business {nature.id}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Nature of Business Category</p>
                          <p className="font-medium text-gray-900">{nature.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Specific Nature of Business</p>
                          <p className="font-medium text-gray-900">{nature.specific}</p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <p className="text-gray-500 mb-1">Nature of Business Description</p>
                        <p className="font-medium text-gray-900 italic">{nature.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Uploads Section */}
          <Collapsible open={openSections.uploads} onOpenChange={() => toggleSection('uploads')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Uploads</CardTitle>
                    </div>
                    <span className="text-gray-400">{openSections.uploads ? '▲' : '▼'}</span>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-sm font-medium text-gray-700 mb-4">Documents</p>
                  <div className="grid grid-cols-2 gap-4">
                    {applicationData.documents.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-4 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-gray-400" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                          <p className="text-gray-500 text-xs">{doc.size}</p>
                          <a href={doc.url} className="text-green-600 text-sm hover:underline">
                            Click to view
                          </a>
                        </div>
                      </div>
                    ))}
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
          applicantName={applicationData.applicantName}
        />
        <RejectModal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
        />
        <ApproveModal
          open={approveModalOpen}
          onClose={() => setApproveModalOpen(false)}
          applicationName={applicationData.proposedNames[0].name}
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