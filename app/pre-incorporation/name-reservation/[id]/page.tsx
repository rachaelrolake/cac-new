import NameReservationViewDetails from "@/components/pre-incorporation/name-reservation-details";
import { PageLoader } from "@/components/reusables/page-loader";
import { Suspense, use } from "react";

export default function RegistrationViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <Suspense fallback={<PageLoader />}>
      <NameReservationViewDetails params={Promise.resolve({ id })} />
    </Suspense>
  )
}