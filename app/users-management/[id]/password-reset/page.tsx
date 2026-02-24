import PasswordResetPage from "@/components/users-management/password-reset-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <PasswordResetPage />
    </Suspense>
  )
}
