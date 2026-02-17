
import RegistrationViewDetails from "@/components/pre-incorporation/registration-details";

export default function RegistrationViewPage({ params }: { params: { id: string } }) {

  return (
    <RegistrationViewDetails params={Promise.resolve(params)} />
  )
}
