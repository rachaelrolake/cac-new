"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Bell } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "../ui/button"
import { RegistrationApplicationList } from "./registration-application-list"

interface PreIncorporationLayoutProps {
  children: React.ReactNode
  activeTab: "consent" | "reservation"
}

export function RegistrationLayout({ children, activeTab }: PreIncorporationLayoutProps) {
  const pathname = usePathname()
  const [activeCategory, setActiveCategory] = useState("company-name")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const isConsentPage = pathname.includes("name-requiring-consent")
  const isReservationPage = pathname.includes("name-reservation")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      </div>

      <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
        <header className="border-b bg-white">
          <div className="flex h-20 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Registration Application Review</h1>
              <p className="text-sm text-gray-500">Review and process Registration applications</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search" className="pl-10" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">


          <div className="p-8">
            {children}

            <RegistrationApplicationList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>
        </main>
      </div>
    </div>
  )
}
