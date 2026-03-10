import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinanceCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: LucideIcon;
  variant: "green" | "blue" | "yellow" | "purple" | "red";
  trend?: "up" | "down";
}

const variants = {
  green: "bg-emerald-50/50 border-emerald-100 text-emerald-700",
  blue: "bg-blue-50/50 border-blue-100 text-blue-700",
  yellow: "bg-amber-50/50 border-amber-100 text-amber-700",
  purple: "bg-purple-50/50 border-purple-100 text-purple-700",
  red: "bg-rose-50/50 border-rose-100 text-rose-700",
};

export function FinanceCard({ title, value, subValue, icon: Icon, variant, trend }: FinanceCardProps) {
  return (
    <Card className={cn("border shadow-none", variants[variant])}>
      <CardContent>
        {/* Header: Icon & Title */}
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-4 h-4" />
          <span className="text-xs font-medium opacity-90">{title}</span>
        </div>

        {/* Main Value */}
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </div>

        {/* Footer info: Trend or Subtext */}
        <div className="flex items-center gap-1 text-[11px] font-medium opacity-80">
          {trend === "up" && <span>↗</span>}
          {trend === "down" && <span>↘</span>}
          <span>{subValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}