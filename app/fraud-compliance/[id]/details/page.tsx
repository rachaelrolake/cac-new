import { FraudComplianceDetails } from "@/components/fraud-compliance/fraud-compliance-details"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"

export const metadata = {
  title: "Fraud & Compliance",
  description: "Review and process Fraud & Compliance applications",
}

export default function FraudCompliancePage() {
  return (
    <DashboardLayout pageTitle="Fraud & Compliance" pageSubTitle="">
      <FraudComplianceDetails />
    </DashboardLayout>
  )
}
