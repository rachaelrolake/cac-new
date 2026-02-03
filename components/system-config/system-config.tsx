"use client"
import Link from "next/link";
import { Search, File } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const configOptions = {
  "categories": [
    {
      "id": "new-reservation",
      "label": "New Reservation",
      "items": [
        { "title": "Entity Classification", "description": "View and manage different entity classifications available.", "href": "/system-config/reservation?pageType=classification" },
        { "title": "Entity Type (Business Type)", "description": "View and manage the different entity types available.", "href": "/system-config/reservation?pageType=entity-type" },
        { "title": "Nature of Business", "description": "View and manage different entity classifications available.", "href": "/system-config/reservation?pageType=nature" },
        { "title": "Specific Nature of Business", "description": "View and manage specific classifications for a business.", "href": "/system-config/reservation?pageType=specific-nature" },
        { "title": "Reasons for Consent Request", "description": "View and manage the reasons why a user would request consent.", "href": "/system-config/reservation?pageType=consent-reasons" }
      ]
    },
    {
      "id": "registration-setup",
      "label": "Registration Setup",
      "items": [
        { "title": "Proposed Officer Types", "description": "View and manage the different officer types available.", "href": "/system-config/registration?pageType=proposed-officers" },
        { "title": "Identification Type", "description": "View and manage the different identification types available.", "href": "/system-config/registration?pageType=identification-types" }
      ]
    },
    {
      "id": "system-configuration",
      "label": "System Configuration",
      "items": [
        { "title": "Service Fees & Penalties", "description": "View and manage the service fees and penalties applied to the system.", "href": "/system-config/sys-config?pageType=fees" },
        { "title": "Restricted / Banned Words", "description": "View and manage the list of restricted and banned words.", "href": "/system-config/sys-config?pageType=banned-words" },
        // { "title": "Notice Configuration", "description": "Create and send notification to users across the platform.", "href": "/system-config/sys-config?pageType=notifications" }
        { "title": "Notice Configuration", "description": "Create and send notification to users across the platform.", "href": "#" }

      ]
    },
    {
      "id": "ai-configuration",
      "label": "AI Configuration",
      "items": [
        { "title": "Pre-Incorporation", "description": "View and manage AI configuration for pre-incorporation activities.", "href": "#" },
        { "title": "Post Incorporation", "description": "View and manage AI configuration for post-incorporation activities.", "href": "#" },
        { "title": "Insolvency", "description": "View and manage AI configuration for insolvency filings.", "href": "#" }
      ]
    }
  ]
}

export function SystemConfigurationPage() {


  return (
    <div className="mx-auto min-h-screen">
      <Tabs defaultValue="new-reservation" className="w-full">
        <TabsList className="grid grid-cols-4 w-fit bg-gray-200 mb-6">
          {configOptions.categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {configOptions.categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{category.label}</CardTitle>
                <div className="relative w-full max-w-md mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-10 bg-white" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, idx) => (
                    <Card key={idx} className="flex flex-col justify-between border border-slate-200">
                      <CardHeader className="space-y-4">
                        <div className="h-10 w-10 rounded-md bg-green-50 flex items-center justify-center">
                          <File className="h-5 w-5 text-green-700" />
                        </div>
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          asChild
                          variant="default"
                          size="lg"
                          className="w-full text-white"
                        >
                          <Link href={item.href}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
