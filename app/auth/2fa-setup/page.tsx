import { TwoFactorSetup } from "@/components/auth/2fa-setup"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function TwoFactorSetupPage() {
  return (
    <AuthLayout>
      <TwoFactorSetup />
    </AuthLayout>
  )
}
