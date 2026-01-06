"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./dashboard-header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      </div>

      <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
