import { Card } from "@/components/ui/card"
import { CheckCircle2, Info } from "lucide-react"

export function WhyAIRecommendedPanel() {
  return (
    <Card className="border-green-200 bg-green-50 p-4">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-foreground">Why AI Recommended Approval</h3>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          <span className="text-foreground">No existing registered conflicts with identical names</span>
        </div>
        <div className="flex gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          <span className="text-foreground">Industry-appropriate keywords detected</span>
        </div>
        <div className="flex gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          <span className="text-foreground">Naming standards and conventions met</span>
        </div>
        <div className="flex gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          <span className="text-foreground">Similarity score (12%) below threshold (30%)</span>
        </div>
        <div className="flex gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
          <span className="text-foreground">No restricted or prohibited words detected</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2 rounded-lg bg-white px-3 py-2">
        <Info className="h-4 w-4 shrink-0 text-blue-600" />
        <p className="text-xs text-foreground">This Recommendation Was Generated Using CAC AI Review Engine.</p>
      </div>
    </Card>
  )
}
