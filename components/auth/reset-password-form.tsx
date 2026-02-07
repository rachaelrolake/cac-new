"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authAPI } from "@/lib/api/auth"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations/auth"
import { toast } from "sonner"
import React from "react"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await authAPI.resetPassword({
        token: data.token,
        newPassword: data.newPassword,
      })

      toast.success("Password reset successful!", {
        description: "You can now login with your new password.",
      })

      setTimeout(() => {
        router.push("/auth/login")
      }, 1500)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Invalid or expired reset token."
      toast.error("Reset failed", {
        description: errorMessage,
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
        <h1 className="text-2xl font-semibold text-gray-900">Set new password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Please enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("token")} />

        <div className="space-y-2">
          <div className="relative">
            <Input
              {...register("newPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="h-12 pr-10"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              disabled={isSubmitting}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-red-600">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="h-12 pr-10"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              disabled={isSubmitting}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
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
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  )
}