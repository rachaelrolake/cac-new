import { PageLoader } from "@/components/reusables/page-loader"
import AddUserPage from "@/components/users-management/add-page-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AddUserPage />
    </Suspense>
  )
}
