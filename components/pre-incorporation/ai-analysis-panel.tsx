import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function AIAnalysisPanel() {
  return (
    <Card className="border-blue-200 bg-blue-50 p-4">
      <div className="mb-4 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-foreground">AI Analysis</h3>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-orange-100 px-3 py-2">
          <p className="text-xs font-medium text-orange-700">Ai: Needs Manual Review</p>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground">Confidence Score</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">56%</span>
            <span className="text-xs text-orange-600">Low Confidence - Review Required</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-blue-600">Restricted Words Detected</p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white">Federal</span>
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white">Bank</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-blue-600">Similarity Found</p>
          <div className="mt-3 space-y-2">
            <div className="rounded-lg bg-white px-3 py-2">
              <p className="text-sm font-medium text-foreground">Federal Bank PLC</p>
              <p className="text-xs text-muted-foreground">Status: Active</p>
              <p className="text-right text-xs font-medium text-orange-600">47% Match</p>
            </div>
            <div className="rounded-lg bg-white px-3 py-2">
              <p className="text-sm font-medium text-foreground">Nigerian Banking Corp</p>
              <p className="text-xs text-muted-foreground">Status: Active</p>
              <p className="text-right text-xs font-medium text-orange-600">28% Match</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-orange-600">Consents Required</p>
          <p className="mt-2 text-xs">Yes - Multiple Authorities</p>
        </div>

        <div>
          <p className="text-xs font-medium text-red-600">Restricted words Checked</p>
          <p className="mt-2 text-xs">Failed - 2 Words Flagged</p>
        </div>
      </div>
    </Card>
  )
}
