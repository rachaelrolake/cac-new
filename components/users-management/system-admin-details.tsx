"use client"
import { useRouter, useParams } from "next/navigation"
import { Search, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const permissionsData = [
  { title: "Dashboard", access: "Full Access" },
  { title: "User Management", access: "Read only" },
  { title: "Pre-Incorporation", access: "Read only" },
  { title: "Post-Incorporation", access: "No Access" },
  { title: "System Configuration", access: "No Access" },
  { title: "Transactions", access: "View only" },
  { title: "Fraud & Compliance", access: "View only" },
  { title: "Reports", access: "Full Access" },
  { title: "Activity", access: "Read only" },
  { title: "Customers Support", access: "Full Access" },
  { title: "Settings", access: "Full Access" },
]

const details = [
  { label: "First Name", value: "Sule" },
  { label: "Surname", value: "Madu" },
  { label: "Email", value: "sulemadu@example.com" },
  { label: "Phone number", value: "09160049129" },
  { label: "Account Status", value: "Active", icon: true },
  { label: "Date Created", value: "Jan 15, 2023" },
]

export default function SystemAdminDetails() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id

  return (
    <>
      {/* Header section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-bold">User Details</CardTitle>
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

      {/* Bottom Section */}
      <Card>
        <Tabs defaultValue="activity" className="w-full">
          <div className="px-6 pt-6 border-b">
            <CardTitle className="text-lg font-bold mb-4">Activity Log</CardTitle>
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Activity</TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                Permissions</TabsTrigger>
            </TabsList>
            <div className="relative my-4 w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>

          <TabsContent value="activity">
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
          </TabsContent>

          <TabsContent value="permissions" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {permissionsData.map((perm) => (
                <div key={perm.title} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold">{perm.title}</h4>
                  <p className="text-xs text-muted-foreground">{perm.access}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  )
}
