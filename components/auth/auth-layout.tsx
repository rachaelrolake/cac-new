import type React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700">
                <span className="text-xs font-bold text-white">CAC</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-emerald-700">CORPORATE AFFAIRS</div>
              <div className="text-sm font-bold text-emerald-700">COMMISSION</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/objection" className="text-sm text-gray-700 hover:text-gray-900">
              Objection
            </Link>
            <Link href="/documents" className="text-sm text-gray-700 hover:text-gray-900">
              Documents
            </Link>
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <Search className="h-4 w-4" />
              Public Search
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-emerald-700 hover:text-emerald-800">
                Log in
              </Button>
            </Link>
            <Button className="bg-emerald-700 text-white hover:bg-emerald-800">Create Account</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr,1.2fr]">
          {/* Auth Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">{children}</div>
          </div>

          {/* Public Notice */}
          <div className="rounded-2xl bg-emerald-100 p-12">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Public Notice</h2>

            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-800">
                <span className="text-xl font-bold text-white">CAC</span>
              </div>
            </div>

            <h3 className="mb-4 text-center text-xl font-bold text-gray-900">ANNUAL RETURNS FOR BUSINESS NAMES</h3>

            <p className="mb-6 text-center text-sm text-gray-700">
              Filing of annual returns is now available for all business names registered before July 2025.
            </p>

            <p className="text-center text-sm leading-relaxed text-gray-700">
              Because we are currently upgrading the business name system with new AI features, a new AI-powered annual
              returns process will be introduced soon. This will make it possible for both older business names (before
              July 2025) and newer ones (created after July 2025) to have their annual returns processed and approved
              automatically.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="h-1 w-16 rounded-full bg-emerald-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
