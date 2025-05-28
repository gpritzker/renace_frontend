"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  FolderClockIcon as TimeCapsule,
  Plus,
  Search,
  Calendar,
  Clock,
  ImageIcon,
  FileText,
  MoreHorizontal,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para las cápsulas
const sampleCapsules = [
  {
    id: 1,
    title: "Viaje a Bariloche 2023",
    description: "Recuerdos de nuestro viaje familiar a Bariloche en invierno",
    createdAt: "2023-07-15",
    accessDate: "2024-07-15",
    type: "personal",
    items: { images: 12, videos: 2, documents: 3 },
  },
  {
    id: 2,
    title: "Proyecto Casa Nueva",
    description: "Seguimiento de la construcción de nuestra casa desde los cimientos",
    createdAt: "2023-05-20",
    accessDate: "2025-01-01",
    type: "personal",
    items: { images: 45, videos: 8, documents: 10 },
  },
  {
    id: 3,
    title: "Graduación Universidad",
    description: "Fotos, videos y mensajes de mi graduación universitaria",
    createdAt: "2022-12-10",
    accessDate: "2023-12-10",
    type: "personal",
    items: { images: 30, videos: 5, documents: 2 },
  },
  {
    id: 4,
    title: "Primer Año de Tomás",
    description: "Momentos especiales del primer año de vida de nuestro hijo",
    createdAt: "2023-02-28",
    accessDate: "2028-02-28",
    type: "family",
    items: { images: 120, videos: 15, documents: 5 },
  },
  {
    id: 5,
    title: "Recetas Familiares",
    description: "Colección de recetas tradicionales de la familia",
    createdAt: "2023-09-05",
    accessDate: null,
    type: "family",
    items: { images: 8, videos: 0, documents: 25 },
  },
]

export const MyCapsulesContent = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [capsules, setCapsules] = useState(sampleCapsules)

  // Filtrar cápsulas según la búsqueda
  const filteredCapsules = capsules.filter((capsule) => capsule.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col w-full p-4 max-w-7xl mx-auto">
      {/* Encabezado con estadísticas */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <TimeCapsule className="h-8 w-8 mr-3 text-[#00a0c6]" />
            Mis Cápsulas
          </h1>
          <p className="mt-2 text-gray-600">
            Explora y gestiona tus cápsulas del tiempo digitales. Has creado {capsules.length} cápsulas hasta ahora.
          </p>
        </div>
        <div className="flex items-center justify-center">

        <Button className="mt-4 md:mt-0 bg-purple-300 hover:bg-purple-400 text-white" asChild>
          <Link href="/create-capsule">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cápsula
          </Link>
        </Button>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
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
            <DropdownMenuItem>Todas las cápsulas</DropdownMenuItem>
            <DropdownMenuItem>Personales</DropdownMenuItem>
            <DropdownMenuItem>Familiares</DropdownMenuItem>
            <DropdownMenuItem>Accesibles ahora</DropdownMenuItem>
            <DropdownMenuItem>Programadas para el futuro</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Pestañas para diferentes vistas */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="grid">Vista Cuadrícula</TabsTrigger>
          <TabsTrigger value="list">Vista Lista</TabsTrigger>
        </TabsList>

        {/* Vista de cuadrícula */}
        <TabsContent value="grid">
          {filteredCapsules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCapsules.map((capsule) => (
                <div
                  key={capsule.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-transform hover:scale-102 duration-100 ease-in-out cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-r from-purple-50 to-cyan-50 flex items-center justify-center p-4">
                    <TimeCapsule className="h-16 w-16 text-purple-500 opacity-50" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{capsule.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{capsule.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      Creada: {new Date(capsule.createdAt).toLocaleDateString()}
                    </div>
                    {capsule.accessDate && (
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        Acceso: {new Date(capsule.accessDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {capsule.items.images}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <FileText className="h-3 w-3 mr-1" />
                        {capsule.items.documents}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState searchQuery={searchQuery} />
          )}
        </TabsContent>

        {/* Vista de lista */}
        <TabsContent value="list">
          {filteredCapsules.length > 0 ? (
            <div className="space-y-4">
              {filteredCapsules.map((capsule) => (
                <div
                  key={capsule.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-transform hover:scale-102 duration-100 ease-in-out cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-purple-50 rounded-lg flex items-center justify-center">
                        <TimeCapsule className="h-8 w-8 text-purple-500" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-gray-800">{capsule.title}</h3>
                      <p className="text-gray-600 text-sm">{capsule.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          Creada: {new Date(capsule.createdAt).toLocaleDateString()}
                        </div>
                        {capsule.accessDate && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            Acceso: {new Date(capsule.accessDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
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

// Componente para mostrar cuando no hay cápsulas o no se encontraron resultados
function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <TimeCapsule className="h-16 w-16 text-gray-300 mb-4" />
      {searchQuery ? (
        <>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
          <p className="text-center text-gray-600 mb-6 max-w-md">
            No encontramos cápsulas que coincidan con "{searchQuery}". Intenta con otra búsqueda.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No tienes cápsulas todavía</h3>
          <p className="text-center text-gray-600 mb-6 max-w-md">
            Crea tu primera cápsula del tiempo para guardar recuerdos, fotos y mensajes importantes.
          </p>
        </>
      )}
      <Button className="bg-[#00a0c6] hover:bg-[#0088a9] text-white" asChild>
        <Link href="/capsules/create">
          <Plus className="h-4 w-4 mr-2" />
          Crear Nueva Cápsula
        </Link>
      </Button>
    </div>
  )
}
