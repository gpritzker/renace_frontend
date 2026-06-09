export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Share2, CheckCircle2, AlertCircle } from 'lucide-react'
import { fetchCapsule } from '@/actions/capsules/capsule-actions'
import { fetchMemories } from '@/actions/memories/memory-actions'
import { MemoriesManager } from '@/components/memories/MemoriesManager'

export default async function ManageCapsulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const capsuleId = Number(id)

  const [capsule, memories] = await Promise.all([
    fetchCapsule(capsuleId).catch(() => null),
    fetchMemories(capsuleId).catch(() => []),
  ])

  if (!capsule) notFound()

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/my-capsules"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Mis cápsulas
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{capsule.title}</h1>
            {capsule.description && (
              <p className="text-gray-500 mt-1 text-sm">{capsule.description}</p>
            )}
          </div>
          <span className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${capsule.approved ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
            {capsule.approved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
            {capsule.approved ? 'Aprobada' : 'Pendiente'}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Creada: {new Date(capsule.created_at).toLocaleDateString('es-AR')}
          </span>
          {capsule.open_at && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Se abre: {new Date(capsule.open_at).toLocaleDateString('es-AR')}
            </span>
          )}
        </div>

        {capsule.approved && (
          <div className="mt-3 flex gap-3">
            <Link
              href={`/capsule/${capsule.id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-purple-500 hover:text-purple-700 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              Ver como destinatario
            </Link>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Gestión de memorias */}
      <MemoriesManager capsuleId={capsuleId} initialMemories={memories} />
    </div>
  )
}
