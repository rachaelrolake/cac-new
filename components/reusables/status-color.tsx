export const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        Active: "bg-emerald-100 text-emerald-700",
        Blue: "bg-blue-100 text-blue-700",
        Suspended: "bg-rose-100 text-rose-700",
        Queried: "bg-rose-100 text-rose-700",
        Pending: "bg-orange-100 text-orange-700",
        Rejected: "bg-red-100 text-red-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
}