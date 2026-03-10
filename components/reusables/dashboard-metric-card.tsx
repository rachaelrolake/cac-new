"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Users,
  Building,
  UserCheck,
} from "lucide-react"

interface DashboardMetricCardProps {
  label: string
  title: string
  value: number | string
  trend?: number
  description?: string
  icon: "file" | "users" | "building" | "agents"
  iconColor: "blue" | "green" | "yellow" | "orange" | "red" | "purple" | "gray"
}

const iconMap = {
  file: FileText,
  users: Users,
  building: Building,
  agents: UserCheck,
}

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
  gray: "bg-gray-100 text-gray-600",
}

export function DashboardMetricCard({
  label,
  title,
  value,
  trend,
  description,
  icon,
  iconColor,
}: DashboardMetricCardProps) {
  const Icon = iconMap[icon]
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value

  const isPositive = trend && trend > 0

  return (
    <Card className="py-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-600">{title}</p>

            <p className="mt-2 text-3xl font-bold">{formattedValue}</p>

            {trend !== undefined ? (
              <div className="mt-2 flex items-center gap-2 text-sm">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}

                <span
                  className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {trend > 0 ? `+${trend}%` : `${trend}%`}
                </span>

                {description && (
                  <span className="text-gray-500">{description}</span>
                )}
              </div>
            ) : (
              description && (
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              )
            )}
          </div>

          <div className={`rounded-lg p-3 ${colorMap[iconColor]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}