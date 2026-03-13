import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"
import { TransactionPage } from "@/components/transactions/transaction-page"

export const metadata = {
  title: "Transactions",
  description: "Manage your transactions",
}

export default function NameRequiringConsentPage() {
  return (
    <DashboardLayout pageTitle="Transactions" pageSubTitle="Manage your transactions">
      <TransactionPage />
    </DashboardLayout>
  )
}
