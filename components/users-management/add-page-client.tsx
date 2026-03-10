"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { usersAPI } from "@/lib/api/users-management"
import { toast } from "sonner"
import { PermissionsSelector } from "@/components/users-management/permissions-selector"
import { PageHeader } from "@/components/reusables/page-header"
import { offices } from "@/lib/constants"

const createUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  staffId: z.string().optional(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  organizationName: z.string().optional(),
  designation: z.string().min(1, "Designation is required"),
  office: z.string().min(1, "Office is required"),
  department: z.string().min(1, "Department is required")
})

type CreateUserFormData = z.infer<typeof createUserSchema>

export default function AddUserPage() {
  const router = useRouter()
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  })

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      // Step 1: Create user
      const newUser = await usersAPI.createUser({
        ...data,
        roles: ["Admin"], // Creating admin user
      })

      // Step 2: Assign permissions (if any selected)
      if (selectedPermissions.length > 0) {
        await usersAPI.updateUserPermissions(newUser.id, selectedPermissions)
      }

      toast.success("User created successfully", {
        description: selectedPermissions.length > 0
          ? `User created with ${selectedPermissions.length} permission(s)`
          : "User created without permissions"
      })

      router.push("/users-management")
    } catch (error: any) {
      toast.error("Failed to create user", {
        description: error.response?.data?.message || "Please try again"
      })
    }
  }

  return (
    <div>
      <PageHeader title="Add New Administrator" />

      <div className="min-h-screen bg-[#F9FAFB] py-10 px-4 sm:px-6 lg:px-8 space-y-6 pt-24">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Back Button */}
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-lg shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium text-sm">Back</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Information Card */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Add New System Admin</CardTitle>
                <p className="text-sm text-gray-500">Create a new admin user account</p>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Enter first name"
                      disabled={isSubmitting}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Enter last name"
                      disabled={isSubmitting}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email and Phone Number */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="user@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      {...register("phoneNumber")}
                      placeholder="+234..."
                      disabled={isSubmitting}
                    />
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>
                    )}
                  </div>

                </div>

                {/* Staff ID and Phone Number */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="staffId">Staff ID (Optional)</Label>
                    <Input
                      id="staffId"
                      {...register("staffId")}
                      placeholder="CAC-2024-001"
                      disabled={isSubmitting}
                    />
                    {errors.staffId && (
                      <p className="text-xs text-red-600">{errors.staffId.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      {...register("designation")}
                      placeholder="Enter designation"
                      disabled={isSubmitting}
                    />
                    {errors.designation && (
                      <p className="text-xs text-red-600">{errors.designation.message}</p>
                    )}
                  </div>
                </div>

                {/* Organization Name
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name (Optional)</Label>
                  <Input
                    id="organizationName"
                    {...register("organizationName")}
                    placeholder="Enter organization name"
                    disabled={isSubmitting}
                  />
                  {errors.organizationName && (
                    <p className="text-xs text-red-600">{errors.organizationName.message}</p>
                  )}
                </div> */}

                {/* Office and Department */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="office">Office *</Label>
                    <select
                      id="office"
                      {...register("office")}
                      disabled={isSubmitting}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select office</option>
                      {offices.map((office, index) => (
                        <option key={index} value={office.name}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                    {errors.office && (
                      <p className="text-xs text-red-600">{errors.office.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      {...register("department")}
                      placeholder="Enter department"
                      disabled={isSubmitting}
                    />
                    {errors.department && (
                      <p className="text-xs text-red-600">{errors.department.message}</p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="Minimum 8 characters"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Must contain uppercase, lowercase, and number
                  </p>
                </div>



                {/* Info Box */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> This user will be created with <strong>Admin</strong> role and will have access to system administration features.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Permissions Card */}
            <PermissionsSelector
              selectedPermissions={selectedPermissions}
              onPermissionsChange={setSelectedPermissions}
              disabled={isSubmitting}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                size="xl"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="xl"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create User
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}