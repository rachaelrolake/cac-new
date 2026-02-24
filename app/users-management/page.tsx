import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { PageLoader } from "@/components/reusables/page-loader"
import { UsersManagement } from "@/components/users-management/users-management"
import { Suspense } from "react"

export default function UsersPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardLayout pageTitle="Users Management" pageSubTitle="Manage all users in the system">
        <UsersManagement />
      </DashboardLayout>
    </Suspense>
  )
}
