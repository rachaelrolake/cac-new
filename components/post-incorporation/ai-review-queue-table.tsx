"use client"

import Link from "next/link"
import { Eye, Flag, MoreHorizontal, MoreVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>AV Code</TableHead>
            <TableHead>Proposed Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Reason for Review</TableHead>
            <TableHead>Confidence Level</TableHead>
            <TableHead>AI Decision</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((item) => (
            <TableRow key={item.id} className="border-b hover:bg-gray-50">
              <TableCell>{item.sn}</TableCell>
              <TableCell>{item.avCode}</TableCell>
              <TableCell>
                <Link href={`/post-incorporation/ai-review/${item.id}`} className="font-medium text-primary hover:underline">
                  {item.proposedName}
                </Link>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <div className="max-w-xs">{item.reasonForReview}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{item.confidencePercent}</span>
                  <span className="text-xs text-gray-500">{item.timeInQueue}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  {item.aiDecision}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${item.riskLevel === "High Risk"
                    ? "bg-red-100 text-red-700"
                    : item.riskLevel === "Medium Risk"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                    }`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-900">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/post-incorporation/ai-review/${item.id}`} className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <Flag className="h-4 w-4 text-red-600" />
                      Flag
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <Trash2 className="h-4 w-4 text-red-600" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
