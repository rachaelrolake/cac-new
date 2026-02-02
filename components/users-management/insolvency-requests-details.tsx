"use client"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Building2, Upload } from "lucide-react";



export default function RequestsInsolvencyDetails() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accreditation Request </h1>
        <div className="flex gap-3">
          <ActionDialog type="reject" />
          <ActionDialog type="query" />
          <ActionDialog type="approve" />
          <Button variant="outline" className="border-green-700 text-green-700">
            View Query Messages
          </Button>
        </div>
      </div>

      {/* Firm Details Section */}
      <DetailCard title="Personal Details" icon={<Building2 className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataField label="Surname" value="Bello" />
          <DataField label="First Name" value="John" />
          <DataField label="Date of Birth" value="01/01/1998" />
          <DataField label="Gender" value="Male" />
          <DataField label="Nationality" value="Nigerian" />
        </div>
        <div className="mt-6">
          <p className="font-semibold text-sm mb-4">Account Details</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataField label="Official Email" value="williams.associates@mail.com" />
            <DataField label="Phone number" value="+234 916 0060 132" />
            <DataField label="Identity Type" value="National ID" />
            <DataField label="Identity Number" value="1234566780" />
            <DataField label="Professional Body" value="NBA" />
            <DataField label="Occupation/Job Description" value="Barister" />
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold text-sm mb-4">Office address</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataField label="State" value="Kano" />
            <DataField label="LGA" value="Nassarawa" />
            <DataField label="City/Town/Village" value="Kano" />
            <DataField label="Post Code (optional)" value="123456" />
            <DataField label="House Number/Building Name" value="123" />
            <DataField label="Street Name" value="Dangote Street" />
          </div>
        </div>
      </DetailCard>

      {/* Principal Officers Section */}
      <DetailCard title="Declaration" icon={<User className="w-5 h-5 text-green-600" />}>
        <div className="mb-5">
          <h3 className="font-bold">Accuracy & Undertaking</h3>
          <p className="text-sm text-gray-600 italic md:w-[800px]">I hereby certify that the foregoing particulars are to the best of my knowledge, information and belief, correct, and I undertake to notify the Registrar-General whenever any change occurs.</p>
        </div>

        <div className="mb-5">
          <h3 className="font-bold">Confirmation of Provided Information</h3>
          <p className="text-sm text-gray-600 italic md:w-[800px]">I confirm that all information and documents submitted in this application are true, complete, and accurate.</p>
        </div>

        <div className="mb-5">
          <h3 className="font-bold">Accreditation Withdrawal Acknowledgement</h3>
          <p className="text-sm text-gray-600 italic md:w-[800px]">I acknowledge that my accreditation may be withdrawn by the Corporate Affairs Commission if I am no longer fit and proper.</p>
        </div>

        <div className="mb-5">
          <h3 className="font-bold">CAMA Section 862 Warning</h3>
          <p className="text-sm text-gray-600 italic md:w-[800px]">I acknowledge that under Section 862 of the Companies and Allied Matters Act (CAMA), false statements or misrepresentation are punishable by fine or imprisonment.</p>
        </div>
      </DetailCard>

      {/* Uploads Section */}
      <DetailCard title="Uploads" icon={<Upload className="w-5 h-5 text-green-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FilePreview label="Certificate of Incorporation" />
          <FilePreview label="Evidence of membership" />
          <FilePreview label="Proof of Practicing Fees for the Current Year" />
          <FilePreview label="Principal Officer's ID Document" />
          <FilePreview label="Principal Officer's ID Signature" />
        </div>
      </DetailCard>
    </>
  )
}

// --- Sub-Components ---

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-800 italic">{value}</p>
    </div>
  );
}

function DetailCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="border-gray-200">
      <CardHeader className="flex flex-row items-center gap-2 border-b bg-gray-50/30 py-4">
        {icon}
        <CardTitle className="text-base font-bold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}

function FilePreview({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <div className="flex items-center gap-3 p-4 border rounded-lg bg-white group cursor-pointer hover:border-green-500 transition-colors">
        <div className="bg-gray-100 p-2 rounded">
          <FileText className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium">HannahBusing_Resume.pdf</p>
          <p className="text-[10px] text-gray-400">200 KB</p>
          <p className="text-[10px] text-green-600 font-bold mt-1">Click to view</p>
        </div>
      </div>
    </div>
  );
}

function ActionDialog({ type }: { type: "approve" | "query" | "reject" }) {
  const config = {
    approve: { label: "Approve", btnClass: "bg-green-700 hover:bg-green-800", title: "Approve Agent Account", confirm: "Approve" },
    query: { label: "Query", btnClass: "bg-orange-600 hover:bg-orange-700", title: "Query Accreditation Request", confirm: "Confirm" },
    reject: { label: "Reject", btnClass: "bg-red-600 hover:bg-red-700", title: "Reject Application", confirm: "Confirm" },
  };

  const current = config[type];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={current.btnClass}>{current.label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">{current.title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {type === "query" ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Enter your query message for "Williams & Associates"?</p>
              <Textarea placeholder="Enter your query message..." className="min-h-[120px]" />
            </div>
          ) : (
            <p className="text-sm text-gray-500 leading-relaxed">
              Are you sure you want to {type === "approve" ? "accredited" : "reject"}
              <span className="font-semibold block mt-1">"Williams & Associates"?</span>
            </p>
          )}
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="border-green-700 text-green-700 flex-1 sm:flex-none">Cancel</Button>
          </DialogClose>
          <Button className={`${current.btnClass} flex-1 sm:flex-none`}>
            {current.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}