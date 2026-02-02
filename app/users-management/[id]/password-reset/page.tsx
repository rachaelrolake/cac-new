"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PasswordResetPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id
  const [email, setEmail] = useState("john@cac.gov.ng")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendLink = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.back()
    }, 1000)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          {/* Back Button */}
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-lg shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium text-sm">Back</span>
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-500" />
              Password Reset Link
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Alert Box */}
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-900 ml-2">
                You Are About To Initiate A Password Reset Request.
                <br />
                This action will send a secure reset link to the selected user.
                <br />
                Only proceed if this request is genuine and verified, as it affects account access and system security.
              </AlertDescription>
            </Alert>

            {/* Email Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Email Address *</label>
              <Input
                type="email"
                placeholder="john@cac.gov.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onClick={handleSendLink}
                disabled={isLoading}
                className="bg-primary gap-2"
              >
                {isLoading ? "Sending..." : "Send Link"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
