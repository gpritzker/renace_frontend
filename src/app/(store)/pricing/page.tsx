import { PricingContent } from '@/components/pricing/PricingContent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProfile } from '@/actions/profile/profile-actions'

export default async function PricingPage() {
  const session = await getServerSession(authOptions)
  let isPremium = false
  let userEmail = session?.user?.email ?? null
  if (session) {
    try {
      const profile = await getProfile()
      isPremium = profile.premium ?? false
    } catch {}
  }
  return <PricingContent isLoggedIn={!!session} isPremium={isPremium} userEmail={userEmail} />
}
