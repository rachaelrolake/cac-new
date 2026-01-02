"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./dashboard-header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isExpanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />

      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
