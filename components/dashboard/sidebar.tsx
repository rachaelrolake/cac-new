"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building,
  SettingsIcon,
  CreditCard,
  Shield,
  BarChart3,
  Headphones,
  Clock,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MenuItem {
  icon: any
  label: string
  href?: string
  badge?: number
  children?: { label: string; href: string; badge?: number }[]
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Users Management", href: "/dashboard/users" },
  {
    icon: FileText,
    label: "Pre-Incorporation",
    children: [
      { label: "Name Reservation", href: "/pre-incorporation/name-reservation", badge: 99 },
      { label: "Name Requiring Consent", href: "/pre-incorporation/name-requiring-consent", badge: 99 },
      { label: "Registration", href: "/pre-incorporation/registration", badge: 99 },
      { label: "AI Review Queue", href: "/pre-incorporation/ai-review", badge: 99 },
    ],
  },
  {
    icon: Building,
    label: "Post-Incorporation",
    children: [
      { label: "All Post Activity", href: "/post-incorporation/all-post-activity", badge: 99 },
      { label: "Insolvency", href: "/post-incorporation/insolvency", badge: 99 },
      { label: "AI Review Queue", href: "/post-incorporation/ai-review", badge: 99 },
    ],
  },
  { icon: SettingsIcon, label: "System Configuration", href: "/dashboard/system-config" },
  { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
  { icon: Shield, label: "Fraud & Compliance", href: "/dashboard/fraud" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  { icon: Headphones, label: "Customers Support", href: "/dashboard/support" },
  { icon: Clock, label: "Activity", href: "/dashboard/activity" },
]

const bottomMenuItems: MenuItem[] = [
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/help" },
  { icon: SettingsIcon, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean
  onToggle: (expanded: boolean) => void
}) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Pre-Incorporation"])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <aside
      className={cn(
        "group relative flex h-screen flex-col border-r bg-white transition-all duration-300 fixed left-0 top-0",
        isExpanded ? "w-64" : "w-20",
      )}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      {/* Logo */}
      <div className="flex h-20 items-center border-b px-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CAC Logo" className="h-12 w-16" />
          {isExpanded && (
            <div>
              <div className="text-xs font-bold text-emerald-700">CORPORATE AFFAIRS</div>
              <div className="text-xs font-bold text-emerald-700">COMMISSION</div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100",
                    !isExpanded && "justify-center",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {isExpanded && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </>
                  )}
                </button>
                {isExpanded && expandedItems.includes(item.label) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100",
                          pathname === child.href && "bg-gray-100 font-medium text-gray-900",
                        )}
                      >
                        <span>{child.label}</span>
                        {child.badge && (
                          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100",
                  pathname === item.href && "bg-emerald-50 font-medium text-emerald-700",
                  !isExpanded && "justify-center",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isExpanded && <span>{item.label}</span>}
                {item.badge && isExpanded && (
                  <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t p-3">
        <div className="space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100",
                !isExpanded && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isExpanded && <span>{item.label}</span>}
            </Link>
          ))}

          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50",
              !isExpanded && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>

        {/* User Profile */}
        <div className={cn("mt-4 rounded-lg bg-gray-50 p-3", !isExpanded && "flex justify-center")}>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-emerald-700 text-white">SA</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-gray-900">Super Admin</div>
                <div className="truncate text-xs text-gray-500">admin@cac.gov.ng</div>
              </div>
            )}
          </div>
          {isExpanded && (
            <div className="absolute bottom-3 right-3 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
          )}
        </div>
      </div>
    </aside>
  )
}
