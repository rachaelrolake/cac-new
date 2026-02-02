"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SystemAdminComponent } from "./system-admin-table"
import { PublicUsersComponent } from "./public-user-table"
import { AccreditedAgentComponent } from "./accredited-agents-table"
import { InsolvencyAgentComponent } from "./insolvency-agents-table"
import { EntityAccountComponent } from "./entity-accounts-table"

interface User {
  id: number
  name: string
  staffId: string
  email: string
  phone: string
  role: string
  createdAt: string
  lastLogin: string
  status: "Active" | "Suspended" | "Pending"
  avatar: string
}

const TAB_CONFIG: Record<string, { label: string; type: string; addButton: string }> = {
  "System Admins": { label: "System Admins", type: "system-admin", addButton: "Add New User" },
  "Public Users": { label: "Public Users", type: "public-user", addButton: "Add New User" },
  "Accredited Agents": { label: "Accredited Agents", type: "accredited-agent", addButton: "Add New Agent" },
  "Insolvency Agents": { label: "Insolvency Agents", type: "insolvency-agent", addButton: "Add New User" },
  "Entity Accounts": { label: "Entity Accounts", type: "entity-account", addButton: "Add New Entity" },
}

export function UsersManagement() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("System Admins")

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-2 overflow-x-auto bg-gray-200 rounded-md p-2 w-fit">
        {Object.keys(TAB_CONFIG).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); }}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "System Admins" && (
        <SystemAdminComponent />
      )}

      {activeTab === "Public Users" && (
        <PublicUsersComponent />
      )}

      {activeTab === "Accredited Agents" && (
        <AccreditedAgentComponent />
      )}

      {activeTab === "Insolvency Agents" && (
        <InsolvencyAgentComponent />
      )}

      {activeTab === "Entity Accounts" && (
        <EntityAccountComponent />
      )}

    </div>
  )
}
