"use client"

import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft, FileText, Building2, Users, Briefcase, MapPin,
  CheckCircle2, Loader2, ChevronDown, ChevronUp, Download,
  XCircle, AlertCircle, CheckCircle, RefreshCw
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { consentApplicationsAPI, nameAvailabilityAPI } from "@/lib/api/pre-incorporation"
import { PageLoader } from "@/components/reusables/page-loader"
import { toast } from "sonner"
import { format } from "date-fns"

// ─── Helpers ──────────────────────────────────────────────────────

const getStatusBadgeClass = (status: string) => {
  const s = status?.toLowerCase()
  if (s === "approved") return "bg-green-50 text-green-700 border-green-200"
  if (s === "pending" || s === "pending_review" || s === "pending review") return "bg-amber-50 text-amber-700 border-amber-200"
  if (s === "queried") return "bg-orange-50 text-orange-700 border-orange-200"
  if (s === "rejected") return "bg-red-50 text-red-700 border-red-200"
  return "bg-gray-50 text-gray-600 border-gray-200"
}

const isPending = (status: string) => {
  const s = status?.toLowerCase()
  return s === "pending" || s === "pending_review" || s === "pending review"
}

const formatDate = (d: string | null) => {
  if (!d) return "N/A"
  try { return format(new Date(d), "MMM dd, yyyy HH:mm") } catch { return d }
}

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "N/A"

// ─── Sub-components ───────────────────────────────────────────────

const DetailItem = ({ label, value, className = "" }: { label: string; value: any; className?: string }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <div className={`text-sm font-medium text-gray-900 ${className}`}>{value ?? "N/A"}</div>
  </div>
)

const SectionCard = ({ icon: Icon, title, children, collapsible = false }: {
  icon: any; title: string; children: React.ReactNode; collapsible?: boolean
}) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div
        className={`flex items-center justify-between mb-4 ${collapsible ? "cursor-pointer" : ""}`}
        onClick={() => collapsible && setOpen(o => !o)}
      >
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-emerald-700" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {collapsible && (open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />)}
      </div>
      {open && children}
    </div>
  )
}

// ─── Type-specific Sections ───────────────────────────────────────

function CompanySection({ data }: { data: any }) {
  const directors = data?.proposedOfficers?.directors ?? []
  const secretaries = data?.proposedOfficers?.secretaries?.flat()?.filter(Boolean) ?? []
  const pscs = data?.personsWithSignificantControl?.pscs ?? []

  return (
    <>
      {data?.companyDetails && (
        <SectionCard icon={Building2} title="Company Details" collapsible>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DetailItem label="Company Name" value={data.companyDetails.companyName} />
            <DetailItem label="Email" value={data.companyDetails.companyEmail} />
            <DetailItem label="Registered Address" value={data.companyDetails.registeredAddress} />
            <DetailItem label="State" value={data.companyDetails.state} />
            <DetailItem label="LGA" value={data.companyDetails.lga} />
          </div>
        </SectionCard>
      )}

      {directors.length > 0 && (
        <SectionCard icon={Users} title={`Directors (${directors.length})`} collapsible>
          <div className="space-y-4">
            {directors.map((d: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <p className="text-xs font-bold text-emerald-700 mb-3">Director {i + 1}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="First Name" value={d.firstName} />
                  <DetailItem label="Surname" value={d.surname} />
                  <DetailItem label="Other Name" value={d.otherName} />
                  <DetailItem label="Former Name" value={d.formerName} />
                  <DetailItem label="Gender" value={capitalize(d.gender)} />
                  <DetailItem label="Date of Birth" value={d.dateOfBirth} />
                  <DetailItem label="Nationality" value={capitalize(d.nationality)} />
                  <DetailItem label="Occupation" value={d.occupation} />
                  <DetailItem label="Phone" value={d.phoneNumber} />
                  <DetailItem label="Email" value={d.email} />
                  <DetailItem label="Means of ID" value={d.meansOfIdentification?.toUpperCase()} />
                  <DetailItem label="ID Number" value={d.identityNumber} />
                </div>
                {d.serviceAddress && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Service Address
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <DetailItem label="House/Building" value={d.serviceAddress.houseNumberBuildingName} />
                      <DetailItem label="Street" value={d.serviceAddress.streetName} />
                      <DetailItem label="City" value={d.serviceAddress.cityTownVillage} />
                      <DetailItem label="State" value={d.serviceAddress.state} />
                      <DetailItem label="LGA" value={d.serviceAddress.lga} />
                      <DetailItem label="Post Code" value={d.serviceAddress.postCode} />
                    </div>
                  </div>
                )}
                {d.residentialAddress && !d.sameAsServiceAddress && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Residential Address
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <DetailItem label="House/Building" value={d.residentialAddress.houseNumberBuildingName} />
                      <DetailItem label="Street" value={d.residentialAddress.streetName} />
                      <DetailItem label="City" value={d.residentialAddress.cityTownVillage} />
                      <DetailItem label="State" value={d.residentialAddress.state} />
                      <DetailItem label="LGA" value={d.residentialAddress.lga} />
                      <DetailItem label="Post Code" value={d.residentialAddress.postCode} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {secretaries.length > 0 && (
        <SectionCard icon={Users} title={`Secretaries (${secretaries.length})`} collapsible>
          <div className="space-y-4">
            {secretaries.map((s: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <p className="text-xs font-bold text-blue-700 mb-3">Secretary {i + 1}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="First Name" value={s.firstName} />
                  <DetailItem label="Surname" value={s.surname} />
                  <DetailItem label="Email" value={s.email} />
                  <DetailItem label="Phone" value={s.phoneNumber} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {pscs.length > 0 && (
        <SectionCard icon={Users} title={`Persons with Significant Control (${pscs.length})`} collapsible>
          <div className="space-y-4">
            {pscs.map((p: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="Name" value={`${p.firstName} ${p.surname}`} />
                  <DetailItem label="Gender" value={p.gender} />
                  <DetailItem label="Nationality" value={p.nationality} />
                  <DetailItem label="Occupation" value={p.occupation} />
                  <DetailItem label="Date of Birth" value={p.dateOfBirth} />
                  <DetailItem label="Identity Type" value={p.identityType} />
                  <DetailItem label="ID Number" value={p.identityNumber} />
                  <DetailItem label="Politically Exposed" value={p.isPoliticallyExposedPerson === "yes" ? "Yes" : "No"} />
                  <DetailItem label="State Owned Entity" value={p.isStateOwnedEnterprise === "yes" ? "Yes" : "No"} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  )
}

// ─── Name Availability Card ───────────────────────────────────────

type AvailabilityState = "idle" | "checking" | "available" | "unavailable" | "similar"

interface NameCardProps {
  name: string
  label: string
  isPrimary: boolean
  businessActivity: string
}

function ProposedNameCard({ name, label, isPrimary, businessActivity }: NameCardProps) {
  const [state, setState] = useState<AvailabilityState>("idle")
  const [result, setResult] = useState<any>(null)

  const checkAvailability = async () => {
    setState("checking")
    try {
      const res = await nameAvailabilityAPI.checkName(name, businessActivity || "General")
      setResult(res)
      if (res.available) {
        setState("available")
      } else {
        const score = res.validation?.overallSimilarityScore ?? 100
        setState(score >= 80 ? "unavailable" : "similar")
      }
    } catch {
      setState("idle")
      toast.error("Failed to check name availability")
    }
  }

  const borderColor = {
    idle: "border-gray-200 bg-white",
    checking: "border-gray-200 bg-white",
    available: "border-green-300 bg-green-50",
    unavailable: "border-red-300 bg-white",
    similar: "border-orange-300 bg-white",
  }[state]

  return (
    <div className={`border rounded-xl p-4 transition-all ${borderColor}`}>
      <div className={`flex items-center justify-between mb-2`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isPrimary ? "bg-emerald-700 text-white" : "bg-gray-700 text-white"}`}>
            {label}
          </span>
          <span className="text-xs text-gray-400">{isPrimary ? "(Primary Choice)" : "(Alternative)"}</span>
        </div>
        {state === "available" && (
          <button onClick={checkAvailability} className="text-xs text-emerald-700 border border-emerald-700 rounded px-2 py-0.5 hover:bg-emerald-50 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Recheck
          </button>
        )}
      </div>

      <p className="text-base font-semibold text-gray-900 mb-2">{name}</p>

      {/* Status row */}
      {state === "idle" && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Not verified</span>
          <button
            onClick={checkAvailability}
            className="text-xs bg-emerald-700 text-white px-3 py-1.5 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Check Availability
          </button>
        </div>
      )}

      {state === "checking" && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
          Checking availability...
        </div>
      )}

      {state === "available" && (
        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <CheckCircle className="w-4 h-4" />
          Available ({result?.validation?.overallSimilarityScore ?? 0}% Similarity)
        </div>
      )}

      {state === "unavailable" && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
          <XCircle className="w-4 h-4" />
          Already In Use ({result?.validation?.overallSimilarityScore ?? 100}% Similarity)
        </div>
      )}

      {state === "similar" && (
        <div className="flex items-center gap-1.5 text-xs text-orange-600 font-medium">
          <AlertCircle className="w-4 h-4" />
          Similar Name Exists ({result?.validation?.overallSimilarityScore ?? 0}% Similarity)
        </div>
      )}

      {/* Conflicts */}
      {result?.validation?.conflicts?.length > 0 && state !== "idle" && state !== "checking" && (
        <div className="mt-3 space-y-1">
          {result.validation.conflicts.map((c: any, i: number) => (
            <div key={i} className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1">
              Conflicts with: <span className="font-medium text-gray-700">"{c.existingName}"</span>
              {c.explanation && <span className="text-gray-400"> — {c.explanation}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Business Name Section ────────────────────────────────────────

function BusinessNameSection({ data }: { data: any }) {
  const proprietors = data?.proprietors?.flat()?.filter(Boolean) ?? []
  const natureOfBusiness = data?.natureOfBusiness ?? []
  const addr = data?.businessAddress
  const documents = data?.documents ?? []
  const proposedNames = [
    { name: data.proposedName, label: "Proposed name 1", isPrimary: true },
    data.proposedName2 ? { name: data.proposedName2, label: "Proposed name 2", isPrimary: false } : null,
    data.proposedName3 ? { name: data.proposedName3, label: "Proposed name 3", isPrimary: false } : null,
  ].filter(Boolean) as { name: string; label: string; isPrimary: boolean }[]

  const businessActivity = natureOfBusiness[0]?.specificId || natureOfBusiness[0]?.categoryId || "General"

  return (
    <>
      {/* Proposed Names with Availability Check */}
      <SectionCard icon={FileText} title="Business Details" collapsible>
        <p className="text-sm font-semibold text-gray-700 mb-3">Business Details</p>
        <div className="space-y-3 mb-6">
          {proposedNames.map((item, i) => (
            <ProposedNameCard
              key={i}
              name={item.name}
              label={item.label}
              isPrimary={item.isPrimary}
              businessActivity={businessActivity}
            />
          ))}
        </div>

        {/* Business Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-700">Business Commencement Date</p>
            <p className="text-sm text-gray-500 mt-1">{data.businessCommencementDate || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Email</p>
            <p className="text-sm text-gray-500 mt-1">{data.email || "N/A"}</p>
          </div>
        </div>

        {/* Principal Place of Business */}
        {addr && (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-4">Principal Place of Business</p>
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">State</p>
                <p className="text-sm text-gray-500 mt-1 italic">{addr.state}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">LGA</p>
                <p className="text-sm text-gray-500 mt-1 italic">{addr.lga}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">City/Town/Village</p>
                <p className="text-sm text-gray-500 mt-1 italic">{addr.city}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Post Code (optional)</p>
                <p className="text-sm text-gray-500 mt-1 italic">{addr.postalCode || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">House Number/Building Name</p>
                <p className="text-sm text-gray-500 mt-1 italic">{addr.buildingName || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Street Name</p>
                <p className="text-sm text-gray-500 mt-1 italic">{addr.streetName}</p>
              </div>
            </div>
            {data.fullAddressOfBranches && (
              <div>
                <p className="text-sm font-semibold text-gray-700">Full Address of Branches (if any)</p>
                <p className="text-sm text-gray-500 mt-1">{data.fullAddressOfBranches}</p>
              </div>
            )}
          </>
        )}
      </SectionCard>

      {/* Proprietors */}
      {proprietors.length > 0 && (
        <SectionCard icon={Users} title={`Proprietors (${proprietors.length})`} collapsible>
          <div className="space-y-4">
            {proprietors.map((p: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <p className="text-xs font-bold text-emerald-700 mb-3">Proprietor {i + 1}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="First Name" value={p.firstName} />
                  <DetailItem label="Surname" value={p.surname} />
                  <DetailItem label="Other Name" value={p.otherName} />
                  <DetailItem label="Gender" value={p.gender} />
                  <DetailItem label="Date of Birth" value={p.dateOfBirth} />
                  <DetailItem label="Nationality" value={p.nationality} />
                  <DetailItem label="Occupation" value={p.occupation} />
                  <DetailItem label="Phone" value={p.phone} />
                  <DetailItem label="Email" value={p.email} />
                  <DetailItem label="Means of ID" value={p.meansOfIdentification} />
                  <DetailItem label="ID Number" value={p.identityNumber} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Nature of Business */}
      {natureOfBusiness.length > 0 && (
        <SectionCard icon={Briefcase} title="Nature of Business" collapsible>
          <div className="space-y-3">
            {natureOfBusiness.map((b: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <DetailItem label="Category" value={b.categoryId} />
                  <DetailItem label="Specific Activity" value={b.specificId} />
                </div>
                {b.description && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Description</p>
                    <p className="text-sm text-gray-700">{b.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Uploads */}
      <SectionCard icon={Users} title="Uploads" collapsible>
        <p className="text-sm font-semibold text-gray-700 mb-3">Documents</p>
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {documents.map((doc: any, i: number) => (
              <a
                key={i}
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border rounded-xl p-4 hover:border-emerald-500 transition-colors bg-white group"
              >
                <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{doc.fileName}</p>
                  <p className="text-xs text-gray-400">{doc.fileSize ? `${(parseInt(doc.fileSize) / 1024).toFixed(0)} KB` : ""}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">Click to view</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">No documents uploaded</p>
        )}
      </SectionCard>
    </>
  )
}

function LLPSection({ data }: { data: any }) {
  const details = data?.llpDetails
  const partners = data?.partners?.partnersList ?? []
  const pscs = data?.personsWithSignificantControl?.pscs ?? []

  return (
    <>
      {details && (
        <SectionCard icon={Building2} title="LLP Details" collapsible>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DetailItem label="Approved Name" value={details.approvedCompanyName} />
            <DetailItem label="Email" value={details.companyEmail} />
            <DetailItem label="Phone" value={details.companyPhone ? `+${details.companyPhone.code} ${details.companyPhone.number}` : "N/A"} />
            <DetailItem label="Registered Address" value={details.registeredAddress} />
            <DetailItem label="State" value={details.state} />
            <DetailItem label="LGA" value={details.lga} />
            <DetailItem label="Principal Activity" value={details.principalBusinessActivity} />
          </div>
        </SectionCard>
      )}

      {partners.length > 0 && (
        <SectionCard icon={Users} title={`Partners (${partners.length})`} collapsible>
          <div className="space-y-4">
            {partners.map((p: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-emerald-700">Partner {i + 1}</p>
                  {p.isDesignatedPartner && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">Designated Partner</Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="Name" value={`${p.title} ${p.firstName} ${p.surname}`} />
                  <DetailItem label="Email" value={p.email} />
                  <DetailItem label="Phone" value={p.phone ? `+${p.phone.code} ${p.phone.number}` : "N/A"} />
                  <DetailItem label="Occupation" value={p.occupation} />
                  <DetailItem label="Nationality" value={p.nationality} />
                  <DetailItem label="Identity Type" value={p.identityType} />
                  <DetailItem label="ID Number" value={p.identityNumber} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {pscs.length > 0 && (
        <SectionCard icon={Users} title={`Persons with Significant Control (${pscs.length})`} collapsible>
          <div className="space-y-4">
            {pscs.map((p: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="Name" value={`${p.title} ${p.firstName} ${p.surname}`} />
                  <DetailItem label="Email" value={p.pscEmail} />
                  <DetailItem label="Gender" value={p.gender} />
                  <DetailItem label="Nationality" value={p.nationality} />
                  <DetailItem label="Occupation" value={p.occupation} />
                  <DetailItem label="Date of Birth" value={p.dateOfBirth} />
                  <DetailItem label="Identity Type" value={p.identityType} />
                  <DetailItem label="ID Number" value={p.identityNumber} />
                  <DetailItem label="Politically Exposed" value={p.isPoliticallyExposedPerson === "yes" ? "Yes" : "No"} />
                  <DetailItem label="State Owned Entity" value={p.isStateOwnedEnterprise === "yes" ? "Yes" : "No"} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  )
}

function LPSection({ data }: { data: any }) {
  const details = data?.lpDetails
  const partners = data?.partners?.partnersList ?? []

  return (
    <>
      {details && (
        <SectionCard icon={Building2} title="LP Details" collapsible>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DetailItem label="Approved Name" value={details.approvedBusinessName} />
            <DetailItem label="Email" value={details.businessEmail} />
            <DetailItem label="Phone" value={details.businessPhone ? `+${details.businessPhone.code} ${details.businessPhone.number}` : "N/A"} />
            <DetailItem label="Registered Address" value={details.registeredAddress} />
            <DetailItem label="State" value={details.state} />
            <DetailItem label="LGA" value={details.lga} />
            <DetailItem label="Principal Activity" value={details.principalBusinessActivity} />
          </div>
        </SectionCard>
      )}

      {partners.length > 0 && (
        <SectionCard icon={Users} title={`Partners (${partners.length})`} collapsible>
          <div className="space-y-4">
            {partners.map((p: any, i: number) => (
              <div key={i} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-emerald-700">Partner {i + 1}</p>
                  {p.partnerType && (
                    <Badge className={`text-xs ${p.partnerType === "General Partner" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                      {p.partnerType}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="Name" value={`${p.title} ${p.firstName} ${p.surname}`} />
                  <DetailItem label="Email" value={p.email} />
                  <DetailItem label="Phone" value={p.phone ? `+${p.phone.code} ${p.phone.number}` : "N/A"} />
                  <DetailItem label="Occupation" value={p.occupation} />
                  <DetailItem label="Nationality" value={p.nationality} />
                  <DetailItem label="Identity Type" value={p.identityType} />
                  <DetailItem label="ID Number" value={p.identityNumber} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  )
}

function IncorporatedTrusteesSection() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center mt-4">
      <Building2 className="w-10 h-10 text-blue-400 mx-auto mb-3" />
      <p className="text-blue-700 font-medium">Incorporated Trustees</p>
      <p className="text-sm text-blue-500 mt-1">This entity type is not yet available in the backend. Details will be shown once the API is ready.</p>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────

export default function NameRequiringConsentDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id } = use(params)
  const type = searchParams.get("type") || "company"

  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeDialog, setActiveDialog] = useState<"approve" | "reject" | "query" | null>(null)

  const [approveNotes, setApproveNotes] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [rejectMessage, setRejectMessage] = useState("")
  const [queryReason, setQueryReason] = useState("")
  const [queryMessage, setQueryMessage] = useState(
    `Dear Applicant,\n\nYour consent application requires additional documentation.\n\nPlease submit:\n\n- [List required documents]\n\nSubmit all documents within 5 business days to avoid application expiry.\n\nRegards,\nCAC Admin`
  )

  useEffect(() => {
    if (id) fetchData()
  }, [id, type])

  const tab = searchParams.get("tab") // Get the tab param

  const handleBack = () => {
    // Preserve the tab param when going back
    const backUrl = tab ? `/pre-incorporation?tab=${tab}` : '/pre-incorporation'
    router.push(backUrl)
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await consentApplicationsAPI.getConsentApplicationById(type, id)
      setData(result)
    } catch (error: any) {
      toast.error("Failed to load application details", {
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
      await consentApplicationsAPI.approveConsentApplication(type, id)
      toast.success("Application approved successfully")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to approve", { description: error.response?.data?.message || "Please try again" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) { toast.error("Please provide a reason"); return }
    setIsSubmitting(true)
    try {
      await consentApplicationsAPI.rejectConsentApplication(type, id, { reason: rejectReason })
      toast.success("Application rejected")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to reject", { description: error.response?.data?.message || "Please try again" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuery = async () => {
    if (!queryReason.trim()) { toast.error("Please provide a query reason"); return }
    setIsSubmitting(true)
    try {
      await consentApplicationsAPI.queryConsentApplication(type, id, { reason: queryReason })
      toast.success("Query sent successfully")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to send query", { description: error.response?.data?.message || "Please try again" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <PageLoader />

  if (!data) return <div className="p-10 text-center text-red-500 font-bold">Application not found.</div>

  const status = data.applicationStatus || data.status || "N/A"
  const entityName = data.proposedName || data.businessName || data.existingBusinessName || "This application"

  return (
    <div>
      <PageHeader title="Name Requiring Consent" />

      {/* ── Approve Dialog ─────────────────────────── */}
      <Dialog open={activeDialog === "approve"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Approve Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm"><span className="font-medium">Application:</span> {entityName}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Approval Notes (Optional)</Label>
              <Textarea value={approveNotes} onChange={(e) => setApproveNotes(e.target.value)} rows={4}
                placeholder="Add any notes or special conditions for this approval..." className="w-full resize-none text-sm" disabled={isSubmitting} />
            </div>
            <div className="bg-green-50/50 border border-green-100 rounded-lg p-4">
              <p className="font-medium text-gray-900 text-sm mb-2">Upon approval:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {["Consent number will be assigned", "Applicant will be notified via email", "Status will be updated to Approved"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setActiveDialog(null)} disabled={isSubmitting}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Confirm Approval"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Query Dialog ───────────────────────────── */}
      <Dialog open={activeDialog === "query"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Query Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Reason for query <span className="text-red-500">*</span></Label>
              <Input value={queryReason} onChange={(e) => setQueryReason(e.target.value)} placeholder="Enter reason for query" disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Query Message</Label>
              <Textarea value={queryMessage} onChange={(e) => setQueryMessage(e.target.value)} rows={10} className="w-full resize-none text-sm" disabled={isSubmitting} />
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setActiveDialog(null)} disabled={isSubmitting}>Cancel</Button>
            <Button className="bg-red-100 text-red-700 hover:bg-red-200 border-0" onClick={handleQuery} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Confirm Query"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reject Dialog ──────────────────────────── */}
      <Dialog open={activeDialog === "reject"} onOpenChange={(o) => !o && setActiveDialog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Reject Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Reason for rejection <span className="text-red-500">*</span></Label>
              <Input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Enter reason for rejection" disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Rejection Message</Label>
              <Textarea value={rejectMessage} onChange={(e) => setRejectMessage(e.target.value)} rows={6}
                placeholder="Provide a formal explanation. This will be sent to the applicant." className="w-full resize-none text-sm" disabled={isSubmitting} />
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setActiveDialog(null)} disabled={isSubmitting}>Cancel</Button>
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleReject} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Page Body ──────────────────────────────── */}
      <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800 pt-24">

        <Button variant="outline" size="lg" className="mb-3" onClick={handleBack}>
          <ArrowLeft size={18} />
          <span className="font-medium">Back</span>
        </Button>

        <div className="max-w-5xl mx-auto p-6">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-medium">Request Details</CardTitle>
              <div className="flex gap-2 flex-wrap justify-end">
                {isPending(status) && (
                  <>
                    <Button variant="destructive" size="xl" onClick={() => setActiveDialog("reject")} disabled={isSubmitting}>Reject</Button>
                    <Button size="xl" className="bg-amber-500 hover:bg-amber-600" onClick={() => setActiveDialog("query")} disabled={isSubmitting}>Query</Button>
                    <Button size="xl" className="bg-green-600 hover:bg-green-700" onClick={() => setActiveDialog("approve")} disabled={isSubmitting}>Approve</Button>
                  </>
                )}
                <Button variant="outlineprimary" size="xl">View Query Messages</Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Application Details - shared across all types */}
              <SectionCard icon={FileText} title="Application Details">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <DetailItem label="AR Code" value={data.arCode} />
                  <DetailItem label="Status" value={
                    <Badge variant="outline" className={getStatusBadgeClass(status)}>{status}</Badge>
                  } />
                  <DetailItem label="Submission Date" value={formatDate(data.createdAt)} />
                  <DetailItem label="Approval Date" value={data.approvalDate ? formatDate(data.approvalDate) : "N/A"} />
                  <DetailItem label="Entity Classification" value={data.classificationName} />
                  <DetailItem label="Business Type" value={data.businessTypeName} />
                  <DetailItem label="Reason for Consent" value={data.reasonForConsentLabel} />
                  {data.existingBusinessName && <DetailItem label="Existing Business Name" value={data.existingBusinessName} />}
                  {data.rcNumber && <DetailItem label="RC Number" value={data.rcNumber} />}
                  <DetailItem label="Consent Number" value={data.consentNumber} />
                  <DetailItem label="Payment Status" value={data.paymentStatus} />
                  <DetailItem label="Payment Method" value={data.paymentMethod} />
                  {data.rejectionReason && (
                    <div className="col-span-3 bg-red-50 border border-red-100 rounded p-3">
                      <p className="text-xs text-red-500 mb-1">Rejection Reason</p>
                      <p className="text-sm text-red-700">{data.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Type-specific sections */}
              {type === "company" && <CompanySection data={data} />}
              {type === "business_name" && <BusinessNameSection data={data} />}
              {type === "llp" && <LLPSection data={data} />}
              {type === "lp" && <LPSection data={data} />}
              {type === "incorporated_trustees" && <IncorporatedTrusteesSection />}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}