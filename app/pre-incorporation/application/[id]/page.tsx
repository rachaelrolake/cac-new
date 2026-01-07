import { ApplicationDetails } from "@/components/pre-incorporation/application-details"

export const metadata = {
  title: "Application Details",
  description: "View application details",
}

export default function ApplicationPage({ params }: { params: { id: string } }) {
  return <ApplicationDetails applicationId={params.id} type="consent" />
}
