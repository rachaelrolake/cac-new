"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, X, } from "lucide-react"
import { ExecutiveSummary } from "./executive-summary"
import { DashboardOverview } from "./dashboard-overview"

export function DashboardContent() {
  const [activeTab2, setActiveTab2] = useState<"overview" | "executive">("overview")
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    try {
      const hidden = localStorage.getItem("hideWelcomeModal") === "true"
      setDontShowAgain(hidden)
      if (!hidden) setShowWelcomeModal(true)
    } catch (e) {
      // ignore localStorage errors
      setShowWelcomeModal(true)
    }
  }, [])

  const closeModal = () => {
    try {
      if (dontShowAgain) {
        localStorage.setItem("hideWelcomeModal", "true")
      } else {
        localStorage.removeItem("hideWelcomeModal")
      }
    } catch (e) {
      // ignore localStorage errors
    }
    setShowWelcomeModal(false)
  }

  return (
    <div className="space-y-6">
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-[100vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="relative">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👋</span>
                <CardTitle>Welcome, Admin!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Begin managing applications, reviewing documents, tracking statuses, and supporting users across the
                platform.
              </p>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Quick Start Guide</h3>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manage Application Requests</p>
                    <p className="text-xs text-gray-600">Monitor pending, queried and approved requests.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Reports</p>
                    <p className="text-xs text-gray-600">Generate reports, download and share.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Track Payments</p>
                    <p className="text-xs text-gray-600">Manage users payment across applications and changes.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Integrations</p>
                    <p className="text-xs text-gray-600">Integrate Apps to help manage tasks.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-emerald-50 p-3">
                  <FileText className="h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Get Help Anytime</p>
                    <p className="text-xs text-gray-600">Access guides, FAQs, or contact support.</p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                />
                <span className="text-sm text-gray-600">Don't show this again</span>
              </label>

              <Button onClick={closeModal} className="w-full bg-emerald-700 hover:bg-emerald-800">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 rounded-lg bg-gray-100 p-1 w-fit">
        <button
          onClick={() => setActiveTab2("overview")}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${activeTab2 === "overview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab2("executive")}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${activeTab2 === "executive" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Executive Summary
        </button>
      </div>

      {activeTab2 === "overview" && (
        <>
          <DashboardOverview />
        </>
      )}

      {activeTab2 === "executive" && (
        <>
          <ExecutiveSummary />
        </>
      )}

    </div>
  )
}
