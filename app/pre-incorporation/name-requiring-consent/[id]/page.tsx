import { Suspense, use } from "react";
import NameRequiringConsentDetails from "@/components/pre-incorporation/name-requiring-consent-details";
import { PageLoader } from "@/components/reusables/page-loader";

export default function NameRequiringConsentViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <Suspense fallback={<PageLoader />}>
      <NameRequiringConsentDetails params={Promise.resolve({ id })} />
    </Suspense>
  )
}