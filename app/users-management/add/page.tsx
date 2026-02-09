import AddUserPage from "@/components/users-management/add-page-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AddUserPage />
    </Suspense>
  )
}
