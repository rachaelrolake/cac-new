"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Building2, Loader2, Download } from "lucide-react";
import { entityAccountsAPI, type EntityAccount } from "@/lib/api/users-management";
import { toast } from "sonner";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function ApprovedEntityDetails() {
  const router = useRouter()
  const params = useParams()
  const entityId = params.id as string
  const [entity, setEntity] = useState<EntityAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEntityDetails()
  }, [entityId])

  const fetchEntityDetails = async () => {
    setIsLoading(true)
    try {
      const entityData = await entityAccountsAPI.getEntityAccountById(entityId)
      setEntity(entityData)
    } catch (error: any) {
      toast.error("Failed to load entity details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  if (!entity) {
    return <div className="text-center py-20">Entity not found</div>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Entity Details</h1>
          <p className="text-sm text-gray-500 mt-1">Approved entity account information</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2">
          {entity.registrationStatus}
        </Badge>
      </div>

      {/* Company Information */}
      <DetailCard title="Company Information" icon={<Building2 className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataField label="Company Name" value={entity.companyName} />
          <DataField label="RC Number" value={entity.rcNumber || "Not Assigned"} />
          <DataField label="Registration Type" value={entity.registrationType} />
          <DataField label="Company Type" value={entity.companyType} />
          <DataField label="Registration Status" value={entity.registrationStatus} />
          <DataField label="Principal Business Activity" value={entity.principalBusinessActivity} />
          <DataField label="Email" value={entity.email} />
          <DataField label="Phone Number" value={entity.phoneNumber} />
          <DataField label="Current Step" value={`Step ${entity.currentStep}`} />
          <DataField label="Registration Date" value={entity.registrationDate ? format(new Date(entity.registrationDate), "MMM dd, yyyy HH:mm") : "N/A"} />
          <DataField label="Created At" value={format(new Date(entity.createdAt), "MMM dd, yyyy HH:mm")} />
        </div>
      </DetailCard>

      {/* Articles of Association */}
      <DetailCard title="Articles of Association" icon={<FileText className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataField label="Article Type" value={entity.articleOfAssociation} />
          {entity.articleFileUrl && (
            <div className="col-span-3">
              <a href={entity.articleFileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Article File
              </a>
            </div>
          )}
        </div>
      </DetailCard>

      {/* Share Capital Information */}
      {entity.totalNumberIssuedShares && (
        <DetailCard title="Share Capital" icon={<FileText className="w-5 h-5 text-green-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataField label="Total Issued Shares" value={entity.totalNumberIssuedShares?.toString() || "N/A"} />
            <DataField label="Nominal Value per Share" value={entity.nominalValueOfEachShare || "N/A"} />
            <DataField label="Ordinary Shares" value={entity.totalNumberOfOrdinaryShares?.toString() || "N/A"} />
            <DataField label="Preference Shares" value={entity.totalNumberOfPreferenceShares?.toString() || "N/A"} />
            <DataField label="Liability Type" value={entity.liabilityType || "N/A"} />
          </div>
        </DetailCard>
      )}

      {/* Directors */}
      {entity.directors && entity.directors.length > 0 && (
        <DetailCard title="Directors" icon={<User className="w-5 h-5 text-green-600" />}>
          <div className="space-y-4">
            {entity.directors.map((director: any, idx: number) => (
              <div key={idx} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-3">Director {idx + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DataField label="Full Name" value={director.fullName || "N/A"} />
                  <DataField label="Email" value={director.emailAddress || "N/A"} />
                  <DataField label="Phone" value={director.phoneNumber || "N/A"} />
                  <DataField label="Occupation" value={director.occupation || "N/A"} />
                  <DataField label="Nationality" value={director.nationality || "N/A"} />
                </div>
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* Secretaries */}
      {entity.secretaries && entity.secretaries.length > 0 && (
        <DetailCard title="Secretaries" icon={<User className="w-5 h-5 text-green-600" />}>
          <div className="space-y-4">
            {entity.secretaries.map((secretary: any, idx: number) => (
              <div key={idx} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-3">Secretary {idx + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DataField label="Full Name" value={secretary.fullName || "N/A"} />
                  <DataField label="Email" value={secretary.emailAddress || "N/A"} />
                  <DataField label="Phone" value={secretary.phoneNumber || "N/A"} />
                  <DataField label="Type" value={secretary.type || "N/A"} />
                </div>
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* Shareholders */}
      {entity.shareholders && entity.shareholders.length > 0 && (
        <DetailCard title="Shareholders" icon={<User className="w-5 h-5 text-green-600" />}>
          <div className="space-y-4">
            {entity.shareholders.map((shareholder: any, idx: number) => (
              <div key={idx} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-3">Shareholder {idx + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DataField label="Type" value={shareholder.type || "N/A"} />
                  <DataField label="Nationality" value={shareholder.nationality || "N/A"} />
                  {shareholder.personalDetails && (
                    <>
                      <DataField label="Name" value={`${shareholder.personalDetails.firstName || ''} ${shareholder.personalDetails.surname || ''}`.trim() || "N/A"} />
                      <DataField label="Email" value={shareholder.personalDetails.email || "N/A"} />
                    </>
                  )}
                  {shareholder.shareAllocation && (
                    <>
                      <DataField label="Shares" value={shareholder.shareAllocation.numberOfShare || "N/A"} />
                      <DataField label="Share Class" value={shareholder.shareAllocation.classOfShare || "N/A"} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* Objects */}
      {(entity.mainObjects || entity.ancillaryObjects) && (
        <DetailCard title="Objects of Memorandum" icon={<FileText className="w-5 h-5 text-green-600" />}>
          <div className="space-y-4">
            {entity.mainObjects && <DataField label="Main Objects" value={entity.mainObjects} />}
            {entity.ancillaryObjects && <DataField label="Ancillary Objects" value={entity.ancillaryObjects} />}
            <DataField label="General Object Clause" value={entity.acceptGeneralObjectClause ? "Accepted" : "Not Accepted"} />
          </div>
        </DetailCard>
      )}
    </>
  )
}

// --- Sub-Components ---

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}

function DetailCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="border-gray-200 mb-6">
      <CardHeader className="flex flex-row items-center gap-2 border-b bg-gray-50/30 py-4">
        {icon}
        <CardTitle className="text-base font-bold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}