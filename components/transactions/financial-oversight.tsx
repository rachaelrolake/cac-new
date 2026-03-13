"use client"

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { SelectTrigger, Select } from "../ui/select";
import { BarChart3, CheckCircle2, CreditCard, Wallet, XCircle, Clock, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { SectionHeader } from "../reusables/section-header";
import { FinanceCard } from "../reusables/finance-card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: { value: string; positive: boolean };
  icon: React.ReactNode;
  className?: string;
}

const data = [
  { name: 'Company', value: 234100000, color: '#3b82f6', txns: '13,645' },
  { name: 'Business Name', value: 102400000, color: '#10b981', txns: '9,876' },
  { name: 'Incorporated Trustees', value: 58000000, color: '#F59E0B', txns: '2,376' },
  { name: 'Limited Liability Partnership/Limited Partnership', value: 43000000, color: '#8B5CF6', txns: '9,876' },
  { name: 'Post Incorporation ', value: 488000000, color: '#EF4444', txns: '9,876' }
  // ... rest of your data
];

const finanlcialRow: Array<{ title: string; value: string; subValue: string; variant: "green" | "blue" | "yellow" | "purple" | "red"; icon: typeof Wallet; trend?: "up" | "down" }> = [
  { title: "Total Revenue", value: "₦487.6M", subValue: "+15.2% YoY", variant: "green", icon: Wallet, trend: "up" },
  { title: "This Month", value: "₦156.2M", subValue: "+6.7% vs last", variant: "blue", icon: CreditCard, trend: "up" },
  { title: "Today's Revenue", value: "₦12.3M", subValue: "28,456 total txns", variant: "yellow", icon: Wallet },
  { title: "Avg Transaction", value: "₦17,134", subValue: "26,123 successful", variant: "purple", icon: BarChart3 },

  { title: "Successful", value: "26,123", subValue: "Successful", variant: "green", icon: CheckCircle2 },
  { title: "Failed", value: "1,478", subValue: "Failed", variant: "red", icon: XCircle },
  { title: "Pending", value: "855", subValue: "Pending", variant: "yellow", icon: Clock },
  { title: "Refunded", value: "87", subValue: "Refunded (₦3.5M)", variant: "purple", icon: RefreshCcw },
];

export function FinancialOversight() {
  return (
    <>
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
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <SectionHeader>Revenue by Entity Type</SectionHeader>
          <div className="flex gap-2">
            <Select><SelectTrigger className="w-[140px]">All Months</SelectTrigger></Select>
            <Select><SelectTrigger className="w-[100px]">All Year</SelectTrigger></Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donut Chart */}
          <div className="h-[300px] flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend for the bottom */}
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 space-y-4">
            {data.map((item) => (
              <div key={item.name} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.txns} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">₦{(item.value / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">48% share</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
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
);