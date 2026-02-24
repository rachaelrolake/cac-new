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
  ArrowLeft, FileText, Building2, Users, Briefcase,
  MapPin, CheckCircle2, Loader2, ChevronDown, ChevronUp, ExternalLink
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { registrationsAPI } from "@/lib/api/pre-incorporation"
import { PageLoader } from "@/components/reusables/page-loader"
import { toast } from "sonner"
import { format } from "date-fns"

// ─── Helpers ──────────────────────────────────────────────────────

const fmt = (d: string | null) => {
  if (!d) return "N/A"
  try { return format(new Date(d), "MMM dd, yyyy HH:mm") } catch { return d }
}

const fmtDate = (d: string | null) => {
  if (!d) return "N/A"
  try { return format(new Date(d), "MMM dd, yyyy") } catch { return d }
}

const cap = (s?: string | null) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "N/A"

const getStatusClass = (status: string) => {
  const s = status?.toLowerCase()
  if (s === "approved") return "bg-green-50 text-green-700 border-green-200"
  if (s?.includes("pending")) return "bg-amber-50 text-amber-700 border-amber-200"
  if (s === "queried") return "bg-orange-50 text-orange-700 border-orange-200"
  if (s === "rejected") return "bg-red-50 text-red-700 border-red-200"
  if (s === "draft") return "bg-gray-50 text-gray-500 border-gray-200"
  return "bg-gray-50 text-gray-500 border-gray-200"
}

const isPending = (status: string) => status?.toLowerCase()?.includes("pending")

// ─── Reusable Sub-components ──────────────────────────────────────

const DI = ({ label, value, className = "" }: { label: string; value: any; className?: string }) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <div className={`text-sm font-medium text-gray-900 ${className}`}>{value ?? "N/A"}</div>
  </div>
)

const AddressBlock = ({ label, addr }: { label: string; addr: any }) => {
  if (!addr) return null
  return (
    <div className="my-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
        <MapPin className="w-3 h-3" /> {label}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <DI label="Building/House" value={addr.buildingName || addr.buildingNumber} />
        <DI label="Street" value={addr.streetName} />
        <DI label="City" value={addr.city} />
        <DI label="State" value={addr.state} />
        <DI label="LGA" value={addr.lga} />
        <DI label="Postal Code" value={addr.postalCode} />
      </div>
    </div>
  )
}

const DocLink = ({ label, url }: { label: string; url?: string | null }) => {
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg px-3 py-2 bg-emerald-50 hover:bg-emerald-100 transition-colors w-fit mt-2">
      <FileText className="w-3.5 h-3.5" />
      {label}
      <ExternalLink className="w-3 h-3" />
    </a>
  )
}

const Section = ({ icon: Icon, title, children, collapsible = true }: {
  icon: any; title: string; children: React.ReactNode; collapsible?: boolean
}) => {
  const [open, setOpen] = useState(true)
  return (
    <Card className="shadow-none">
      <CardHeader
        className={`pb-3 border-b mb-2 ${collapsible ? "cursor-pointer" : ""}`}
        onClick={() => collapsible && setOpen(o => !o)}
      >
        <CardTitle className="text-sm font-bold flex items-center justify-between text-emerald-700">
          <span className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-emerald-700" />
            {title}
          </span>
          {collapsible && (open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />)}
        </CardTitle>
      </CardHeader>
      {open && <CardContent>{children}</CardContent>}
    </Card>
  )
}

// ─── Reservation Banner ───────────────────────────────────────────

function ReservationBanner({ res }: { res: any }) {
  if (!res) return null
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-2">
      <p className="text-xs font-semibold text-blue-700 mb-2">Name Reservation</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DI label="AV Code" value={res.avCode} />
        <DI label="Business Name" value={res.businessName} />
        <DI label="Status" value={res.status} />
        <DI label="Expiry Date" value={fmtDate(res.expiryDate)} />
      </div>
    </div>
  )
}

// ─── Company Section ──────────────────────────────────────────────

function CompanySection({ data }: { data: any }) {
  const directors = data?.directors ?? []
  const secretaries = data?.secretaries ?? []
  const shareholders = data?.shareholders ?? []
  const pscs = data?.pscs ?? []

  return (
    <>
      {/* Company Information */}
      <Section icon={Building2} title="Company Information">
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Company Details</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <DI label="Company Name" value={data.companyName} />
            <DI label="Company Type" value={data.companyType} />
            <DI label="Phone Number" value={data.phoneNumber} />
            <DI label="Email" value={data.email} />
            <DI label="Principal Business Activity" value={data.principalBusinessActivity} />
            <DI label="Liability Type" value={data.liabilityType?.replace(/_/g, " ")} />
            <DI label="Article of Association" value={data.articleOfAssociation?.replace(/_/g, " ")} />
            <DI label="Main Objects" value={data.mainObjects} />
            <DI label="Ancillary Objects" value={data.ancillaryObjects} />
          </div>
          {data.articleFileUrl && <DocLink label="Article of Association" url={data.articleFileUrl} />}

          {/* Registered office address */}
          {data.registeredAddress && (
            <>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4">Registered office address</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <DI label="Number/Building Name" value={data.registeredAddress?.buildingName} />
                <DI label="Street Name" value={data.registeredAddress?.streetName} />
                <DI label="City/Town/Village" value={data.registeredAddress?.city} />
                <DI label="State" value={data.registeredAddress?.state} />
                <DI label="LGA" value={data.registeredAddress?.lga} />
                <DI label="Postcode" value={data.registeredAddress?.postalCode} />
              </div>
            </>
          )}

          {/* Head office address */}
          {data.headOfficeAddress && (
            <>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4">Head office address</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <DI label="Number/Building Name" value={data.headOfficeAddress?.buildingName} />
                <DI label="Street Name" value={data.headOfficeAddress?.streetName} />
                <DI label="City/Town/Village" value={data.headOfficeAddress?.city} />
                <DI label="State" value={data.headOfficeAddress?.state} />
                <DI label="LGA" value={data.headOfficeAddress?.lga} />
                <DI label="Postcode" value={data.headOfficeAddress?.postalCode} />
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Proposed Officers */}
      <Section icon={Users} title="Proposed Officers">
        {/* Secretaries */}
        {secretaries.map((s: any, i: number) => (
          <div key={i} className="mb-6">
            <p className="text-xs font-bold text-blue-600 mb-3">Individual Secretary {i + 1}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
              <DI label="Title" value={cap(s.title)} />
              <DI label="Full Name" value={s.fullName} />
              <DI label="Surname" value={s.surname} />
              <DI label="Former Names" value={s.formerNames} />
              <DI label="Phone Number" value={s.phoneNumber} />
              <DI label="Email" value={s.emailAddress} />
              <DI label="Identity Type" value={s.identityType} />
              <DI label="Identity Number" value={s.identityNumber} />
            </div>
            <DocLink label="View Identity Document" url={s.identityDocumentUrl} />
            <AddressBlock label="Secretary's service address" addr={s.serviceAddress} />
          </div>
        ))}

        {/* Directors */}
        {directors.map((d: any, i: number) => (
          <div key={i} className="border-t pt-4 mt-4">
            <p className="text-xs font-bold text-emerald-700 mb-3">Director {i + 1}</p>
            <p className="text-xs font-semibold text-gray-500 mb-2">Personal Details</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
              <DI label="Title" value={cap(d.title)} />
              <DI label="Full Name" value={d.fullName} />
              <DI label="Surname" value={d.surname} />
              <DI label="Former Names" value={d.formerNames} />
              <DI label="Gender" value={cap(d.gender)} />
              <DI label="Date of Birth" value={fmtDate(d.dateOfBirth)} />
              <DI label="Nationality" value={cap(d.nationality)} />
              <DI label="Country" value={cap(d.country)} />
              <DI label="Occupation" value={d.occupation} />
              <DI label="Phone Number" value={d.phoneNumber} />
              <DI label="Email" value={d.emailAddress} />
              <DI label="Identity Type" value={d.identityType} />
              <DI label="Identity Number" value={d.identityNumber} />
            </div>
            <DocLink label="View Identity Document" url={d.identityDocumentUrl} />
            <AddressBlock label="Director's service address" addr={d.serviceAddress} />
            <AddressBlock label="Director's usual residential address" addr={d.residentialAddress} />
          </div>
        ))}
      </Section>

      {/* Share Capital */}
      <Section icon={Briefcase} title="Statement of Issued Share Capital">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <DI label="Total Issued Shares" value={data.totalNumberIssuedShares?.toLocaleString()} />
          <DI label="Nominal Value / Share" value={data.nominalValueOfEachShare ? `₦${data.nominalValueOfEachShare}` : "N/A"} />
          <DI label="Total Ordinary Shares" value={data.totalNumberOfOrdinaryShares?.toLocaleString()} />
          <DI label="Unpaid Ordinary Shares" value={data.totalAggregateUnpaidOrdinaryShares} />
          <DI label="Total Preference Shares" value={data.totalNumberOfPreferenceShares?.toLocaleString()} />
          <DI label="Unpaid Preference Shares" value={data.totalAggregateUnpaidPreferenceShares ?? "N/A"} />
        </div>
      </Section>

      {/* Shareholders */}
      {shareholders.length > 0 && (
        <Section icon={Users} title={`Shareholders (${shareholders.length})`}>
          {shareholders.map((s: any, i: number) => {
            const pd = s.personalDetails || s
            const sa = s.shareAllocation
            return (
              <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
                <p className="text-xs font-bold text-emerald-700 mb-3">Shareholder {i + 1}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  <DI label="Full Name" value={`${pd.firstName ?? ""} ${pd.surname ?? ""}`.trim()} />
                  <DI label="Email" value={pd.email} />
                  <DI label="Phone" value={pd.phoneNumber} />
                  <DI label="Gender" value={cap(pd.gender)} />
                  <DI label="Date of Birth" value={fmtDate(pd.dateOfBirth)} />
                  <DI label="Nationality" value={cap(pd.nationality || s.nationality)} />
                  <DI label="Occupation" value={pd.occupation} />
                  <DI label="Identity Type" value={pd.identityType} />
                  <DI label="Identity Number" value={pd.identityNumber} />
                </div>
                {pd.uploadedIdFileUrl && <DocLink label="View Identity Document" url={pd.uploadedIdFileUrl} />}
                {sa && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Share Allocation</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <DI label="Class of Share" value={cap(sa.classOfShare)} />
                      <DI label="Number of Shares" value={sa.numberOfShare} />
                      <DI label="Amount Per Share" value={sa.amountToPayEachShare ? `₦${sa.amountToPayEachShare}` : "N/A"} />
                      <DI label="Nominal Value" value={sa.nominalValueOfEachShare ? `₦${sa.nominalValueOfEachShare}` : "N/A"} />
                      <DI label="Total Aggregate Unpaid" value={sa.totalAggregateAmountUnpaid?.toLocaleString()} />
                    </div>
                  </div>
                )}
                <AddressBlock label="Service Address" addr={s.serviceAddress} />
                <AddressBlock label="Residential Address" addr={s.residentialAddress} />
              </div>
            )
          })}
        </Section>
      )}

      {/* PSC */}
      {pscs.length > 0 && (
        <Section icon={Users} title={`Persons with Significant Control (${pscs.length})`}>
          {pscs.map((p: any, i: number) => (
            <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
              <p className="text-xs font-bold text-purple-700 mb-3">Legal Entity PSC {i + 1}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                <DI label="Full Name" value={`${p.firstName ?? ""} ${p.surname ?? ""}`.trim()} />
                <DI label="Email" value={p.email} />
                <DI label="Title" value={p.title} />
                <DI label="Gender" value={p.gender} />
                <DI label="Date of Birth" value={fmtDate(p.dateOfBirth)} />
                <DI label="Nationality" value={p.nationality} />
                <DI label="Occupation" value={p.occupation} />
                <DI label="Country" value={p.country} />
                <DI label="Identity Type" value={p.identityType} />
                <DI label="Identity Number" value={p.identityNumber} />
                <DI label="Former Names" value={p.formerNames} />
                <DI label="PEP Status" value={p.pepStatus === "no" ? "No" : "Yes"} />
                <DI label="State Owned" value={p.isStateOwned === "no" ? "No" : "Yes"} />
                <DI label="Tax Residency" value={p.taxResidency} />
                <DI label="% Shares Held" value={p.percentageSharesHeld ? `${p.percentageSharesHeld}%` : "N/A"} />
                <DI label="% Voting Rights" value={p.percentageVotingRights ? `${p.percentageVotingRights}%` : "N/A"} />
                <DI label="Date PSC Became Such" value={fmtDate(p.datePscBecameSuch)} />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.interestShares && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5">Interest in Shares</span>}
                {p.interestVotingRights && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5">Voting Rights</span>}
                {p.interestAppointDirectors && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5">Appoint Directors</span>}
                {p.interestSignificantControl && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5">Significant Control</span>}
              </div>
              <DocLink label="View Identity Document" url={p.uploadedIdFileUrl} />
              <AddressBlock label="Service Address" addr={p.serviceAddress} />
              <AddressBlock label="Residential Address" addr={p.residentialAddress} />
            </div>
          ))}
        </Section>
      )}
    </>
  )
}

// ─── Business Name Section ────────────────────────────────────────

function BusinessNameSection({ data }: { data: any }) {
  const proprietors = data?.proprietors ?? []
  const pa = data?.principalAddress
  const ba = data?.branchAddress

  return (
    <>
      <Section icon={Building2} title="Business Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DI label="Business Name" value={data.businessName} />
          <DI label="Principal Business Activity" value={data.principalBusinessActivity} />
          <DI label="Commencement Date" value={fmtDate(data.businessCommencementDate)} />
          <DI label="BN Number" value={data.bnNumber} />
          <DI label="Registration Date" value={fmt(data.registrationDate)} />
        </div>
        {pa && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">Principal Address</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <DI label="Building" value={pa.buildingName} />
              <DI label="Street" value={pa.streetName} />
              <DI label="City" value={pa.city} />
              <DI label="State" value={pa.state} />
              <DI label="LGA" value={pa.lga} />
              <DI label="Postal Code" value={pa.postalCode} />
            </div>
          </>
        )}
        {ba && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">Branch Address</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <DI label="Building" value={ba.buildingName} />
              <DI label="Street" value={ba.streetName} />
              <DI label="City" value={ba.city} />
              <DI label="State" value={ba.state} />
              <DI label="LGA" value={ba.lga} />
              <DI label="Postal Code" value={ba.postalCode} />
            </div>
          </>
        )}
      </Section>

      {proprietors.length > 0 && (
        <Section icon={Users} title={`Proprietors (${proprietors.length})`}>
          {proprietors.map((p: any, i: number) => (
            <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
              <p className="text-xs font-bold text-emerald-700 mb-3">Proprietor {i + 1}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                <DI label="First Name" value={p.firstName} />
                <DI label="Surname" value={p.surname} />
                <DI label="Other Name" value={p.otherName} />
                <DI label="Former Name" value={p.formerName} />
                <DI label="Type" value={p.proprietorType?.replace(/-/g, " ")} />
                <DI label="Gender" value={cap(p.gender)} />
                <DI label="Date of Birth" value={fmtDate(p.dateOfBirth)} />
                <DI label="Nationality" value={cap(p.nationality)} />
                <DI label="Former Nationality" value={cap(p.formerNationality)} />
                <DI label="Occupation" value={p.occupation} />
                <DI label="Phone" value={p.phoneNumber} />
                <DI label="Email" value={p.email} />
                <DI label="ID Type" value={p.idType} />
                <DI label="ID Number" value={p.idNumber} />
              </div>
              <DocLink label="View Identity Document" url={p.idDocumentUrl} />
            </div>
          ))}
        </Section>
      )}
    </>
  )
}

// ─── LLP Section ─────────────────────────────────────────────────

function LLPSection({ data }: { data: any }) {
  const partners = data?.partners ?? []
  const pscs = data?.pscs ?? []

  return (
    <>
      <Section icon={Building2} title="LLP Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DI label="LLP Name" value={data.llpName} />
          <DI label="Principal Business Activity" value={data.principalBusinessActivity} />
          <DI label="Email" value={data.email} />
          <DI label="Phone" value={data.phoneCode ? `+${data.phoneCode} ${data.phoneNumber}` : data.phoneNumber} />
          <DI label="All Partners Designated" value={data.allPartnersDesignated === "yes" ? "Yes" : "No"} />
          <DI label="Head Office Same as Registered" value={data.headOfficeSameAsRegistered ? "Yes" : "No"} />
          <DI label="LLP Number" value={data.llpNumber} />
          <DI label="Registration Date" value={fmt(data.registrationDate)} />
        </div>
      </Section>

      {partners.length > 0 && (
        <Section icon={Users} title={`Partners (${partners.length})`}>
          {partners.map((p: any, i: number) => (
            <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
              <p className="text-xs font-bold text-emerald-700 mb-3">Partner {i + 1}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DI label="Name" value={`${p.title ?? ""} ${p.firstName ?? ""} ${p.surname ?? ""}`.trim()} />
                <DI label="Email" value={p.email} />
                <DI label="Phone" value={p.phone ? `+${p.phone.code} ${p.phone.number}` : "N/A"} />
                <DI label="Occupation" value={p.occupation} />
                <DI label="Nationality" value={p.nationality} />
                <DI label="Identity Type" value={p.identityType} />
                <DI label="Identity Number" value={p.identityNumber} />
                {p.isDesignatedPartner !== undefined && (
                  <DI label="Designated Partner" value={p.isDesignatedPartner ? "Yes" : "No"} />
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {pscs.length > 0 && (
        <Section icon={Users} title={`Persons with Significant Control (${pscs.length})`}>
          {pscs.map((p: any, i: number) => (
            <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DI label="Name" value={`${p.title ?? ""} ${p.firstName ?? ""} ${p.surname ?? ""}`.trim()} />
                <DI label="Email" value={p.pscEmail} />
                <DI label="Gender" value={p.gender} />
                <DI label="Nationality" value={p.nationality} />
                <DI label="Occupation" value={p.occupation} />
                <DI label="Date of Birth" value={fmtDate(p.dateOfBirth)} />
                <DI label="Identity Type" value={p.identityType} />
                <DI label="Identity Number" value={p.identityNumber} />
                <DI label="Politically Exposed" value={p.isPoliticallyExposedPerson === "yes" ? "Yes" : "No"} />
                <DI label="State Owned Entity" value={p.isStateOwnedEnterprise === "yes" ? "Yes" : "No"} />
              </div>
            </div>
          ))}
        </Section>
      )}
    </>
  )
}

// ─── LP Section ───────────────────────────────────────────────────

function LPSection({ data }: { data: any }) {
  const partners = data?.partners ?? []

  return (
    <>
      <Section icon={Building2} title="LP Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DI label="LP Name" value={data.lpName} />
          <DI label="Name Ending" value={data.nameEnding} />
          <DI label="General Nature of Business" value={data.generalNatureOfBusiness} />
          <DI label="Email" value={data.email} />
          <DI label="Phone" value={data.phoneCode ? `${data.phoneCode} ${data.phoneNumber}` : data.phoneNumber} />
          <DI label="Partner Type" value={cap(data.partnerType)} />
          <DI label="Partnership Deed" value={data.partnershipDeed?.replace(/_/g, " ")} />
          <DI label="LP Number" value={data.lpNumber} />
          <DI label="Registration Date" value={fmt(data.registrationDate)} />
        </div>
      </Section>

      {partners.length > 0 && (
        <Section icon={Users} title={`Partners (${partners.length})`}>
          {partners.map((p: any, i: number) => {
            const ind = p.individual
            return (
              <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
                <p className="text-xs font-bold text-emerald-700 mb-3">
                  Partner {i + 1} — <span className="text-gray-500">{cap(p.partnerCategory)}</span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                  <DI label="Contribution Type" value={cap(p.contributionType)} />
                  <DI label="Contribution Value" value={p.contributionValue} />
                </div>
                {ind && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                      <DI label="First Name" value={ind.firstName} />
                      <DI label="Surname" value={ind.surname} />
                      <DI label="Other Names" value={ind.otherNames} />
                      <DI label="Former Names" value={ind.formerNames} />
                      <DI label="Gender" value={cap(ind.gender)} />
                      <DI label="Date of Birth" value={fmtDate(ind.dob)} />
                      <DI label="Nationality" value={cap(ind.nationality)} />
                      <DI label="Former Nationality" value={cap(ind.formerNationality)} />
                      <DI label="Occupation" value={ind.occupation} />
                      <DI label="Phone" value={ind.phoneNumber ? `${ind.phoneNumber.code} ${ind.phoneNumber.number}` : "N/A"} />
                      <DI label="Email" value={ind.email} />
                      <DI label="Identity Type" value={ind.identityType} />
                      <DI label="Identity Number" value={ind.identityNumber} />
                    </div>
                    <AddressBlock label="Service Address" addr={ind.serviceAddress} />
                    <AddressBlock label="Residential Address" addr={ind.residentialAddress} />
                  </>
                )}
              </div>
            )
          })}
        </Section>
      )}
    </>
  )
}

// ─── Incorporated Trustees Section ───────────────────────────────

function IncorporatedTrusteesSection({ data }: { data: any }) {
  const trustees = data?.trustees ?? []
  const sec = data?.secretary

  return (
    <>
      <Section icon={Building2} title="Organization Information">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DI label="Trustees Name" value={data.trusteesName} />
          <DI label="Classification" value={data.classificationOfAssociation} />
          <DI label="Affiliation Details" value={data.affiliationDetails} />
          <DI label="IT Number" value={data.itNumber} />
          <DI label="Registration Date" value={fmt(data.registrationDate)} />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <DocLink label="Common Seal" url={data.commonSealUpload} />
          <DocLink label="Minutes of Meeting" url={data.minutesOfMeeting} />
          <DocLink label="Organization Constitution" url={data.organizationConstitution} />
          <DocLink label="Declaration by Trustee" url={data.declarationByTrustee} />
        </div>
      </Section>

      {trustees.length > 0 && (
        <Section icon={Users} title={`Trustees (${trustees.length})`}>
          {trustees.map((t: any, i: number) => (
            <div key={i} className={`${i > 0 ? "border-t pt-4 mt-4" : ""}`}>
              <p className="text-xs font-bold text-emerald-700 mb-3">Trustee {i + 1}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                <DI label="First Name" value={t.firstName} />
                <DI label="Surname" value={t.surname} />
                <DI label="Gender" value={t.gender} />
                <DI label="Date of Birth" value={fmtDate(t.dateOfBirth)} />
                <DI label="Nationality" value={t.nationality} />
                <DI label="Occupation" value={t.occupation} />
                <DI label="Former Names" value={t.formerNames} />
                <DI label="Phone" value={t.phoneNumber ? `+${t.phoneNumber.code} ${t.phoneNumber.number}` : "N/A"} />
                <DI label="Email" value={t.email} />
                <DI label="Identity Type" value={t.identityType} />
                <DI label="Identity Number" value={t.identityNumber} />
                <DI label="Consent" value={t.consent ? "Given" : "Not Given"} />
              </div>
              <div className="flex gap-2 flex-wrap">
                <DocLink label="View Identity Document" url={t.uploadedId} />
                <DocLink label="Passport Photo" url={t.passportPhoto} />
              </div>
              <AddressBlock label="Service Address" addr={t.serviceAddress} />
              <AddressBlock label="Residential Address" addr={t.residentialAddress} />
            </div>
          ))}
        </Section>
      )}

      {sec && (
        <Section icon={Users} title="Secretary">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
            <DI label="Surname" value={sec.surname} />
            <DI label="Other Names" value={sec.otherNames} />
            <DI label="Email" value={sec.email} />
            <DI label="Phone" value={sec.phoneNumber ? `+${sec.phoneNumber.code} ${sec.phoneNumber.number}` : "N/A"} />
          </div>
          <AddressBlock label="Service Address" addr={sec.serviceAddress} />
        </Section>
      )}
    </>
  )
}

// ─── Dialogs ──────────────────────────────────────────────────────

function ApproveDialog({ open, onClose, onConfirm, entityName, isSubmitting }: any) {
  const [notes, setNotes] = useState("")
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle className="text-xl font-semibold">Approve Application</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm"><span className="font-medium">Application:</span> {entityName}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Approval Notes (Optional)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
              placeholder="Add any notes or special conditions..." className="resize-none text-sm" disabled={isSubmitting} />
          </div>
          <div className="bg-green-50/50 border border-green-100 rounded-lg p-4">
            <p className="font-medium text-gray-900 text-sm mb-2">Upon approval:</p>
            <ul className="space-y-1 text-sm text-gray-700">
              {["Certificate of Incorporation will be auto-generated", "Registration number will be assigned", "Applicant will be notified via email"].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => onConfirm()} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Confirm Approval"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function QueryDialog({ open, onClose, onConfirm, isSubmitting }: any) {
  const [reason, setReason] = useState("")
  const [message, setMessage] = useState(`Dear Applicant,\n\nYour registration application requires additional documentation.\n\nPlease submit:\n\n- [List required documents]\n\nSubmit all documents within 5 business days to avoid application expiry.\n\nRegards,\nCAC Admin`)
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle className="text-xl font-semibold">Query Application</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Reason for query <span className="text-red-500">*</span></Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter reason for query" disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Query Message</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={10} className="resize-none text-sm" disabled={isSubmitting} />
          </div>
        </div>
        <DialogFooter className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button className="bg-red-100 text-red-700 hover:bg-red-200 border-0" onClick={() => onConfirm(reason)} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Confirm Query"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function RejectDialog({ open, onClose, onConfirm, isSubmitting }: any) {
  const [reason, setReason] = useState("")
  const [message, setMessage] = useState("")
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle className="text-xl font-semibold">Reject Application</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Reason for rejection <span className="text-red-500">*</span></Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter reason for rejection" disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Rejection Message</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6}
              placeholder="Provide a formal explanation. This will be sent to the applicant." className="resize-none text-sm" disabled={isSubmitting} />
          </div>
        </div>
        <DialogFooter className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => onConfirm(reason)} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Processing...</> : "Confirm Rejection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Component ────────────────────────────────────────────────

export default function RegistrationViewDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id } = use(params)
  const type = searchParams.get("type") || "company"

  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeDialog, setActiveDialog] = useState<"approve" | "reject" | "query" | null>(null)

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
      const result = await registrationsAPI.getRegistrationById(type, id)
      setData(result)
    } catch (error: any) {
      toast.error("Failed to load registration details", {
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
      await registrationsAPI.approveRegistration(type, id)
      toast.success("Registration approved successfully")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to approve", { description: error.response?.data?.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async (reason: string) => {
    if (!reason.trim()) { toast.error("Please provide a reason"); return }
    setIsSubmitting(true)
    try {
      await registrationsAPI.rejectRegistration(type, id, { reason })
      toast.success("Registration rejected")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to reject", { description: error.response?.data?.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuery = async (reason: string) => {
    if (!reason.trim()) { toast.error("Please provide a reason"); return }
    setIsSubmitting(true)
    try {
      await registrationsAPI.queryRegistration(type, id, { reason })
      toast.success("Query sent successfully")
      setActiveDialog(null)
      fetchData()
    } catch (error: any) {
      toast.error("Failed to send query", { description: error.response?.data?.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <PageLoader />
  if (!data) return <div className="p-10 text-center text-red-500 font-bold">Registration not found.</div>

  const status = data.registrationStatus || data.status || "N/A"
  const entityName = data.companyName || data.businessName || data.llpName || data.lpName || data.trusteesName || "This registration"
  const regNumber = data.rcNumber || data.bnNumber || data.llpNumber || data.lpNumber || data.itNumber

  const typeLabel: Record<string, string> = {
    company: "Company Registration",
    business_name: "Business Name Registration",
    llp: "LLP Registration",
    lp: "LP Registration",
    incorporated_trustees: "Incorporated Trustees Registration",
  }

  return (
    <div>
      <PageHeader title={typeLabel[type] || "Registration"} />

      {/* Dialogs */}
      <ApproveDialog open={activeDialog === "approve"} onClose={() => setActiveDialog(null)}
        onConfirm={handleApprove} entityName={entityName} isSubmitting={isSubmitting} />
      <QueryDialog open={activeDialog === "query"} onClose={() => setActiveDialog(null)}
        onConfirm={handleQuery} isSubmitting={isSubmitting} />
      <RejectDialog open={activeDialog === "reject"} onClose={() => setActiveDialog(null)}
        onConfirm={handleReject} isSubmitting={isSubmitting} />

      <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800 pt-24">

        <Button variant="outline" size="lg" className="mb-3" onClick={handleBack}>
          <ArrowLeft size={18} />
          <span className="font-medium">Back</span>
        </Button>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-lg font-medium">{typeLabel[type] || "Registration"}</CardTitle>
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

          <div className="p-6 space-y-4">
            {/* Application Details */}
            <Section icon={FileText} title="Application Details" collapsible={false}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DI label="AV Code" value={data.applicationReservation?.avCode} />
                <DI label="Status" value={
                  <Badge variant="outline" className={getStatusClass(status)}>{status}</Badge>
                } />
                <DI label="Submission Date" value={fmt(data.createdAt)} />
                <DI label="Approval Date" value={data.registrationDate ? fmt(data.registrationDate) : "N/A"} />
                <DI label="Applicant Name" value={data.ownedBy ? `${data.ownedBy.firstName} ${data.ownedBy.lastName}` : "N/A"} />
                <DI label="Applicant Type" value={data.ownedBy?.roles?.[0] ?? "N/A"} />
                {regNumber && <DI label="Registration Number" value={regNumber} />}
                {data.rejectionReason && (
                  <div className="col-span-3 bg-red-50 border border-red-100 rounded p-3">
                    <p className="text-xs text-red-500 mb-1">Rejection Reason</p>
                    <p className="text-sm text-red-700">{data.rejectionReason}</p>
                  </div>
                )}
              </div>
            </Section>

            {/* Reservation Banner */}
            {data.applicationReservation && <ReservationBanner res={data.applicationReservation} />}

            {/* Type-specific sections */}
            {type === "company" && <CompanySection data={data} />}
            {type === "business_name" && <BusinessNameSection data={data} />}
            {type === "llp" && <LLPSection data={data} />}
            {type === "lp" && <LPSection data={data} />}
            {type === "incorporated_trustees" && <IncorporatedTrusteesSection data={data} />}
          </div>
        </div>
      </div>
    </div>
  )
}