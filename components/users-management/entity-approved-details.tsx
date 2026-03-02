"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Building2, Loader2, Download } from "lucide-react";
import { entityAccountsAPI, type EntityAccount } from "@/lib/api/users-management";
import { toast } from "sonner";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function ApprovedEntityDetails({ entityType }: { entityType: string | null }) {
  const router = useRouter()
  const params = useParams()
  const entityId = params.id as string
  const [entity, setEntity] = useState<EntityAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (entityType) {
      fetchEntityDetails(entityType)
    }
  }, [entityId])

  const fetchEntityDetails = async (entityType: string) => {
    setIsLoading(true)
    try {
      const entityData = await entityAccountsAPI.getEntityAccountById(entityId, entityType)
      setEntity(entityData)
    } catch (error: any) {
      toast.error("Failed to load entity details", {
        description: error.response?.data?.message || "Please try again"
      })
      // router.back()
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

      {/* Registered Office Address */}
      {entity.registeredOfficeAddress && (
        <DetailCard title="Registered Office Address" icon={<Building2 className="w-5 h-5 text-green-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataField label="Building Name" value={entity.registeredOfficeAddress.buildingName || "N/A"} />
            <DataField label="Street Name" value={entity.registeredOfficeAddress.streetName || "N/A"} />
            <DataField label="City" value={entity.registeredOfficeAddress.city || "N/A"} />
            <DataField label="State" value={entity.registeredOfficeAddress.state || "N/A"} />
            <DataField label="LGA" value={entity.registeredOfficeAddress.lga || "N/A"} />
            <DataField label="Postal Code" value={entity.registeredOfficeAddress.postalCode || "N/A"} />
          </div>
        </DetailCard>
      )}

      {/* Head Office Address */}
      {entity.headOfficeAddress && (
        <DetailCard title="Head Office Address" icon={<Building2 className="w-5 h-5 text-green-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataField label="Building Name" value={entity.headOfficeAddress.buildingName || "N/A"} />
            <DataField label="Street Name" value={entity.headOfficeAddress.streetName || "N/A"} />
            <DataField label="City" value={entity.headOfficeAddress.city || "N/A"} />
            <DataField label="State" value={entity.headOfficeAddress.state || "N/A"} />
            <DataField label="LGA" value={entity.headOfficeAddress.lga || "N/A"} />
            <DataField label="Postal Code" value={entity.headOfficeAddress.postalCode || "N/A"} />
          </div>
        </DetailCard>
      )}

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
          <div className="space-y-6">
            {entity.directors.map((director: any, idx: number) => (
              <div key={idx} className="border-b pb-6 last:border-0">
                <h3 className="font-semibold mb-4 text-lg">Director {idx + 1}</h3>

                {/* Personal Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Title" value={director.title || "N/A"} />
                    <DataField label="Full Name" value={director.fullName || "N/A"} />
                    <DataField label="Surname" value={director.surname || "N/A"} />
                    <DataField label="Gender" value={director.gender || "N/A"} />
                    <DataField label="Date of Birth" value={director.dateOfBirth || "N/A"} />
                    <DataField label="Former Names" value={director.formerNames || "N/A"} />
                    <DataField label="Nationality" value={director.nationality || "N/A"} />
                    <DataField label="Country" value={director.country || "N/A"} />
                    <DataField label="Occupation" value={director.occupation || "N/A"} />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Email" value={director.emailAddress || "N/A"} />
                    <DataField label="Phone Number" value={director.phoneNumber || "N/A"} />
                  </div>
                </div>

                {/* Identity Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Identity Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Identity Type" value={director.identityType || "N/A"} />
                    <DataField label="Identity Number" value={director.identityNumber || "N/A"} />
                    {director.identityDocumentUrl && (
                      <div className="col-span-3">
                        <a href={director.identityDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Identity Document
                        </a>
                      </div>
                    )}
                    {director.signatureUrl && (
                      <div className="col-span-3">
                        <a href={director.signatureUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Signature
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Address */}
                {director.serviceAddress && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Service Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={director.serviceAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={director.serviceAddress.streetName || "N/A"} />
                      <DataField label="City" value={director.serviceAddress.city || "N/A"} />
                      <DataField label="State" value={director.serviceAddress.state || "N/A"} />
                      <DataField label="LGA" value={director.serviceAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={director.serviceAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}

                {/* Residential Address */}
                {director.residentialAddress && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Residential Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={director.residentialAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={director.residentialAddress.streetName || "N/A"} />
                      <DataField label="City" value={director.residentialAddress.city || "N/A"} />
                      <DataField label="State" value={director.residentialAddress.state || "N/A"} />
                      <DataField label="LGA" value={director.residentialAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={director.residentialAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* Secretaries */}
      {entity.secretaries && entity.secretaries.length > 0 && (
        <DetailCard title="Secretaries" icon={<User className="w-5 h-5 text-green-600" />}>
          <div className="space-y-6">
            {entity.secretaries.map((secretary: any, idx: number) => (
              <div key={idx} className="border-b pb-6 last:border-0">
                <h3 className="font-semibold mb-4 text-lg">Secretary {idx + 1}</h3>

                {/* Basic Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Type" value={secretary.type || "N/A"} />
                    <DataField label="Title" value={secretary.title || "N/A"} />
                    <DataField label="Full Name" value={secretary.fullName || "N/A"} />
                    <DataField label="Surname" value={secretary.surname || "N/A"} />
                    <DataField label="Former Names" value={secretary.formerNames || "N/A"} />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Email" value={secretary.emailAddress || "N/A"} />
                    <DataField label="Phone Number" value={secretary.phoneNumber || "N/A"} />
                  </div>
                </div>

                {/* Identity Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Identity Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Identity Type" value={secretary.identityType || "N/A"} />
                    <DataField label="Identity Number" value={secretary.identityNumber || "N/A"} />
                    {secretary.identityDocumentUrl && (
                      <div className="col-span-3">
                        <a href={secretary.identityDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Identity Document
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Address */}
                {secretary.serviceAddress && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Service Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={secretary.serviceAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={secretary.serviceAddress.streetName || "N/A"} />
                      <DataField label="City" value={secretary.serviceAddress.city || "N/A"} />
                      <DataField label="State" value={secretary.serviceAddress.state || "N/A"} />
                      <DataField label="LGA" value={secretary.serviceAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={secretary.serviceAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* Shareholders */}
      {entity.shareholders && entity.shareholders.length > 0 && (
        <DetailCard title="Shareholders" icon={<User className="w-5 h-5 text-green-600" />}>
          <div className="space-y-6">
            {entity.shareholders.map((shareholder: any, idx: number) => (
              <div key={idx} className="border-b pb-6 last:border-0">
                <h3 className="font-semibold mb-4 text-lg">Shareholder {idx + 1}</h3>

                {/* Basic Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Type" value={shareholder.type || "N/A"} />
                    <DataField label="Nationality" value={shareholder.nationality || "N/A"} />
                  </div>
                </div>

                {/* Individual Shareholder - Personal Details */}
                {shareholder.personalDetails && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Personal Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="First Name" value={shareholder.personalDetails.firstName || "N/A"} />
                      <DataField label="Surname" value={shareholder.personalDetails.surname || "N/A"} />
                      <DataField label="Other Names" value={shareholder.personalDetails.otherNames || "N/A"} />
                      <DataField label="Former Names" value={shareholder.personalDetails.formerNames || "N/A"} />
                      <DataField label="Email" value={shareholder.personalDetails.email || "N/A"} />
                      <DataField label="Phone Number" value={shareholder.personalDetails.phoneNumber || "N/A"} />
                      <DataField label="Gender" value={shareholder.personalDetails.gender || "N/A"} />
                      <DataField label="Date of Birth" value={shareholder.personalDetails.dateOfBirth || "N/A"} />
                      <DataField label="Occupation" value={shareholder.personalDetails.occupation || "N/A"} />
                      <DataField label="Nationality" value={shareholder.personalDetails.nationality || "N/A"} />
                      <DataField label="Identity Type" value={shareholder.personalDetails.identityType || "N/A"} />
                      <DataField label="Identity Number" value={shareholder.personalDetails.identityNumber || "N/A"} />
                      {shareholder.personalDetails.uploadedIdFileUrl && (
                        <div className="col-span-3">
                          <a href={shareholder.personalDetails.uploadedIdFileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Identity Document
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Corporate Shareholder - Company Information */}
                {shareholder.companyInformation && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Company Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Company Name" value={shareholder.companyInformation.companyName || "N/A"} />
                      <DataField label="Registration Number" value={shareholder.companyInformation.registrationNumber || "N/A"} />
                      <DataField label="Legal Form" value={shareholder.companyInformation.legalForm || "N/A"} />
                      <DataField label="Register" value={shareholder.companyInformation.register || "N/A"} />
                      <DataField label="Governing Law" value={shareholder.companyInformation.governingLaw || "N/A"} />
                      <DataField label="Jurisdiction" value={shareholder.companyInformation.jurisdiction || "N/A"} />
                    </div>
                  </div>
                )}

                {/* Authorized Representative (for Corporate) */}
                {shareholder.authorizedRepresentative && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Authorized Representative</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Full Name" value={shareholder.authorizedRepresentative.fullname || "N/A"} />
                      <DataField label="Email" value={shareholder.authorizedRepresentative.email || "N/A"} />
                      <DataField label="Phone Number" value={shareholder.authorizedRepresentative.phoneNumber || "N/A"} />
                      <DataField label="Designation" value={shareholder.authorizedRepresentative.designation || "N/A"} />
                      <DataField label="Nationality" value={shareholder.authorizedRepresentative.nationality || "N/A"} />
                    </div>
                  </div>
                )}

                {/* Share Allocation */}
                {shareholder.shareAllocation && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Share Allocation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Class of Share" value={shareholder.shareAllocation.classOfShare || "N/A"} />
                      <DataField label="Number of Shares" value={shareholder.shareAllocation.numberOfShare || "N/A"} />
                      <DataField label="Nominal Value per Share" value={shareholder.shareAllocation.nominalValueOfEachShare?.toString() || "N/A"} />
                      <DataField label="Amount to Pay per Share" value={shareholder.shareAllocation.amountToPayEachShare?.toString() || "N/A"} />
                      <DataField label="Total Aggregate Unpaid" value={shareholder.shareAllocation.totalAggregateAmountUnpaid?.toString() || "N/A"} />
                      <DataField label="Consent" value={shareholder.shareAllocation.consent ? "Yes" : "No"} />
                      {shareholder.shareAllocation.signatureUrl && (
                        <div className="col-span-3">
                          <a href={shareholder.shareAllocation.signatureUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Signature
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Service Address */}
                {shareholder.serviceAddress && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Service Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={shareholder.serviceAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={shareholder.serviceAddress.streetName || "N/A"} />
                      <DataField label="City" value={shareholder.serviceAddress.city || "N/A"} />
                      <DataField label="State" value={shareholder.serviceAddress.state || "N/A"} />
                      <DataField label="LGA" value={shareholder.serviceAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={shareholder.serviceAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}

                {/* Residential Address */}
                {shareholder.residentialAddress && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Residential Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={shareholder.residentialAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={shareholder.residentialAddress.streetName || "N/A"} />
                      <DataField label="City" value={shareholder.residentialAddress.city || "N/A"} />
                      <DataField label="State" value={shareholder.residentialAddress.state || "N/A"} />
                      <DataField label="LGA" value={shareholder.residentialAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={shareholder.residentialAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {/* PSCs (Persons with Significant Control) */}
      {entity.pscs && entity.pscs.length > 0 && (
        <DetailCard title="Persons with Significant Control (PSCs)" icon={<User className="w-5 h-5 text-green-600" />}>
          <div className="space-y-6">
            {entity.pscs.map((psc: any, idx: number) => (
              <div key={idx} className="border-b pb-6 last:border-0">
                <h3 className="font-semibold mb-4 text-lg">PSC {idx + 1}</h3>

                {/* Personal Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Title" value={psc.title || "N/A"} />
                    <DataField label="First Name" value={psc.firstName || "N/A"} />
                    <DataField label="Surname" value={psc.surname || "N/A"} />
                    <DataField label="Former Names" value={psc.formerNames || "N/A"} />
                    <DataField label="Gender" value={psc.gender || "N/A"} />
                    <DataField label="Date of Birth" value={psc.dateOfBirth || "N/A"} />
                    <DataField label="Nationality" value={psc.nationality || "N/A"} />
                    <DataField label="Country" value={psc.country || "N/A"} />
                    <DataField label="Occupation" value={psc.occupation || "N/A"} />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Email" value={psc.email || "N/A"} />
                    <DataField label="Phone Number" value={psc.phoneNumber || "N/A"} />
                  </div>
                </div>

                {/* Identity & Compliance */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Identity & Compliance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Identity Type" value={psc.identityType || "N/A"} />
                    <DataField label="Identity Number" value={psc.identityNumber || "N/A"} />
                    <DataField label="Tax Residency" value={psc.taxResidency || "N/A"} />
                    <DataField label="PEP Status" value={psc.pepStatus || "N/A"} />
                    <DataField label="State Owned" value={psc.isStateOwned || "N/A"} />
                    <DataField label="Date Became PSC" value={psc.datePscBecameSuch || "N/A"} />
                    {psc.uploadedIdFileUrl && (
                      <div className="col-span-3">
                        <a href={psc.uploadedIdFileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Identity Document
                        </a>
                      </div>
                    )}
                    {psc.signatureUrl && (
                      <div className="col-span-3">
                        <a href={psc.signatureUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Signature
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Control & Interests */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Control & Interests</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DataField label="Interest in Shares" value={psc.interestShares ? "Yes" : "No"} />
                    <DataField label="Percentage Shares Held" value={psc.percentageSharesHeld?.toString() || "N/A"} />
                    <DataField label="Interest in Voting Rights" value={psc.interestVotingRights ? "Yes" : "No"} />
                    <DataField label="Percentage Voting Rights" value={psc.percentageVotingRights?.toString() || "N/A"} />
                    <DataField label="Interest Appoint Directors" value={psc.interestAppointDirectors ? "Yes" : "No"} />
                    <DataField label="Significant Control" value={psc.interestSignificantControl ? "Yes" : "No"} />
                  </div>
                </div>

                {/* Service Address */}
                {psc.serviceAddress && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Service Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={psc.serviceAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={psc.serviceAddress.streetName || "N/A"} />
                      <DataField label="City" value={psc.serviceAddress.city || "N/A"} />
                      <DataField label="State" value={psc.serviceAddress.state || "N/A"} />
                      <DataField label="LGA" value={psc.serviceAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={psc.serviceAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}

                {/* Residential Address */}
                {psc.residentialAddress && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Residential Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DataField label="Building Name" value={psc.residentialAddress.buildingName || "N/A"} />
                      <DataField label="Street Name" value={psc.residentialAddress.streetName || "N/A"} />
                      <DataField label="City" value={psc.residentialAddress.city || "N/A"} />
                      <DataField label="State" value={psc.residentialAddress.state || "N/A"} />
                      <DataField label="LGA" value={psc.residentialAddress.lga || "N/A"} />
                      <DataField label="Postal Code" value={psc.residentialAddress.postalCode || "N/A"} />
                    </div>
                  </div>
                )}
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
      <CardHeader className="flex flex-row items-center gap-2 border-b bg-gray-50/30">
        {icon}
        <CardTitle className="text-base font-bold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}