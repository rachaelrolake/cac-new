"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "../ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from "../ui/select"
import { BarChart3, CheckCircle2, CreditCard, Wallet, XCircle, Clock, RefreshCcw, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { SectionHeader } from "../reusables/section-header"
import { FinanceCard } from "../reusables/finance-card"
import { paymentsAPI, type PaymentStatsData } from "@/lib/api/payments"
import { toast } from "sonner"

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: { value: string; positive: boolean };
  icon: React.ReactNode;
  className?: string;
}

const ENTITY_COLORS: Record<string, string> = {
  'CompanyRegistration': '#3b82f6',
  'Company': '#3b82f6',
  'BusinessName': '#10b981',
  'Business Name': '#10b981',
  'IncorporatedTrustees': '#F59E0B',
  'Incorporated Trustees': '#F59E0B',
  'LLP': '#8B5CF6',
  'LP': '#8B5CF6',
  'Limited Liability Partnership': '#8B5CF6',
  'Limited Partnership': '#8B5CF6',
  'PostIncorporation': '#EF4444',
  'Post Incorporation': '#EF4444',
}

export function FinancialOversight() {
  const [paymentStats, setPaymentStats] = useState<PaymentStatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await paymentsAPI.getFinancialStats()
      setPaymentStats(data)
    } catch (error: any) {
      toast.error("Failed to load financial data", {
        description: error.response?.data?.message || "Please try again"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}M`
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const getEntityColor = (entityType: string): string => {
    return ENTITY_COLORS[entityType] || '#6B7280'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    )
  }

  if (!paymentStats) {
    return (
      <div className="text-center py-12 text-gray-500">
        Failed to load financial data
      </div>
    )
  }

  const finanlcialRow: Array<{
    title: string;
    value: string;
    subValue: string;
    variant: "green" | "blue" | "yellow" | "purple" | "red";
    icon: typeof Wallet;
    trend?: "up" | "down"
  }> = [
      {
        title: "Total Revenue",
        value: formatCurrency(paymentStats.totalRevenue),
        subValue: "All time",
        variant: "green",
        icon: Wallet
      },
      {
        title: "This Month",
        value: formatCurrency(paymentStats.thisMonth.revenue),
        subValue: `${formatNumber(paymentStats.thisMonth.count)} transactions`,
        variant: "blue",
        icon: CreditCard
      },
      {
        title: "Today's Revenue",
        value: formatCurrency(paymentStats.today.revenue),
        subValue: `${formatNumber(paymentStats.transactionCount)} total txns`,
        variant: "yellow",
        icon: Wallet
      },
      {
        title: "Avg Transaction",
        value: `₦${formatNumber(paymentStats.avgTransaction)}`,
        subValue: `${formatNumber(paymentStats.successful.count)} successful`,
        variant: "purple",
        icon: BarChart3
      },
      {
        title: "Successful",
        value: formatNumber(paymentStats.successful.count),
        subValue: formatCurrency(paymentStats.successful.amount),
        variant: "green",
        icon: CheckCircle2
      },
      {
        title: "Failed",
        value: formatNumber(paymentStats.failed.count),
        subValue: "Failed",
        variant: "red",
        icon: XCircle
      },
      {
        title: "Pending",
        value: formatNumber(paymentStats.pending.count),
        subValue: formatCurrency(paymentStats.pending.amount),
        variant: "yellow",
        icon: Clock
      },
      {
        title: "Refunded",
        value: formatNumber(paymentStats.refunded.count),
        subValue: formatCurrency(paymentStats.refunded.amount),
        variant: "purple",
        icon: RefreshCcw
      },
    ]

  // Revenue by entity data for chart
  const revenueByEntity = paymentStats.revenueByEntityType?.map(item => ({
    name: item.entityType,
    value: item.revenue,
    color: getEntityColor(item.entityType),
    txns: formatNumber(item.transactionCount),
    share: item.share
  })) || []

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <SectionHeader>Financial Oversight</SectionHeader>
            <Button variant="outline" size="sm">Filters</Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {finanlcialRow.map((card, i) => (
              <FinanceCard
                key={i}
                title={card.title}
                value={card.value}
                subValue={card.subValue}
                variant={card.variant}
                icon={card.icon}
                trend={card.trend}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Entity Section */}
      {revenueByEntity.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader>Revenue by Entity Type</SectionHeader>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="All Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donut Chart */}
            <div className="h-[300px] flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByEntity}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueByEntity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2 space-y-4">
              {revenueByEntity.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.txns} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatCurrency(item.value)}</p>
                    <p className="text-xs text-muted-foreground">{item.share}% share</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

const StatCard = ({ title, value, subtext, trend, icon, className }: StatCardProps) => (
  <Card className={cn("p-4 flex justify-between items-start", className)}>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      {trend && (
        <p className={cn("text-xs mt-1 flex items-center", trend.positive ? "text-green-600" : "text-red-600")}>
          {trend.positive ? "↗" : "↘"} {trend.value}
        </p>
      )}
      {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
    </div>
    <div className="p-2 rounded-lg bg-secondary">
      {icon}
    </div>
  </Card>
)