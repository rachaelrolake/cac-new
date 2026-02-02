"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Search, X, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserActionDialog } from "../reusables/action-dialog"


const details = [
  { label: "First Name", value: "Sule" },
  { label: "Surname", value: "Madu" },
  { label: "Email", value: "sulemadu@example.com" },
  { label: "Phone number", value: "09160049129" },
  { label: "Account Status", value: "Active", icon: true },
  { label: "Date Created", value: "Jan 15, 2023" },
]

export default function PublicUsersDetails() {
  const params = useParams()
  const [activeDialog, setActiveDialog] = useState<"suspend" | "deactivate" | null>(null)

  return (
    <>
      {/* Header section */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-xl font-bold">User Details</CardTitle>
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
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {details.map((item) => (
            <div key={item.label} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <div className="flex items-center gap-2">
                {item.icon && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                <p className="font-medium text-sm text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>


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

      {/* Bottom Section */}
      <Card>
        <Tabs defaultValue="activity" className="w-full">
          <div className="px-6 pt-6 border-b">
            <CardTitle className="text-lg font-bold mb-4">Activity Log</CardTitle>

            <div className="relative my-4 w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>

          <div className="px-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-16">S/N</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Timestamps</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 7 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="p-5">{i + 1}</TableCell>
                    <TableCell className="p-5">Logged In</TableCell>
                    <TableCell className="p-5">10:01 AM</TableCell>
                    <TableCell className="p-5">10 Nov. 2024</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination controls would go here */}
        </Tabs>
      </Card>
    </>
  )
}
