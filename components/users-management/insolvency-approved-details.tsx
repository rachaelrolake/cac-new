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

export default function ApprovedInsolvencyDetails() {
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
                    { label: "Agent ID", value: "ACC-2023-1245" },
                    { label: "Account Status", value: "Active", status: true },
                    { label: "Name", value: "Oluwaseun Ajayi" },
                    { label: "RC Number", value: "RC-1234567" },
                    { label: "Email", value: "seun.ajayi@ajayicorp.com" },
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

        </Tabs>
      </Card>
    </>
  )
}


