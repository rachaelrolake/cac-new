"use client"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, ChevronRight, Download, Filter } from "lucide-react";
import { useState } from "react";
import { UserActionDialog } from "../reusables/action-dialog";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export default function ApprovedAccreditedDetails() {
  const router = useRouter()
  const params = useParams()
  const [activeDialog, setActiveDialog] = useState<"suspend" | "deactivate" | null>(null)

  return (
    <>
      {/* Suspend Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "suspend"}
        onClose={() => setActiveDialog(null)}
        title="Suspend user?"
        description="Are you sure you want to suspend this user?"
        confirmText="Suspend User"
        onConfirm={() => { console.log("Suspended"); setActiveDialog(null); }}
      />

      {/* deactivate Dialog */}
      <UserActionDialog
        isOpen={activeDialog === "deactivate"}
        onClose={() => setActiveDialog(null)}
        title="Deactivate user account?"
        description="Are you sure you want to deactivate user account? Note that this will not delete the user details from the database."
        confirmText="Deactivate Account"
        onConfirm={() => { console.log("deactivated"); setActiveDialog(null); }}
      />
      {/* Tabs System */}
      <Card>
        <Tabs defaultValue="user-details" className="w-full space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-lg border-gray-200 m-4">
            <TabsTrigger
              value="user-details"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              User Details
            </TabsTrigger>
            <TabsTrigger
              value="activity-log"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Activity Log
            </TabsTrigger>
            <TabsTrigger
              value="filing-history"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Filing History
            </TabsTrigger>
            <TabsTrigger
              value="other-admins"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Other Admins
            </TabsTrigger>
          </TabsList>

          {/* --- Tab 1: User Details --- */}
          <TabsContent value="user-details">
            <div className="border-gray-200 shadow-none">
              <CardHeader className="flex justify-between">
                <CardTitle className="text-base font-semibold">User Details</CardTitle>

                <div className="flex gap-3">
                  <Button
                    variant="outlineprimary"
                    size="lg"
                    onClick={() => setActiveDialog("suspend")}
                  >
                    Suspend User
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => setActiveDialog("deactivate")}
                  >
                    Deactivate Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Agent ID", value: "AGT-2024-001" },
                    { label: "Account Status", value: "Active", status: true },
                    { label: "Name", value: "Premier Corporate Services Ltd" },
                    { label: "RC Number", value: "RC-1234567" },
                    { label: "Email", value: "premier.corp@example.com" },
                    { label: "Phone", value: "+234 812 345 6789" },
                    { label: "Accreditation Date", value: "Jan 15, 2023" },
                    { label: "Last Login", value: "2026-01-13 09:30" },
                    { label: "2FA Status", value: "Enabled", status: true },
                    { label: "Total Filings", value: "543" },
                    { label: "Complaints", value: "2" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-100/50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">{item.label}</span>
                      <div className="text-sm font-medium mt-1 flex items-center gap-2">
                        {item.status && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-5" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Succes Rate", value: "98.5%" },
                    { label: "Average Processing Time", value: "2.3 days" },
                    { label: "Customer Satisfaction", value: "4.7/5.0" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-100/50 rounded-lg">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">{item.label}</span>
                      <div className="text-sm font-medium mt-1 flex items-center gap-2">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </TabsContent>

          {/* --- Tab 2: Activity Log --- */}
          <TabsContent value="activity-log" className="space-y-4 p-4">
            <div className="flex justify-between items-center">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search logs..." className="pl-10" />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-16">S/N</TableHead>
                    <TableHead>Activity Description</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <TableRow key={n}>
                      <TableCell className="p-4">{n}</TableCell>
                      <TableCell className="text-gray-500">Logged In</TableCell>
                      <TableCell className="font-medium text-gray-900">User Login - Web Portal</TableCell>
                      <TableCell className="text-gray-500">192.168.1.{n * 10}</TableCell>
                      <TableCell>14:32:01</TableCell>
                      <TableCell className="text-right">Jan 24, 2026</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* --- Tab 3: Filing History --- */}
          <TabsContent value="filing-history" className="p-4">
            <div className="border-gray-200 shadow-none overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span className="font-semibold text-sm">Recent Filings</span>
                <Button variant="ghost" size="sm" className="text-emerald-700">View All</Button>
              </div>
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Filing Type</TableHead>
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Filed By</TableHead>
                    <TableHead className="text-right">Filing Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="p-4">Annual Return 2025</TableCell>
                    <TableCell className="p-4">Global Tech Solutions</TableCell>
                    <TableCell className="p-4">Company</TableCell>
                    <TableCell className="p-4">Adeola Williams</TableCell>
                    <TableCell className="text-right p-4">12/04/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-4">Annual Return 2025</TableCell>
                    <TableCell className="p-4">QoreBox Tech Solutions</TableCell>
                    <TableCell className="p-4">Company</TableCell>
                    <TableCell className="p-4">Adeola Williams</TableCell>
                    <TableCell className="text-right p-4">12/04/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-4">Annual Return 2025</TableCell>
                    <TableCell className="p-4">Google Solutions</TableCell>
                    <TableCell className="p-4">Business Name</TableCell>
                    <TableCell className="p-4">Adeola Williams</TableCell>
                    <TableCell className="text-right p-4">12/04/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-4">Annual Return 2025</TableCell>
                    <TableCell className="p-4">Sunti LTD</TableCell>
                    <TableCell className="p-4">Limited Liability Partnership</TableCell>
                    <TableCell className="p-4">Adeola Williams</TableCell>
                    <TableCell className="text-right p-4">12/04/2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* --- Tab 4: Other Admins --- */}
          <TabsContent value="other-admins" className="p-4">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-700">S/N</TableHead>
                  <TableHead className="font-semibold text-gray-700">Officer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Role</TableHead>
                  <TableHead className="font-semibold text-gray-700">Companies</TableHead>
                  <TableHead className="font-semibold text-gray-700">Total Filings</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Adeola Williams", email: "adeola@firm.com", role: "Senior Admin", filings: 142, status: "Active" },
                  { name: "John Doe", email: "john@firm.com", role: "Editor", filings: 89, status: "Active" },
                  { name: "Sarah Smith", email: "sarah@firm.com", role: "Viewer", filings: 12, status: "Inactive" },
                ].map((admin, i) => (
                  <TableRow key={i} className="hover:bg-slate-50/50">
                    <TableCell className="text-sm font-medium text-gray-900">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-xs text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{admin.role}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-900">{admin.filings}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-900">{admin.filings}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-semibold ${admin.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-gray-50 text-gray-600 border-gray-100"
                          }`}
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      2025-11-10 09:00
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  )
}


