import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { UsersManagement } from "@/components/users-management/users-management"

export default function UsersPage() {
  return (
    <DashboardLayout pageTitle="Users Management" pageSubTitle="Manage all users in the system">
      <UsersManagement />
    </DashboardLayout>
  )
}
