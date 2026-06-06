import { getProfile } from '@/actions/profile/profile-actions'
import { ProfileClient } from '@/components/profile/ProfileClient'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const profile = await getProfile()

  return (
    <div className='max-w-2xl mx-auto px-4 py-12'>
      <ProfileClient profile={profile} />
    </div>
  )
}
