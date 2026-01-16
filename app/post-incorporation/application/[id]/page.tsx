import { ApplicationDetails } from "@/components/post-incorporation/application-details"

export const metadata = {
  title: "Post Incorporation Activity Review",
  description: "Manage post-incorporation activities for registered entities",
}

export default function ApplicationPage({ params }: { params: { id: string } }) {
  return <ApplicationDetails applicationId={params.id} type="consent" />
}
