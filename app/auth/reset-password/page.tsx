import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Suspense } from "react"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex-1">Loading...</div>}>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </Suspense>
  )
}
