"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Briefcase, Info } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link"
import { useState, useEffect, use } from "react";

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

export default function NameReservationViewDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

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

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Reservation Details</h1>

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
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {data.status}
                    </span>
                  }
                />
                <DetailItem label="Submission Date" value={data.submitted} />
                <DetailItem label="Approval Date" value={data.status === 'Approved' ? data.submitted : 'N/A'} />
                <DetailItem label="Applicant Name" value={data.applicants} />
                <DetailItem label="Applicant Type" value={data.applicantsType} />
              </div>
            </div>

            {/* Section 2: Entity Information */}
            <div className="mb-6 border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-700 border-b pb-4">
                <Briefcase size={20} className="text-green-600" />
                <h2 className="font-bold">Entity Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8">
                <DetailItem label="Entity Classification" value={data.entityClassification} />
                <DetailItem label="Entity Type" value={data.entityType} />
                <DetailItem label="Proposed Name" value={data.proposedName} className="italic text-gray-600" />
                <DetailItem label="Reason for Consent" value={data.reasonForConsent} />
                <DetailItem label="AI Decision" value={data.aiDecision} />
              </div>
            </div>

            {/* Section 3: Availability Code Information */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6 text-blue-900">
                <Calendar size={20} />
                <h2 className="font-bold">Availability Code Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 mb-8">
                <DetailItem label="AV Code" value={data.avCode} />
                <DetailItem label="Valid Until (60 Days)" value="2026-03-14 08:30" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-gray-700">Time Remaining</p>
                  <p className="text-sm font-bold text-green-600">{data.sla}</p>
                </div>
                <div className="w-full bg-green-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: data.sla === 'Done' ? '100%' : '75%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailItem = ({ label, value, className = "" }: { label: string, value: any, className?: string }) => (
  <div>
    <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
    <p className={`text-sm text-gray-500 ${className}`}>{value}</p>
  </div>
);