import { CapsuleExperience } from '@/components/conversation/CapsuleExperience'
import { FolderClockIcon as TimeCapsule, Calendar, Lock } from 'lucide-react'
import { notFound } from 'next/navigation'

interface MediaMemory { id: number; memory_type: 'image' | 'video' | 'audio'; url: string | null }
interface PublicCapsule {
  id: number
  title: string
  description: string
  open_at: string | null
  has_voice: boolean
  owner_name: string
  media_memories: MediaMemory[]
}

async function fetchPublicCapsule(id: string): Promise<PublicCapsule | null> {
  const res = await fetch(`${process.env.BASE_URL}/api/v1/public/capsules/${id}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  })
  if (!res.ok) return null
  return res.json()
}

export default async function PublicCapsulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const capsule = await fetchPublicCapsule(id)
  if (!capsule) notFound()

  const isLocked = capsule.open_at && new Date(capsule.open_at) > new Date()

  return (
    <div className='max-w-2xl mx-auto py-12 px-4 space-y-8'>
      {/* Header */}
      <div className='text-center space-y-3'>
        <div className='flex justify-center'>
          <div className='bg-purple-50 p-5 rounded-full'>
            <TimeCapsule className='h-12 w-12 text-purple-400' />
          </div>
        </div>
        <h1 className='text-3xl font-bold text-gray-800'>{capsule.title}</h1>
        <p className='text-gray-500'>{capsule.description}</p>
        {capsule.open_at && (
          <div className='flex items-center justify-center gap-1 text-sm text-gray-400'>
            <Calendar className='h-4 w-4' />
            Apertura: {new Date(capsule.open_at).toLocaleDateString('es-AR')}
          </div>
        )}
        <p className='text-sm text-purple-500 font-medium'>Cápsula de {capsule.owner_name}</p>
      </div>

      {isLocked ? (
        <div className='flex flex-col items-center gap-4 py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200'>
          <Lock className='h-12 w-12 text-gray-300' />
          <p className='font-medium text-gray-600'>
            Esta cápsula se abre el {new Date(capsule.open_at!).toLocaleDateString('es-AR')}
          </p>
          <p className='text-sm text-gray-400'>Volvé en esa fecha para escuchar a {capsule.owner_name}.</p>
        </div>
      ) : (
        <CapsuleExperience capsule={{ ...capsule, description: capsule.description ?? '' }} />
      )}
    </div>
  )
}
