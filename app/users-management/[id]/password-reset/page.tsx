import { PageLoader } from "@/components/reusables/page-loader"
import PasswordResetPage from "@/components/users-management/password-reset-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PasswordResetPage />
    </Suspense>
  )
}
