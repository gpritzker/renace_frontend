'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { updateCapsule } from '@/actions/capsules/capsule-actions'
import type { ICapsule } from '@/interface/ICapsule'

interface Props {
  capsule: ICapsule
  open: boolean
  onClose: () => void
  onSaved: (updated: ICapsule) => void
}

export const EditCapsuleModal = ({ capsule, open, onClose, onSaved }: Props) => {
  const [title, setTitle] = useState(capsule.title)
  const [description, setDescription] = useState(capsule.description)
  const [openAt, setOpenAt] = useState(
    capsule.open_at ? new Date(capsule.open_at).toISOString().slice(0, 16) : ''
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Título y descripción son obligatorios')
      return
    }
    setIsSaving(true)
    try {
      const updated = await updateCapsule(capsule.id, {
        title,
        description,
        open_at: openAt || null
      })
      toast.success('Cápsula actualizada')
      onSaved(updated)
      onClose()
    } catch (e: any) {
      toast.error(e.message || 'Error al guardar')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Editar cápsula</DialogTitle>
        </DialogHeader>

        <div className='space-y-5 py-2'>
          <div>
            <Label className='font-semibold'>Título</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='mt-1.5'
              placeholder='Título de la cápsula'
            />
          </div>

          <div>
            <Label className='font-semibold'>Descripción / Relato</Label>
            <p className='text-xs text-gray-500 mt-0.5 mb-1.5'>
              Este texto se leerá con tu voz en ElevenLabs. Escribí con naturalidad, como si lo contaras en voz alta.
            </p>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 min-h-[280px] font-mono text-sm leading-relaxed'
              placeholder='Escribí el relato...'
            />
            <p className='text-xs text-gray-400 mt-1 text-right'>{description.length} caracteres</p>
          </div>

          <div>
            <Label className='font-semibold'>
              Fecha de apertura <span className='text-gray-400 font-normal'>(opcional)</span>
            </Label>
            <Input
              type='datetime-local'
              value={openAt}
              onChange={(e) => setOpenAt(e.target.value)}
              className='mt-1.5'
            />
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className='bg-purple-500 hover:bg-purple-600'>
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
