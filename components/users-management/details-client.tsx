"use client"
import { PageHeader } from "@/components/reusables/page-header"
import { Button } from "@/components/ui/button"
import ApprovedAccreditedDetails from "@/components/users-management/accredited-approved-details"
import RequestsAccreditionDetails from "@/components/users-management/accredited-requests-detail"
import ApprovedEntityDetails from "@/components/users-management/entity-approved-details"
import RequestsEntityDetails from "@/components/users-management/entity-requests-details"
import ApprovedInsolvencyDetails from "@/components/users-management/insolvency-approved-details"
import RequestsInsolvencyDetails from "@/components/users-management/insolvency-requests-details"
import PublicUsersDetails from "@/components/users-management/public-user-details"
import SystemAdminDetails from "@/components/users-management/system-admin-details"
import { usersAPI } from "@/lib/api/users-management"
import { ArrowLeft } from "lucide-react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function UserDetailsClientsPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams();

  const userType = searchParams.get('userType');

  return (
    <div>
      <PageHeader title="User Details" />

      <div className="space-y-4 p-6 pt-24">
        {/* Back Button */}

        <div className="flex items-center mb-5">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 rounded-lg shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium text-sm">Back</span>
          </Button>
        </div>


        {userType === 'system-admin' && (
          <SystemAdminDetails />
        )}

        {userType === 'public-user' && (
          <PublicUsersDetails />
        )}

        {userType === 'accreditation-approved' && (
          <ApprovedAccreditedDetails />
        )}

        {userType === 'accreditation-requests' && (
          <RequestsAccreditionDetails />
        )}

        {userType === 'insolvency-approved' && (
          <ApprovedInsolvencyDetails />
        )}

        {userType === 'insolvency-requests' && (
          <RequestsInsolvencyDetails />
        )}

        {userType === 'entity-approved' && (
          <ApprovedEntityDetails />
        )}

        {userType === 'entity-requests' && (
          <RequestsEntityDetails />
        )}
      </div>
    </div>
  )
}
