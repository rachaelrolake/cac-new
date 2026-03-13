"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, FileText, ChevronDown, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { paymentsAPI, type Payment } from "@/lib/api/payments"
import { toast } from "sonner"
import { format } from "date-fns"

export function TransactionDetails() {
  const router = useRouter()
  const params = useParams()
  const transactionId = params.id as string

  const [transaction, setTransaction] = useState<Payment | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (transactionId) {
      fetchTransaction()
    }
  }, [transactionId])

  const fetchTransaction = async () => {
    setIsLoading(true)
    try {
      const data = await paymentsAPI.getPaymentById(transactionId)
      setTransaction(data)
    } catch (error: any) {
      toast.error("Failed to load transaction details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = "NGN") => {
    return `₦${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy hh:mma")
    } catch {
      return dateString
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid": return "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100"
      case "Pending": return "bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-100"
      case "Failed": return "bg-red-50 text-red-700 hover:bg-red-50 border-red-100"
      case "Refunded": return "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100"
      default: return "bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-100"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Transaction not found</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="lg" className="gap-2" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          Export Report <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <Card className="mx-auto space-y-6 p-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-5">Payment Details</h1>

          {/* Section 1: Business Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-y-6">
                <div className="col-span-2">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Business Name</p>
                  <div className="flex items-center gap-2 font-semibold">
                    <div className="p-1 bg-gray-100 rounded">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                    {transaction.payerName}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Transaction ID</p>
                  <p className="font-medium mt-1">{transaction.orderId}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment Status</p>
                  <Badge variant="secondary" className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Payer Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6 grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Paid By</p>
                <p className="font-medium mt-1">{transaction.payerName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Email Address</p>
                <p className="font-medium mt-1">{transaction.payerEmail}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Phone Number</p>
                <p className="font-medium mt-1">N/A</p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Service Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6 grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Service</p>
                <p className="font-medium mt-1">{transaction.entityType}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Amount</p>
                <p className="text-xl font-bold mt-1">{formatCurrency(transaction.amount, transaction.currency)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Reference No</p>
                <p className="font-medium mt-1">{transaction.rrr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Payment Method</p>
                <p className="font-medium mt-1">Remita</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Transaction Date</p>
                <p className="font-medium mt-1">{formatDate(transaction.transactionDate)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Entity ID</p>
                <p className="font-medium mt-1">{transaction.entityId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" className="px-8 border-emerald-600 text-emerald-700 hover:bg-emerald-50" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button className="px-8 bg-[#2D6A4F] hover:bg-[#1B4332]">
              Download Receipts
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}