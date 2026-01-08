"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, CheckCircle2, XCircle, Clock, Users } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: "checkmark" | "cross" | "clock" | "trending-up" | "trending-down" | "users"
  iconColor: "green" | "red" | "orange" | "blue" | "gray"
  subtitle?: string
}

const iconMap = {
  checkmark: CheckCircle2,
  cross: XCircle,
  clock: Clock,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  users: Users,
}

const colorMap = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
}

export function MetricCard({ title, value, icon, iconColor, subtitle }: MetricCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`rounded-lg p-3 ${colorMap[iconColor]}`}>
          <IconComponent className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}
