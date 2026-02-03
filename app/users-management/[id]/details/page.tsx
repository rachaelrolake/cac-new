import UserDetailsClientsPage from "@/components/users-management/details-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <UserDetailsClientsPage />
    </Suspense>
  )
}
