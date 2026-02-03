import EditUserPageClient from "@/components/users-management/edit-page-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <EditUserPageClient />
    </Suspense>
  )
}
