
import NameRequiringConsentDetails from "@/components/pre-incorporation/name-requiring-consent-details";

export default function NameRequiringConsentViewPage({ params }: { params: { id: string } }) {

  return (
    <NameRequiringConsentDetails params={Promise.resolve(params)} />
  )
}
