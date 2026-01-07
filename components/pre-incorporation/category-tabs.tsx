"use client"

import { Button } from "@/components/ui/button"

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  type: "consent" | "reservation"
}

export function CategoryTabs({ activeCategory, onCategoryChange, type }: CategoryTabsProps) {
  const consentCategories = [
    { id: "company-name", label: "Company Name" },
    { id: "llp", label: "LLP" },
    { id: "lp", label: "LP" },
    { id: "business-name", label: "Business Name" },
    { id: "it", label: "IT" },
  ]

  const reservationCategories = [
    { id: "company-name", label: "Company Name" },
    { id: "llp", label: "LLP" },
    { id: "lp", label: "LP" },
    { id: "business-name", label: "Business Name" },
    { id: "it", label: "IT" },
  ]

  const categories = type === "consent" ? consentCategories : reservationCategories

  return (
    <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
