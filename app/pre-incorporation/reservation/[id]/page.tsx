import { ApplicationDetails } from "@/components/pre-incorporation/application-details"

export const metadata = {
  title: "Reservation Details",
  description: "View reservation details",
}

export default function ReservationPage({ params }: { params: { id: string } }) {
  return <ApplicationDetails applicationId={params.id} type="reservation" />
}
