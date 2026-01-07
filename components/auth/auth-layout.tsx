import type React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src="/logo.png"
                alt="CAC Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Nav */}
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-emerald-700 hover:text-emerald-800">
                Log in
              </Button>
            </Link>
            <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
              Create Account
            </Button>
          </div>
        </div>
      </header>

{/* Main Content */}
<main className="container mx-auto px-6 py-12">
  <div className="mx-auto max-w-7xl">
    <div className="flex min-h-[560px] overflow-hidden rounded-3xl">

      {/* LEFT: Welcome Back */}
      <div className="flex flex-1 justify-center bg-white">
        <div className="w-full max-w-md p-8 flex flex-col justify-center
                        rounded-l-3xl rounded-r-none">
          {children}
        </div>
      </div>

      {/* RIGHT: Public Notice */}
      <div className="flex flex-[1] bg-emerald-100">
        <div className="w-full p-8 md:p-12 flex flex-col justify-center
                        rounded-r-3xl rounded-l-none">
          
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold text-gray-900">
            Public Notice
          </h2>

          <div className="mb-8 flex justify-center">
            <div className="relative h-24 w-24">
              <Image
                src="/logo.png"
                alt="CAC Logo"
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <h3 className="mb-4 text-center text-lg md:text-xl font-bold text-gray-900">
            ANNUAL RETURNS FOR BUSINESS NAMES
          </h3>

          <p className="mb-6 text-center text-sm text-gray-700">
            Filing of annual returns is now available for all business names registered before July 2025.
          </p>

          <p className="text-center text-sm leading-relaxed text-gray-700">
            Because we are currently upgrading the business name system with new AI features, a new AI-powered
            annual returns process will be introduced soon. This will make it possible for both older business
            names (before July 2025) and newer ones (created after July 2025) to have their annual returns
            processed and approved automatically.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="h-1 w-8  bg-[#046b32] " />
            <div className="h-1 w-8  bg-[#b1d1bf] ml-1 " />
            <div className="h-1 w-8  bg-[#b1d1bf] ml-1 " />
          </div>
          
        </div>
      </div>

    </div>
  </div>
</main>




    </div>
  )
}
