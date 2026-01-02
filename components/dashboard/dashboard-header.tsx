"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const pathname = usePathname()

  const isAddUserPage = pathname.includes("/dashboard/users/add")
  const isEditUserPage = pathname.includes("/dashboard/users") && pathname.includes("/edit")
  const isDetailsPage = pathname.includes("/dashboard/users") && pathname.includes("/details")
  const isPasswordResetPage = pathname.includes("/dashboard/users") && pathname.includes("/password-reset")
  const isUsersPage =
    pathname.includes("/dashboard/users") && !isAddUserPage && !isEditUserPage && !isDetailsPage && !isPasswordResetPage

  let title = "Dashboard"
  let description = "Corporate Affairs Commission Portal Overview"

  if (isUsersPage) {
    title = "Users Management"
    description = "Manage user accounts and access control"
  } else if (isAddUserPage) {
    title = "Add New User"
    description = ""
  } else if (isEditUserPage) {
    title = "Edit User Details"
    description = ""
  } else if (isDetailsPage) {
    title = "User Details"
    description = ""
  } else if (isPasswordResetPage) {
    title = "Password Reset"
    description = ""
  }

  const showSearch = !isAddUserPage && !isEditUserPage && !isDetailsPage && !isPasswordResetPage

  return (
    <header className="border-b bg-white">
      <div className="flex h-20 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>

        {showSearch && (
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Search" className="pl-10" />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
