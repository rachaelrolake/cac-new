
import NameReservationViewDetails from "@/components/pre-incorporation/name-reservation-details";

export default function NameReservationViewPage({ params }: { params: { id: string } }) {

  return (
    <NameReservationViewDetails params={Promise.resolve(params)} />
  )
}
