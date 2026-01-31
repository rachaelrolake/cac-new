"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, User, Calendar, Briefcase, Info, Clock, AlertCircle, ChevronLeft, CheckCircle2, FileText, Building2, Upload, ChevronDown, ChevronUp, Users, Scale, PieChart } from 'lucide-react';
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

export default function RegistrationPageDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [openSections, setOpenSections] = useState({
    company: true,
    officers: true,
    shareCapital: true,
    psc: true,
  });

  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div>
      <PageHeader title="Name Requiring Consent" />

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
          {/* Main Card */}
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
              <CardTitle className="text-lg font-semibold">Company Registration</CardTitle>
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
                <Button variant="outlineprimary" size="xl" onClick={() => router.push('/registration/1/queries')}>
                  View Query Messages
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Application Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Application Details</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">AV Code</p>
                    <p className="font-medium">AV-2019-01</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <Badge className="bg-amber-100 text-amber-700 border-0">Pending</Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Submission Date</p>
                    <p className="font-medium">2026-01-13 08:00</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Approval Date</p>
                    <p className="font-medium">2026-01-13 08:30</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Applicant Name</p>
                    <p className="font-medium">John Ibekwe</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Applicant Type</p>
                    <p className="font-medium">Public User</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Collapsible open={openSections.company} onOpenChange={() => toggleSection('company')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Company Information</CardTitle>
                    </div>
                    {openSections.company ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-sm font-medium text-gray-700 mb-4">Company Details</p>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-6">
                    <div>
                      <p className="text-gray-500">Approved Name</p>
                      <p className="font-medium">Greenfield Farms & Agro Services</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone number</p>
                      <p className="font-medium">09123465678</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">abujabank@example.com</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Principal Business Activity</p>
                    <p className="font-medium text-sm">Production of eco-friendly packaging materials. This involves sourcing sustainable raw materials, utilizing advanced machinery for production, and ensuring quality control to meet environmental standards.</p>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3">Registered office address</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
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
                      <p className="text-gray-500">State</p>
                      <p className="font-medium">Kano</p>
                    </div>
                    <div>
                      <p className="text-gray-500">LGA</p>
                      <p className="font-medium">Nassarawa</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3">Head office address</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
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
                      <p className="text-gray-500">State</p>
                      <p className="font-medium">Kano</p>
                    </div>
                    <div>
                      <p className="text-gray-500">LGA</p>
                      <p className="font-medium">Nassarawa</p>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-700 mb-3">Articles of Association</p>
                  <p className="text-sm text-gray-500 mb-2">I want to upload current article.</p>
                  <div className="flex items-center gap-3 border rounded-lg p-3 w-fit">
                    <FileText className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Company Articles.pdf</p>
                      <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Proposed Officers */}
          <Collapsible open={openSections.officers} onOpenChange={() => toggleSection('officers')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Proposed Officers</CardTitle>
                    </div>
                    {openSections.officers ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {/* Secretary */}
                  <div className="border rounded-lg p-4 mb-4">
                    <p className="font-medium text-gray-900 mb-4">Individual Secretary 1</p>
                    <p className="text-sm font-medium text-gray-700 mb-3">Personal Details</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Title</p>
                        <p className="font-medium">Mr</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Full Name(s)</p>
                        <p className="font-medium">Sule</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Surname</p>
                        <p className="font-medium">Madu</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">abujabank@example.com</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone number</p>
                        <p className="font-medium">07012345678</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Identity Type</p>
                        <p className="font-medium">National Identity</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Identity Number</p>
                        <p className="font-medium">1234567890</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border rounded-lg p-3 w-fit mb-4">
                      <FileText className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">National ID</p>
                        <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-3">Secretary's service address</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
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
                        <p className="text-gray-500">State</p>
                        <p className="font-medium">Kano</p>
                      </div>
                      <div>
                        <p className="text-gray-500">LGA</p>
                        <p className="font-medium">Nassarawa</p>
                      </div>
                    </div>
                  </div>

                  {/* Director */}
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-4">Director 1</p>
                    <p className="text-sm font-medium text-gray-700 mb-3">Personal Details</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Title</p>
                        <p className="font-medium">Mr</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Full Name(s)</p>
                        <p className="font-medium">Sule</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Surname</p>
                        <p className="font-medium">Madu</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date of Birth</p>
                        <p className="font-medium">01/01/1982</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-medium">Male</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Nationality</p>
                        <p className="font-medium">Nigerian</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Country</p>
                        <p className="font-medium">Nigeria</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Occupation</p>
                        <p className="font-medium">Director</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">sule@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone Number</p>
                        <p className="font-medium">09112345789</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Identity Type</p>
                        <p className="font-medium">National Identity</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Identity Number</p>
                        <p className="font-medium">1234567890</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mb-4">
                      <div className="flex items-center gap-3 border rounded-lg p-3">
                        <FileText className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">NIN Slip.pdf</p>
                          <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border rounded-lg p-3">
                        <FileText className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Signature.pdf</p>
                          <a href="#" className="text-green-600 text-sm hover:underline">Click to view</a>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-3">Director's service address</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Number/Building Name</p>
                        <p className="font-medium">12</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Street Name</p>
                        <p className="font-medium">Basic Street</p>
                      </div>
                      <div>
                        <p className="text-gray-500">City/Town/Village</p>
                        <p className="font-medium">SANGO</p>
                      </div>
                      <div>
                        <p className="text-gray-500">State</p>
                        <p className="font-medium">Kano</p>
                      </div>
                      <div>
                        <p className="text-gray-500">LGA</p>
                        <p className="font-medium">Nassarawa</p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-3">Director's usual Residential address</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Number/Building Name</p>
                        <p className="font-medium">12</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Street Name</p>
                        <p className="font-medium">Basic Street</p>
                      </div>
                      <div>
                        <p className="text-gray-500">City/Town/Village</p>
                        <p className="font-medium">GIMI</p>
                      </div>
                      <div>
                        <p className="text-gray-500">State</p>
                        <p className="font-medium">Kano</p>
                      </div>
                      <div>
                        <p className="text-gray-500">LGA</p>
                        <p className="font-medium">Nassarawa</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Statement of Issued Share Capital */}
          <Collapsible open={openSections.shareCapital} onOpenChange={() => toggleSection('shareCapital')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Statement of Issued Share Capital</CardTitle>
                    </div>
                    {openSections.shareCapital ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <p className="text-sm font-medium text-gray-700 mb-4">Share Capital Details</p>

                  {/* Class 1 */}
                  <div className="mb-6">
                    <p className="font-medium text-gray-900 mb-3">Class 1</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Class of Share</p>
                        <p className="font-medium">Equity</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Nominal Value of each Issued Shares (N)</p>
                        <p className="font-medium">1000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Number of Issued shares</p>
                        <p className="font-medium">5000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aggregate Nominal Value (N)</p>
                        <p className="font-medium">5,000,000.00</p>
                      </div>
                    </div>
                  </div>

                  {/* Class 2 */}
                  <div className="mb-6">
                    <p className="font-medium text-gray-900 mb-3">Class 2</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Class of Share</p>
                        <p className="font-medium">Preference</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Nominal Value of each Issued Shares (N)</p>
                        <p className="font-medium">1000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Number of Issued shares</p>
                        <p className="font-medium">5000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aggregate Nominal Value (N)</p>
                        <p className="font-medium">2,000,000.00</p>
                      </div>
                    </div>
                  </div>

                  {/* Class 3 */}
                  <div className="mb-6">
                    <p className="font-medium text-gray-900 mb-3">Class 3</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Class of Share</p>
                        <p className="font-medium">Ordinary</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Nominal Value of each Issued Shares (N)</p>
                        <p className="font-medium">1000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Number of Issued shares</p>
                        <p className="font-medium">5000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aggregate Nominal Value (N)</p>
                        <p className="font-medium">2,001,000.00</p>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="font-medium text-gray-900 mb-2">Total</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Total Number of Issued shares</p>
                        <p className="font-medium">30,603</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aggregate Nominal Value (N)</p>
                        <p className="font-medium">10,001,000.00</p>
                      </div>
                    </div>
                  </div>

                  {/* Rights Attached */}
                  <p className="text-sm font-medium text-gray-700 mb-4">Rights Attached to Each Class of Share</p>

                  {['Equity Shares', 'Preference Shares', 'Deferred Shares'].map((shareType) => (
                    <div key={shareType} className="mb-4">
                      <p className="font-medium text-gray-900 mb-2">{shareType}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total number of shares</p>
                          <p className="font-medium">5000</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Voting Rights</p>
                          <p className="font-medium">Full voting rights</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Dividend Rights</p>
                          <p className="font-medium">Capital Distribution Rights</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Redemption Rights</p>
                          <p className="font-medium">Entitled to capital distribution</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Shareholder */}
                  <p className="text-sm font-medium text-gray-700 mb-4 mt-6">Shareholder 1</p>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Full Name</p>
                      <p className="font-medium">Sule Madu</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium">123 One street, my address</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Class of share</p>
                      <p className="font-medium">Kano</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Number of Shares</p>
                      <p className="font-medium">1000</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Nominal Value of each Issued Shares (N)</p>
                      <p className="font-medium">1000</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount to be Paid on Each Share (N)</p>
                      <p className="font-medium">5000</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm">Signature</p>
                    <p className="font-medium text-sm italic">This shareholder has given written to the company share register</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Persons with Significant Control */}
          <Collapsible open={openSections.psc} onOpenChange={() => toggleSection('psc')}>
            <Card className="mb-4">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg font-medium">Persons with Significant Control (PSC)</CardTitle>
                    </div>
                    {openSections.psc ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-4">Legal Entity PSC 1</p>

                    <p className="text-sm font-medium text-gray-700 mb-3">Corporate Details</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Registration Number</p>
                        <p className="font-medium">LP34567</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Company Name</p>
                        <p className="font-medium">Jessup Company</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Legal Form</p>
                        <p className="font-medium">JurisdicName</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Private Registered Company</p>
                        <p className="font-medium">Afhoji</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Register</p>
                        <p className="font-medium">Governing Law</p>
                      </div>
                      <div>
                        <p className="text-gray-500">About Registry</p>
                        <p className="font-medium">Nigeria</p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-3">Contact Details</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Phone number</p>
                        <p className="font-medium">07089231497</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email Address</p>
                        <p className="font-medium">dewy@gmail.com</p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700 mb-3">Address</p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Country</p>
                        <p className="font-medium">Nigeria</p>
                      </div>
                      <div>
                        <p className="text-gray-500">State</p>
                        <p className="font-medium">Kano</p>
                      </div>
                      <div>
                        <p className="text-gray-500">LGA</p>
                        <p className="font-medium">Nassarawa</p>
                      </div>
                      <div>
                        <p className="text-gray-500">City/Town/Village</p>
                        <p className="font-medium">cityplace@example.com</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Number/Building Name</p>
                        <p className="font-medium">12</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Street Name</p>
                        <p className="font-medium">One Way Street</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 italic">
                      I agree the above declaration was verified that I am authorized to submit the information on behalf of the company
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
          applicantName="John Ibekwe"
          applicationName="Greenfield Farms & Agro Services"
        />
        <RejectModal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          applicationName="Greenfield Farms & Agro Services"
        />
        <ApproveModal
          open={approveModalOpen}
          onClose={() => setApproveModalOpen(false)}
          applicationName="Greenfield Farms & Agro Services"
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
  applicationName?: string;
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
          {applicationName && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">
                <span className="font-medium">Application:</span> {applicationName}
              </p>
            </div>
          )}

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

function RejectModal({ open, onClose, applicationName }: {
  open: boolean;
  onClose: () => void;
  applicationName?: string;
}) {
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirm = () => {
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
          {applicationName && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">
                <span className="font-medium">Application:</span> {applicationName}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm text-gray-700">
              Reason for Rejection <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for rejection"
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