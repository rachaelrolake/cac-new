import { PreIncorporationLayout } from "@/components/pre-incorporation/pre-incorporation-layout"

export const metadata = {
  title: "Name Requiring Consent Review",
  description: "Review and process name requiring consent applications",
}

export default function NameRequiringConsentPage() {
  return (
    <PreIncorporationLayout activeTab="consent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Name Requiring Consent Review</h1>
          <p className="text-muted-foreground">Review and process name requiring consent applications</p>
        </div>
      </div>
    </PreIncorporationLayout>
  )
}
