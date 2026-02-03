import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { UsersManagement } from "@/components/users-management/users-management"
import { Suspense } from "react"

export default function UsersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayout pageTitle="Users Management" pageSubTitle="Manage all users in the system">
        <UsersManagement />
      </DashboardLayout>
    </Suspense>
  )
}
