import { PageLoader } from "@/components/reusables/page-loader"
import QueryHistoryPage from "@/components/users-management/query-history"
import { Suspense } from "react"

export default function Page() {
    return (
        <Suspense fallback={<PageLoader />}>
            <QueryHistoryPage />
        </Suspense>
    )
}
