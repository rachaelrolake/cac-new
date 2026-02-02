import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { TransactionDetails } from "@/components/transactions/transaction-details"

export const metadata = {
  title: "Registration Application Review",
  description: "Review and process Registration applications",
}

export default function NameRequiringConsentPage() {
  return (
    <DashboardLayout pageTitle="Transactions" pageSubTitle="Manage your transactions">
      <TransactionDetails />
    </DashboardLayout>
  )
}
