import { MoreVertical, Plus, Download, Search, FilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import CompaniesFeesPage from "./services-fee/companies-fees"
import LLPFeesPage from "./services-fee/llp-fees"
import LPFeesPage from "./services-fee/lp-fees"
import BNFeesPage from "./services-fee/bn-fees"
import ITFeesPage from "./services-fee/it-fees"
import PenaltiesFees from "./services-fee/penalty-fees"
import OtherFees from "./services-fee/other-fees"

const data = [
  { sn: 1, name: "NIN", createdAt: "Nov 15, 2025", timestamp: "2hrs ago", createdBy: "Super Admin" },
  { sn: 2, name: "BVN", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Admin" },
  { sn: 3, name: "Company ", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 4, name: "International Passport", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
  { sn: 5, name: "Drivers License", createdAt: "Nov 14, 2025", timestamp: "1 min ago", createdBy: "Support" },
]

const tabsConfig = [
  { id: "companies", label: "Companies" },
  { id: "llp", label: "LLP" },
  { id: "lp", label: "LP" },
  { id: "business-name", label: "Business Names" },
  { id: "it", label: "Incorporated Trustees" },
  { id: "penalties", label: "Penalties" },
  { id: "others", label: "Other Fees" },
]

export default function ServiceFeesPage() {
  const [activeTab, setActiveTab] = React.useState("companies")

  return (
    <>
      <Tabs defaultValue="companies" className="w-full">
        <div className="flex justify-end">
          <TabsList className="w-fit bg-gray-200 mb-6">
            {tabsConfig.map((cat) => (
              <TabsTrigger
                onClick={() => setActiveTab(cat.id)}
                key={cat.id}
                value={cat.id}
                className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>


        {activeTab === "companies" && (
          <CompaniesFeesPage />
        )}

        {activeTab === "llp" && (
          <LLPFeesPage />
        )}

        {activeTab === "lp" && (
          <LPFeesPage />
        )}

        {activeTab === "business-name" && (
          <BNFeesPage />
        )}

        {activeTab === "it" && (
          <ITFeesPage />
        )}
        {activeTab === "penalties" && (
          <PenaltiesFees />
        )}
        {activeTab === "others" && (
          <OtherFees />
        )}


      </Tabs>
    </>
  )
}
