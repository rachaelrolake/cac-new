"use client"

import { Suspense } from "react"
import { AddItemContent } from "@/components/dashboard/add-item-form"

export default function AddItemPage() {
  return (
    <div className="flex gap-6">
      {/* Sidebar placeholder */}
      <div className="w-72 flex-shrink-0"></div>

      {/* Main Content */}
      <Suspense fallback={<div className="flex-1">Loading...</div>}>
        <AddItemContent />
      </Suspense>
    </div>
  )
}
