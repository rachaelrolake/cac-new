import RegistrationViewDetails from "@/components/pre-incorporation/registration-details";
import { PageLoader } from "@/components/reusables/page-loader";
import { Suspense, use } from "react";

export default function RegistrationViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <Suspense fallback={<PageLoader />}>
      <RegistrationViewDetails params={Promise.resolve({ id })} />
    </Suspense>
  )
}