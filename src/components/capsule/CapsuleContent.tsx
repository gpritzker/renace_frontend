'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FlaskConical, Sparkles, Clock, Calendar, Save, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import { createCapsule } from '@/actions/capsules/capsule-actions'

export const CreateContent = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [openAt, setOpenAt] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [scheduleEnabled, setScheduleEnabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createCapsule({
        title,
        description,
        ...(scheduleEnabled && openAt ? { open_at: openAt } : {}),
        ...(scheduleEnabled && recipientEmail ? { recipient_email: recipientEmail } : {})
      })
      toast.success('¡Cápsula creada correctamente!')
      router.push('/my-capsules')
    } catch (err: any) {
      toast.error(err.message || 'No se pudo crear la cápsula')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-2xl mx-auto'>

        {/* Header */}
        <div className='text-center mb-10'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 mb-4 shadow-lg shadow-purple-100'>
            <FlaskConical className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Crear nueva cápsula</h1>
          <p className='text-gray-500 max-w-md mx-auto'>
            Guardá tus recuerdos y mensajes para que tus seres queridos los escuchen con tu voz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* Datos principales */}
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5'>
            <div>
              <Label htmlFor='title' className='text-sm font-semibold text-gray-700 mb-1.5 block'>
                Título de la cápsula
              </Label>
              <Input
                id='title'
                placeholder='Ej: Carta para Milo cuando tengas 18 años'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='description' className='text-sm font-semibold text-gray-700 mb-1.5 block'>
                Descripción
              </Label>
              <Textarea
                id='description'
                placeholder='Describí de qué trata esta cápsula, para quién es y qué encontrará adentro...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='min-h-[120px]'
                required
              />
            </div>
          </div>

          {/* Acceso programado */}
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            <button
              type='button'
              onClick={() => setScheduleEnabled(!scheduleEnabled)}
              className='w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors'
            >
              <div className='flex items-center gap-3'>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${scheduleEnabled ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  <Clock className={`w-5 h-5 ${scheduleEnabled ? 'text-purple-500' : 'text-gray-400'}`} />
                </div>
                <div className='text-left'>
                  <p className='text-sm font-semibold text-gray-800'>Acceso programado</p>
                  <p className='text-xs text-gray-400'>
                    {scheduleEnabled && openAt
                      ? `Se abre el ${new Date(openAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}`
                      : 'Configurá cuándo se abre tu cápsula'}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className={`w-10 h-6 rounded-full transition-colors ${scheduleEnabled ? 'bg-purple-500' : 'bg-gray-200'} relative`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${scheduleEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </div>
            </button>

            {scheduleEnabled && (
              <div className='px-6 pb-5 border-t border-gray-100 space-y-4'>
                <div>
                  <Label htmlFor='open_at' className='text-sm font-semibold text-gray-700 mb-1.5 block mt-4'>
                    Fecha y hora de apertura
                  </Label>
                  <Input
                    id='open_at'
                    type='datetime-local'
                    value={openAt}
                    onChange={(e) => setOpenAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <p className='text-xs text-gray-400 mt-1.5'>
                    La cápsula no se podrá ver hasta esta fecha.
                  </p>
                </div>
                <div>
                  <Label htmlFor='recipient_email' className='text-sm font-semibold text-gray-700 mb-1.5 block'>
                    Email del destinatario <span className='text-gray-400 font-normal'>(opcional)</span>
                  </Label>
                  <Input
                    id='recipient_email'
                    type='email'
                    placeholder='milo@ejemplo.com'
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <p className='text-xs text-gray-400 mt-1.5'>
                    Le vamos a mandar el link automáticamente cuando llegue la fecha.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recordatorios */}
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm'>
            <div className='flex items-center gap-3 px-6 py-4 opacity-50'>
              <div className='w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center'>
                <Calendar className='w-5 h-5 text-gray-400' />
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-800'>Recordatorios</p>
                <p className='text-xs text-gray-400'>Próximamente podrás configurar recordatorios.</p>
              </div>
              <span className='ml-auto text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-medium'>Pronto</span>
            </div>
          </div>

          {/* Sugerencias */}
          <div className='bg-purple-50 rounded-2xl border border-purple-100 p-5'>
            <h3 className='flex items-center text-sm font-semibold text-purple-700 mb-3'>
              <Sparkles className='h-4 w-4 mr-2' />
              Sugerencias
            </h3>
            <ul className='text-sm text-purple-600 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='mt-0.5 text-purple-400'>•</span>
                Tu cápsula quedará pendiente de aprobación antes de estar activa.
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-0.5 text-purple-400'>•</span>
                Podés añadir una fecha de apertura para programar cuándo se podrá ver.
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-0.5 text-purple-400'>•</span>
                Una vez aprobada, podés compartir el link con quien quieras.
              </li>
            </ul>
          </div>

          {/* Botón */}
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-100 h-12 text-base gap-2'
          >
            <Save className='h-4 w-4' />
            {isSubmitting ? 'Guardando...' : 'Guardar cápsula'}
          </Button>
        </form>
      </div>
    </div>
  )
}
