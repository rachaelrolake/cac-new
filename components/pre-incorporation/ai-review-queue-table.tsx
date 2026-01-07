"use client"

import Link from "next/link"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QueueItem {
  id: string
  sn: number
  avCode: string
  proposedName: string
  category: string
  reasonForReview: string
  confidenceLevel: string
  confidencePercent: string
  timeInQueue: string
  aiDecision: string
  status: string
  riskLevel: "High Risk" | "Medium Risk" | "Low Risk"
}

const mockData: QueueItem[] = [
  {
    id: "1",
    sn: 1,
    avCode: "AV-2019-01",
    proposedName: "TECH INNOVATIONS NIGERIA LIMITED",
    category: "Name Reservation",
    reasonForReview: "Similarity score in review range is 55%",
    confidenceLevel: "91%",
    confidencePercent: "91%",
    timeInQueue: "2hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "High Risk",
    riskLevel: "High Risk",
  },
  {
    id: "2",
    sn: 2,
    avCode: "AV-2019-01",
    proposedName: "GLOBAL PETROLEUM SERVICES LIMITED",
    category: "Name Requiring Consent",
    reasonForReview: "Requires Central Bank of Nigeria consent verification",
    confidenceLevel: "94%",
    confidencePercent: "94%",
    timeInQueue: "5hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "High Risk",
    riskLevel: "High Risk",
  },
  {
    id: "3",
    sn: 3,
    avCode: "AV-2019-01",
    proposedName: "SUNRISE VENTURES LIMITED",
    category: "Registration",
    reasonForReview: "Large share capital requires enhanced due diligence",
    confidenceLevel: "88%",
    confidencePercent: "88%",
    timeInQueue: "4hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "High Risk",
    riskLevel: "High Risk",
  },
  {
    id: "4",
    sn: 4,
    avCode: "AV-2019-01",
    proposedName: "NATIONAL BANK OF COMMERCE LIMITED",
    category: "Name Reservation",
    reasonForReview: "Similarity score in review range is 55%",
    confidenceLevel: "90%",
    confidencePercent: "90%",
    timeInQueue: "3hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "High Risk",
    riskLevel: "High Risk",
  },
  {
    id: "5",
    sn: 5,
    avCode: "AV-2019-01",
    proposedName: "SUNNET AGRO LIMITED",
    category: "Name Requiring Consent",
    reasonForReview: "Requires Central Bank of Nigeria consent verification",
    confidenceLevel: "78%",
    confidencePercent: "78%",
    timeInQueue: "6hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "Medium Risk",
    riskLevel: "Medium Risk",
  },
  {
    id: "6",
    sn: 6,
    avCode: "AV-2019-01",
    proposedName: "EDU FURNITURES LIMITED",
    category: "Registration",
    reasonForReview: "Large share capital requires enhanced due diligence",
    confidenceLevel: "91%",
    confidencePercent: "91%",
    timeInQueue: "2hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "Medium Risk",
    riskLevel: "Medium Risk",
  },
  {
    id: "7",
    sn: 7,
    avCode: "AV-2019-01",
    proposedName: "JAGORA VENTURES LIMITED",
    category: "Registration",
    reasonForReview: "Large share capital requires enhanced due diligence",
    confidenceLevel: "91%",
    confidencePercent: "91%",
    timeInQueue: "2hours in queue",
    aiDecision: "Ai: Needs Human Review",
    status: "Medium Risk",
    riskLevel: "Medium Risk",
  },
]

export function AIReviewQueueTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">AV Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Proposed Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Reason for Review</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Confidence Level</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">AI Decision</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{item.sn}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.avCode}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                <Link href={`/pre-incorporation/ai-review/${item.id}`} className="hover:underline">
                  {item.proposedName}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="max-w-xs">{item.reasonForReview}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{item.confidencePercent}</span>
                  <span className="text-xs text-gray-500">{item.timeInQueue}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  {item.aiDecision}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.riskLevel === "High Risk"
                      ? "bg-red-100 text-red-700"
                      : item.riskLevel === "Medium Risk"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" size="sm">
          ← Previous
        </Button>
        <div className="flex gap-2">
          {[1, 2, 3, "...", 8, 9, 10].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={page === 1 ? "bg-emerald-700" : ""}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next →
        </Button>
      </div>
    </div>
  )
}
