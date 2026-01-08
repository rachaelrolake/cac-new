"use client"
import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIAnalysisPanel } from "@/components/post-incorporation/ai-analysis-panel"
import { WhyAIRecommendedPanel } from "@/components/post-incorporation/why-ai-recommended-panel"
import { Sidebar } from "../dashboard/sidebar"
import { Input } from "../ui/input"


export function AIReviewDetailPage({ params }: { params: { id: string } }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  return (
    <div className="space-y-6">

      <div className="fixed left-0 top-0 h-screen">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      </div>

      <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-20"}`}>
        <header className="border-b bg-white">
          <div className="flex h-20 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Review Queue</h1>
              <p className="text-sm text-gray-500">All Post Applications requiring manual review across all types</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search" className="pl-10" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4">
          <div className="mb-8">
            <Link href="/post-incorporation/ai-review">
              <Button variant="outline" size="sm" className="gap-2 mb-6 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Proposed Name Card */}
              <Card className="mb-6 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <span className="text-lg">🏢</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-foreground">FEDERAL BANK OF NIGERIA LIMITED</h2>
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        Status: Pending
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        AI Score: 67%
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Approved On: Nov 15, 2025 09:49AM</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">AV Code</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">AV-2018-09</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Submitted</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">Nov 15, 2025 09:45AM</p>
                  </div>
                </div>
              </Card>

              {/* Applicant Details Card */}
              <Card className="mb-6 p-6">
                <h3 className="mb-6 text-lg font-semibold text-foreground">Applicant Details</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Nam</p>
                    <p className="mt-2 font-medium text-foreground">John Doe</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Email Address</p>
                    <p className="mt-2 font-medium text-foreground">jdoe@gmail.com</p>
                  </div>
                </div>
              </Card>

              {/* Business Information Tabs */}
              <Card className="p-6">
                <Tabs defaultValue="business" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="business">Business Information</TabsTrigger>
                    <TabsTrigger value="uploads">Uploads</TabsTrigger>
                    <TabsTrigger value="payment">Payment History</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="business" className="mt-6 space-y-6">
                    <div>
                      <h4 className="mb-4 font-semibold text-foreground">Business Details</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Business Classification</p>
                          <p className="mt-2 font-medium text-foreground">
                            Business Name (sole proprietorship or partnership)
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Business Types</p>
                          <p className="mt-2 font-medium text-foreground">Sole Proprietor</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="mb-4 font-semibold text-foreground">Nature of Business Category</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Nature of Business Category</p>
                          <p className="mt-2 font-medium text-foreground">Real Estates</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Specific Nature of Business</p>
                          <p className="mt-2 font-medium text-foreground">Estate Agency</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="mb-4 font-semibold text-foreground">Principal Place of Business</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Nature of Business Category</p>
                          <p className="mt-2 font-medium text-foreground">Real Estates</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Specific Nature of Business</p>
                          <p className="mt-2 font-medium text-foreground">Estate Agency</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="mb-4 font-semibold text-foreground">Particulars of Proprietor</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Nature of Business Category</p>
                          <p className="mt-2 font-medium text-foreground">Real Estates</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Specific Nature of Business</p>
                          <p className="mt-2 font-medium text-foreground">Estate Agency</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="mb-4 font-semibold text-foreground">Nature of Business</h4>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Nature of Business Category</p>
                          <p className="mt-2 font-medium text-foreground">Real Estates</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Specific Nature of Business</p>
                          <p className="mt-2 font-medium text-foreground">Estate Agency</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="uploads" className="mt-6">
                    <p className="text-muted-foreground">Upload content here</p>
                  </TabsContent>

                  <TabsContent value="payment" className="mt-6">
                    <p className="text-muted-foreground">Payment history content here</p>
                  </TabsContent>

                  <TabsContent value="logs" className="mt-6">
                    <p className="text-muted-foreground">Logs content here</p>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Admin Actions */}
              <Card className="mt-6 p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Admin Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                  >
                    Override AI Decisions
                  </Button>
                  <Button className="bg-emerald-700 hover:bg-emerald-800">Approve</Button>
                  <Button variant="destructive">Reject</Button>
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent">
                    Flag
                  </Button>
                  <Button variant="outline">Request for Documents</Button>
                </div>
              </Card>
            </div>

            {/* Right Column - Panels */}
            <div className="space-y-6">
              <AIAnalysisPanel />
              <WhyAIRecommendedPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
