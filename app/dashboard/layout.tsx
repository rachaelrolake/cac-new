import type React from "react"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout pageTitle="Dashboard" pageSubTitle="CAC Portal Overview">
      {children}
    </DashboardLayout>
  )
}
