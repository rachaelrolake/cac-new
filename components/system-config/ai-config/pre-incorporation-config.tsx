"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";



const tabs = [
  { id: "name-reservation", label: "Name Reservation" },
  { id: "name-requiring-consent", label: "Name Requiring Conssent" },
  { id: "registration", label: "Registration" }
]
export function PreIncorporationConfigPage() {
  const [activeTab, setActiveTab] = useState("name-reservation")

  return (
    <div className="mx-auto min-h-screen">
      <div>
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-5 w-5" /> Back
        </Button>
      </div>

      <Tabs defaultValue="name-reservation" className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Pre-Incorporation AI Configuration</h1>
          <TabsList className="w-fit bg-gray-200 mb-6">
            {tabs.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>


      </Tabs>
    </div>
  )
}
