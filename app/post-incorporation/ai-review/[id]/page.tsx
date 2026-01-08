import { AIReviewDetailPage } from "@/components/pre-incorporation/ai-queue-details"

export const metadata = {
  title: "AI Review Details",
  description: "View AI review details",
}

export default function AIReviewingPage({ params }: { params: { id: string } }) {
  return <AIReviewDetailPage params={{ id: params.id }} />
}
