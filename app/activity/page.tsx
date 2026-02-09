import { ActivityList } from "@/components/activity/activity-list"
import DashboardLayout from "@/components/layouts/dashboard/dashboard-layout"

export const metadata = {
  title: "Activity",
  description: "Complete history of all system actions and decisions",
}

export default function ActivityLayoutPage() {
  return (
    <DashboardLayout pageTitle="Activity Logs" pageSubTitle="">
      <ActivityList />
    </DashboardLayout>
  )
}
