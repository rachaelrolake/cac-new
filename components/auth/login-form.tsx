"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { EyeOff, Eye, ShieldUser, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { toast } from "sonner"

export function LoginForm() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const email = watch("email")
  const password = watch("password")

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again."
      toast.error("Login failed", {
        description: errorMessage,
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-semibold text-gray-900">Welcome back</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <ShieldUser className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="pl-10 h-12"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="h-12 pr-10"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              disabled={isSubmitting}
            >
              {isPasswordVisible ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-xs text-gray-500 hover:text-gray-700">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="xl"
          className="w-full mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </div>
  )
}

import React from "react"