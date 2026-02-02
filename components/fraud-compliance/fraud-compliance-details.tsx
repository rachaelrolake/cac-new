"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, FileText, ChevronDown, Bot, CheckCircle2, CircleSlash } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation"
import { getStatusColor } from "../reusables/status-color"

const caseDetails = {
  description: "Suspected identity fraud in company registration. The beneficial owners provided falsified identification documents during the registration process.",
  evidence: ["Inconsistent address Record", "Falsified ID", "Multiple registrations with same details"],
  documents: [
    { name: "National ID.pdf", size: "200 KB" },
    { name: "National ID.pdf", size: "200 KB" },
    { name: "National ID.pdf", size: "200 KB" },
  ],
  notes: [
    "Initial review confirms discrepancies in submitted documents. Cross-referencing with national ID database in progress.",
    "Initial review confirms discrepancies in submitted documents. Cross-referencing with national ID database in progress.",
    "Initial review confirms discrepancies in submitted documents. Cross-referencing with national ID database in progress.",
  ],
  logs: [
    { action: "Admin Marked as resolved", date: "Nov, 5 2025 at 09:35AM", status: "completed" },
    { action: "James Ibori added a new note", date: "Nov, 5 2025 at 09:35AM", status: "completed" },
    { action: "James Ibori added a note", date: "Nov, 5 2025 at 09:35AM", status: "completed" },
    { action: "System Assigned to Inspector James Ibori", date: "Nov, 5 2025 at 09:35AM", status: "completed" },
    { action: "Case Submitted", date: "Nov, 5 2025 at 09:34AM", status: "pending" },
  ],
  caseSummary: {
    caseId: "CC-2026-001",
    status: "Under Investigation",
    organization: "JAGORA VENTURES LIMITED",
    type: "Fraud",
    priority: "High",
    dateSubmitted: "Nov 14, 2025 09:12AM",
    reporter: "Ai: Recommendation"
  }
}


export function FraudComplianceDetails() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="lg" className="gap-2" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          Export Report <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <Card className="mx-auto space-y-6 p-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-5">Case Details</h1>

          {/* Section 1: Business Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6 pt-0">
              <div className="col-span-1 pb-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Business Name</p>
                <div className="flex items-center gap-2 font-semibold">
                  <div className="p-1 bg-gray-100 rounded">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  GLOBAL VENTURES
                </div>
              </div>

              <div className="grid grid-cols-4 gap-y-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">RC Number</p>
                  <p className="font-medium mt-1">RC-0946474</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Case Number</p>
                  <p className="font-medium mt-1">CC-2024-001</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Status</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className={getStatusColor("Blue")}>
                      Under Investigation
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor("Suspended")}>
                      Fraud
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Assigned</p>
                  <p className="font-medium mt-1">
                    <div className="flex gap-2 items-center">
                      <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center">
                        <img src="/images/Avatar.png" alt="avatar" />
                      </div>
                      <span className="text-sm text-gray-500">Inspector James Ibori</span>
                    </div>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Payer Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6 pt-0 grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Reporter</p>
                <p className="font-medium mt-1">John Doe</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Email Address</p>
                <p className="font-medium mt-1">jdoe@gmail.com</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Phone Number</p>
                <p className="font-medium mt-1">09065342516</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm mb-4 border" style={{ borderColor: "#125DDB", backgroundColor: "#E8EFFC" }}>
            <CardHeader className="space-y-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1 rounded-md">
                  <Bot className="w-4 h-4 text-blue-800" />
                </div>
                <h2 className="font-semibold text-slate-800">AI Analysis</h2>
              </div>

              <Badge variant="outline" className="w-fit bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                AI: Recommendation
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Confidence Score Section */}
              <div className="bg-white p-6 rounded-lg shadow-none">
                <p className="text-sm font-medium text-muted-foreground mb-2">Confidence Score</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">94%</span>
                  <span className="text-emerald-600 font-semibold text-sm">High Confidence</span>
                </div>
              </div>

              {/* Compliance Issues Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-red-500 uppercase tracking-tight">Compliance Issues</h3>
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border group">
                  <p className="text-sm text-slate-600">
                    Company failed to submit annual returns for 3 consecutive years. Non-compliance with statutory filing requirements.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 shrink-0 ml-4">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold">Passed</span>
                  </div>
                </div>
              </div>

              {/* Evidence Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight">Evidence</h3>

                <div className="space-y-2">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                    <p className="text-sm text-slate-600">Missing annual returns 2021-2023</p>
                    <span className="text-xs font-bold text-emerald-600">NONE</span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                    <p className="text-sm text-slate-600">Unresponsive to communication</p>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold">Passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Service Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6 pt-0 grid grid-cols-2 gap-y-6">
              <Tabs defaultValue="case" className="w-full">
                {/* Tab Navigation */}
                <TabsList className="bg-slate-100 p-1 mb-8">
                  <TabsTrigger value="case" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Case</TabsTrigger>
                  <TabsTrigger value="uploads">Uploads</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                </TabsList>

                {/* Tab 1: Case Description */}
                <TabsContent value="case">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 mb-2">Case Description</h4>
                      <p className="text-slate-800 leading-relaxed">{caseDetails.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 mb-2">Evidence</h4>
                      <ul className="space-y-2">
                        {caseDetails.evidence.map((item, i) => (
                          <li key={i} className="text-slate-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Uploads */}
                <TabsContent value="uploads">
                  <h4 className="text-lg font-bold mb-4">Documents</h4>
                  <div className="space-y-3">
                    {caseDetails.documents.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-slate-400">{doc.size}</p>
                          </div>
                        </div>
                        <button className="text-green-700 text-sm font-semibold hover:underline">Click to view</button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Tab 3: Notes */}
                <TabsContent value="notes">
                  <div className="space-y-4">
                    {caseDetails.notes.map((note, i) => (
                      <Card key={i} className="bg-gray-100 border-none shadow-none">
                        <CardContent className="">
                          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Investigation Notes</p>
                          <p className="text-slate-700">{note}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Tab 4: Logs */}
                <TabsContent value="logs">
                  <h4 className="text-lg font-bold mb-6">Logs</h4>
                  <div className="relative space-y-8 left-2">
                    {caseDetails.logs.map((log, i) => (
                      <div key={i} className="flex gap-4 relative">
                        {/* Timeline connector line */}
                        {i !== caseDetails.logs.length - 1 && (
                          <div className="absolute left-1.5 top-5 w-[1px] h-12 bg-slate-200" />
                        )}
                        <div className={`mt-1.5 h-3 w-3 rounded-full shrink-0 ${log.status === 'completed' ? 'bg-green-600' : 'bg-orange-400'}`} />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{log.action}</p>
                          <p className="text-xs text-slate-400 mt-1">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" className="px-8 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
              Cancel
            </Button>
            <Button variant="default">
              Mark as Resolved
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
