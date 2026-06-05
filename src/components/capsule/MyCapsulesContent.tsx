"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  FolderClockIcon as TimeCapsule,
  Plus,
  Search,
  Calendar,
  Clock,
  MoreHorizontal,
  Filter,
  Share2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { deleteCapsule } from "@/actions/capsules/capsule-actions"
import { EditCapsuleModal } from "./EditCapsuleModal"
import type { ICapsule } from "@/interface/ICapsule"

interface Props {
  initialCapsules: ICapsule[]
}

export const MyCapsulesContent = ({ initialCapsules }: Props) => {
  const router = useRouter()
  const [capsules, setCapsules] = useState(initialCapsules)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingCapsule, setEditingCapsule] = useState<ICapsule | null>(null)
  const [isPending, startTransition] = useTransition()

  const filteredCapsules = capsules.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteCapsule(id)
        setCapsules((prev) => prev.filter((c) => c.id !== id))
        toast.success("Cápsula eliminada")
      } catch {
        toast.error("No se pudo eliminar la cápsula")
      }
    })
  }

  const handleSaved = (updated: ICapsule) => {
    setCapsules((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
  }

  return (
    <div className="flex flex-col w-full p-4 max-w-7xl mx-auto">
      {editingCapsule && (
        <EditCapsuleModal
          capsule={editingCapsule}
          open={!!editingCapsule}
          onClose={() => setEditingCapsule(null)}
          onSaved={handleSaved}
        />
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <TimeCapsule className="h-8 w-8 mr-3 text-[#00a0c6]" />
            Mis Cápsulas
          </h1>
          <p className="mt-2 text-gray-600">
            Has creado {capsules.length} {capsules.length === 1 ? "cápsula" : "cápsulas"}.
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-purple-300 hover:bg-purple-400 text-white" asChild>
          <Link href="/create-capsule">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cápsula
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar cápsulas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSearchQuery("")}>Todas</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="grid">Vista Cuadrícula</TabsTrigger>
          <TabsTrigger value="list">Vista Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          {filteredCapsules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCapsules.map((capsule) => (
                <CapsuleCard key={capsule.id} capsule={capsule} onDelete={handleDelete} onEdit={(id) => setEditingCapsule(capsules.find(c => c.id === id)!)} />
              ))}
            </div>
          ) : (
            <EmptyState searchQuery={searchQuery} />
          )}
        </TabsContent>

        <TabsContent value="list">
          {filteredCapsules.length > 0 ? (
            <div className="space-y-4">
              {filteredCapsules.map((capsule) => (
                <CapsuleRow key={capsule.id} capsule={capsule} onDelete={handleDelete} onEdit={(id) => setEditingCapsule(capsules.find(c => c.id === id)!)} />
              ))}
            </div>
          ) : (
            <EmptyState searchQuery={searchQuery} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CapsuleCard({ capsule, onDelete, onEdit }: { capsule: ICapsule; onDelete: (id: number) => void; onEdit: (id: number) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-100">
      <Link href={`/capsule/${capsule.id}`} className="block">
        <div className="h-40 bg-gradient-to-r from-purple-50 to-cyan-50 flex items-center justify-center p-4">
          <TimeCapsule className="h-16 w-16 text-purple-500 opacity-50" />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <Link href={`/capsule/${capsule.id}`} className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-800 mb-2 hover:text-purple-600 transition-colors">{capsule.title}</h3>
          </Link>
          <CapsuleMenu capsuleId={capsule.id} approved={capsule.approved} onDelete={onDelete} onEdit={onEdit} />
        </div>
        <Link href={`/capsule/${capsule.id}`} className="block">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{capsule.description}</p>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            Creada: {new Date(capsule.created_at).toLocaleDateString("es-AR")}
          </div>
          {capsule.open_at && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              Apertura: {new Date(capsule.open_at).toLocaleDateString("es-AR")}
            </div>
          )}
          {!capsule.approved && (
            <span className="mt-3 inline-block text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Pendiente de aprobación
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}

function CapsuleRow({ capsule, onDelete, onEdit }: { capsule: ICapsule; onDelete: (id: number) => void; onEdit: (id: number) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">
        <Link href={`/capsule/${capsule.id}`} className="flex flex-col md:flex-row md:items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-purple-50 rounded-lg flex items-center justify-center">
              <TimeCapsule className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-lg text-gray-800">{capsule.title}</h3>
            <p className="text-gray-600 text-sm truncate">{capsule.description}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                Creada: {new Date(capsule.created_at).toLocaleDateString("es-AR")}
              </div>
              {capsule.open_at && (
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Apertura: {new Date(capsule.open_at).toLocaleDateString("es-AR")}
                </div>
              )}
              {!capsule.approved && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Pendiente de aprobación
                </span>
              )}
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2 flex-shrink-0">
          <CapsuleMenu capsuleId={capsule.id} approved={capsule.approved} onDelete={onDelete} onEdit={onEdit} />
        </div>
      </div>
    </div>
  )
}

function CapsuleMenu({ capsuleId, approved, onDelete, onEdit }: {
  capsuleId: number
  approved: boolean
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}) {
  const handleShare = () => {
    const url = `${window.location.origin}/capsule/${capsuleId}`
    navigator.clipboard.writeText(url)
    toast.success('Link copiado al portapapeles')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {approved && (
          <DropdownMenuItem className="cursor-pointer gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Compartir link
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(capsuleId)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => onDelete(capsuleId)}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <TimeCapsule className="h-16 w-16 text-gray-300 mb-4" />
      {searchQuery ? (
        <>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Sin resultados</h3>
          <p className="text-center text-gray-600 mb-6 max-w-md">
            No hay cápsulas que coincidan con &quot;{searchQuery}&quot;.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No tenés cápsulas todavía</h3>
          <p className="text-center text-gray-600 mb-6 max-w-md">
            Creá tu primera cápsula del tiempo para guardar recuerdos, fotos y mensajes.
          </p>
        </>
      )}
      <Button className="bg-[#00a0c6] hover:bg-[#0088a9] text-white" asChild>
        <Link href="/create-capsule">
          <Plus className="h-4 w-4 mr-2" />
          Crear Nueva Cápsula
        </Link>
      </Button>
    </div>
  )
}
