import PreIncorporationMainPage from "@/components/pre-incorporation/pre-incorporation-page";
import RegistrationViewDetails from "@/components/pre-incorporation/registration-details";
import { PageLoader } from "@/components/reusables/page-loader";
import { Suspense, use } from "react";

export default function RegistrationViewPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PreIncorporationMainPage />
    </Suspense>
  )
}