"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Lock, ShieldUser, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authAPI } from "@/lib/api/auth"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth"
import { toast } from "sonner"

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authAPI.forgotPassword(data)
      toast.success("Email sent!", {
        description: "Check your inbox for password reset instructions.",
      })
      reset()
    } catch (err: any) {
      toast.error("Failed to send email", {
        description: err.response?.data?.message || "Please try again later.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-2xl bg-gray-100 p-6">
          <Lock className="h-12 w-12 text-emerald-700" />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reset your password</h1>
        <p className="mt-2 text-sm text-gray-500">
          We will send a reset link to your email address.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <ShieldUser className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
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

        <Button
          type="submit"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">Remembered your password?</span>
        </div>
      </div>

      <div className="text-center">
        <Link href="/auth/login" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          Back to Login
        </Link>
      </div>
    </div>
  )
}