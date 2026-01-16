"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"


export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      router.push("/auth/2fa-setup")
    }, 1500)
  }

  const handleGoogleLogin = () => {
    // Handle Google OAuth
    console.log("Google login")
  }

  const handleCodeLogin = () => {
    router.push("/auth/verify-email")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-semibold text-gray-900">Welcome back</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Image
              src="/email.png"
              alt="Google icon"
              width={13}
              height={12}
              className="absolute left-3 top-1/2 -translate-y-1/2 "
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-8"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right">
            <Link href="/auth/reset-password" className="text-xs text-gray-500 hover:text-gray-700">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#E0E0E0] text-gray-600 hover:bg-emerald-700 hover:text-white"
          disabled={isLoading || !email || !password}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-500">Or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-2 rounded-3xl bg-[#012512] text-white hover:bg-emerald-800"
        onClick={handleGoogleLogin}
      >
        <Image
          src="/google.png"
          alt="Google icon"
          width={24}
          height={24}
          className="mr-2 "
        />
    
        Join with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full border-emerald-700 text-emerald-700 hover:bg-emerald-50 bg-transparent"
        onClick={handleCodeLogin}
      >
        Log in with code
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-500">New to CAC?</span>{" "}
        <Link href="/auth/signup" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          Sign up
        </Link>
      </div>

      {isLoading && (
        <div className="text-center">
          <Link href="#" className="text-sm text-emerald-700 hover:text-emerald-800">
            This is not me
          </Link>
        </div>
      )}
    </div>
  )
}
