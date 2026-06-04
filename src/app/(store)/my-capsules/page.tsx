export const dynamic = 'force-dynamic'

import { MyCapsulesContent } from "@/components/capsule/MyCapsulesContent"
import { fetchCapsules } from "@/actions/capsules/capsule-actions"

export default async function MyCapsulesPage() {
  const capsules = await fetchCapsules()
  return <MyCapsulesContent initialCapsules={capsules} />
}
