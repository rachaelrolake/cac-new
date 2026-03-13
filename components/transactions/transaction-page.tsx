"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MetricCard } from "./metric-card"
import { Search, Filter, Download, MoreHorizontal, FileText, Flag, Trash2, Eye, X, Calendar, MoreVertical, Loader2 } from "lucide-react"
import { FinancialOversight } from "./financial-oversight"
import { TransactionList } from "./transactions-list"


export function TransactionPage() {
  const [activeTab2, setActiveTab2] = useState<"transactions" | "financial-oversight">("transactions")

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-2 rounded-lg bg-gray-100 p-1 w-fit">
        <button
          onClick={() => setActiveTab2("transactions")}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${activeTab2 === "transactions" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab2("financial-oversight")}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${activeTab2 === "financial-oversight" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          Financial Oversight
        </button>
      </div>

      {activeTab2 === "transactions" && (
        <>
          <TransactionList />
        </>
      )}

      {activeTab2 === "financial-oversight" && (
        <>
          <FinancialOversight />
        </>
      )}
    </div>
  )
}
