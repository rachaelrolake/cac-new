"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Lock, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usersAPI, type User } from "@/lib/api/users-management"
import { toast } from "sonner"

export default function PasswordResetPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUserDetails()
  }, [userId])

  const fetchUserDetails = async () => {
    setIsLoadingUser(true)
    try {
      const userData = await usersAPI.getUserById(userId)
      setUser(userData)
    } catch (error: any) {
      toast.error("Failed to load user details", {
        description: error.response?.data?.message || "Please try again"
      })
      router.back()
    } finally {
      setIsLoadingUser(false)
    }
  }

  const handleSendLink = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      await usersAPI.sendPasswordResetLink(user.email)
      toast.success("Password reset link sent!", {
        description: `Reset link has been sent to ${user.email}`
      })
      router.back()
    } catch (error: any) {
      toast.error("Failed to send reset link", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  if (!user) {
    return <div className="text-center py-20">User not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium text-sm">Back</span>
          </Button>
        </div>

        <Card className="bg-white">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-500" />
              Password Reset Link
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
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

            {/* User Info */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">User Name</p>
                <p className="font-medium">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Staff ID</p>
                <p className="font-medium">{user.staffId || "N/A"}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendLink}
                disabled={isLoading}
                className="bg-primary gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}