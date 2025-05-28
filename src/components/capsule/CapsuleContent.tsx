'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  FolderClockIcon as TimeCapsule,
  Sparkles,
  Clock,
  Calendar,
  Save
} from 'lucide-react'

export const CreateContent = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la cápsula
    alert(`Cápsula "${title}" creada con éxito!`)
  }

  return (
    <div className='max-w-2xl mx-auto py-12 px-4'>
      <div className='mb-8 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='bg-blue-50 p-6 rounded-full'>
            <TimeCapsule className='h-12 w-12 text-[#00a0c6]' />
          </div>
        </div>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Crear Nueva Cápsula
        </h1>
        <p className='text-gray-600 max-w-lg mx-auto'>
          Guarda tus recuerdos, ideas o mensajes en una cápsula del tiempo
          digital. Personaliza tu cápsula con un título y descripción únicos.
        </p>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8'>
        <form onSubmit={handleSubmit}>
          <div className='space-y-6'>
            <div>
              <Label htmlFor='title' className='text-base font-medium'>
                Título de la cápsula
              </Label>
              <div className='mt-1.5'>
                <Input
                  id='title'
                  placeholder='Ej: Mi viaje a Bariloche 2023'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full'
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor='description' className='text-base font-medium'>
                Descripción
              </Label>
              <div className='mt-1.5'>
                <Textarea
                  id='description'
                  placeholder='Describe el contenido de tu cápsula...'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='w-full min-h-[120px]'
                  required
                />
              </div>
            </div>

            <div className='bg-blue-50 rounded-lg p-4 border border-blue-100'>
              <h3 className='flex items-center text-sm font-medium text-blue-800 mb-2'>
                <Sparkles className='h-4 w-4 mr-2' />
                Sugerencias para tu cápsula
              </h3>
              <ul className='text-sm text-blue-700 space-y-1.5'>
                <li className='flex items-start'>
                  <span className='mr-2'>•</span>
                  Añade un título descriptivo que te ayude a identificarla
                  fácilmente
                </li>
                <li className='flex items-start'>
                  <span className='mr-2'>•</span>
                  Incluye detalles importantes en la descripción
                </li>
                <li className='flex items-start'>
                  <span className='mr-2'>•</span>
                  Próximamente podrás añadir fotos, videos y archivos a tu
                  cápsula
                </li>
              </ul>
            </div>

            <div className='pt-4 flex justify-center'>
              <Button
                type='submit'
                className='w-8/12 bg-[#00a0c6] hover:bg-[#0088a9] text-white'
              >
                <Save className='h-4 w-4 mr-2' />
                Guardar Cápsula
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center'>
          <Clock className='h-8 w-8 text-gray-400 mr-3' />
          <div>
            <h3 className='font-medium text-gray-800'>Acceso programado</h3>
            <p className='text-sm text-gray-600'>
              Próximamente podrás programar cuándo se podrá acceder a tu cápsula
            </p>
          </div>
        </div>
        <div className='bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center'>
          <Calendar className='h-8 w-8 text-gray-400 mr-3' />
          <div>
            <h3 className='font-medium text-gray-800'>Recordatorios</h3>
            <p className='text-sm text-gray-600'>
              Próximamente podrás configurar recordatorios para revisar tu
              cápsula
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
