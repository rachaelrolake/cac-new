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
            <div className="relative w-[30%]">
              <Image
                src="/logo-extended.png"
                alt="CAC Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          </div>


        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto md:max-w-7xl w-full">
          <div className="flex sm:flex-row flex-col flex-col-reverse min-h-[560px] overflow-hidden rounded-3xl shadow-md">

            {/* LEFT: Welcome Back */}
            <div className="flex flex-1 justify-center bg-white">
              <div className="w-full max-w-md p-4 flex flex-col justify-center
                        rounded-l-3xl rounded-r-none">
                {children}
              </div>
            </div>

            {/* RIGHT: Public Notice */}
            <div className="flex flex-[1] bg-gradient-to-b from-[#A3C8B4] to-[#E6F0EB] relative">
              <Image
                src="/lines.png"
                alt="Lines"
                width={100}
                height={100}
                className="absolute top-0 left-0 w-full h-full object-cover z-10"
              />
              <div className="w-full p-8 md:p-12 flex flex-col justify-center
                        rounded-r-3xl rounded-l-none">

                <div className="flex justify-center">
                  <h2 className="bg-[#FFFFFF8F] border border-[#FFFFFF] w-fit px-4 rounded-full">
                    <span className="text-xs">Official CAC iCPR Platform</span>
                  </h2>
                </div>

                <div className="mb-8 flex justify-center">
                  <div className="relative w-[60%]">
                    <Image
                      src="/big-logo.png"
                      alt="CAC Logo"
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>




    </div>
  )
}