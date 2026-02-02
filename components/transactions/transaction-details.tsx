"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, FileText, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export function TransactionDetails() {
  const router = useRouter()

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
                    GLOBAL VENTURES
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">Transaction ID</p>
                  <p className="font-medium mt-1">TXN-904309</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Payment Status</p>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100">
                    Completed
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
                <p className="font-medium mt-1">Barr. Ismaila Haman</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Email Address</p>
                <p className="font-medium mt-1">jdoe@gmail.com</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Phone Number</p>
                <p className="font-medium mt-1">09065342516</p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Service Info */}
          <Card className="shadow-sm mb-4">
            <CardContent className="p-6 grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Service</p>
                <p className="font-medium mt-1">Annual Return Filling</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Amount</p>
                <p className="text-xl font-bold mt-1">₦50,000</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Reference No</p>
                <p className="font-medium mt-1">REF-RC-093453</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Payment Method</p>
                <p className="font-medium mt-1">Remitta</p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" className="px-8 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
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
