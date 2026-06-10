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
import { useLanguage } from '@/contexts/LanguageContext'

interface Props {
  capsule: ICapsule
  open: boolean
  onClose: () => void
  onSaved: (updated: ICapsule) => void
}

export const EditCapsuleModal = ({ capsule, open, onClose, onSaved }: Props) => {
  const { t } = useLanguage()
  const c = t.capsule
  const [title, setTitle] = useState(capsule.title)
  const [description, setDescription] = useState(capsule.description)
  const [openAt, setOpenAt] = useState(
    capsule.open_at ? new Date(capsule.open_at).toISOString().slice(0, 16) : ''
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error(`${c.titleLabel} y ${c.descriptionLabel.toLowerCase()} son obligatorios`)
      return
    }
    setIsSaving(true)
    try {
      const updated = await updateCapsule(capsule.id, { title, description, open_at: openAt || null })
      toast.success(c.saved)
      onSaved(updated)
      onClose()
    } catch (e: any) {
      toast.error(e.message || 'Error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{c.editTitle}</DialogTitle>
        </DialogHeader>

        <div className='space-y-5 py-2'>
          <div>
            <Label className='font-semibold'>{c.titleLabel}</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='mt-1.5'
              placeholder={c.titlePlaceholder}
            />
          </div>

          <div>
            <Label className='font-semibold'>{c.editDescLabel}</Label>
            <p className='text-xs text-gray-500 mt-0.5 mb-1.5'>{c.editDescHint}</p>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 min-h-[280px] font-mono text-sm leading-relaxed'
              placeholder={c.editDescPlaceholder}
            />
            <p className='text-xs text-gray-400 mt-1 text-right'>{description.length} {c.characters}</p>
          </div>

          <div>
            <Label className='font-semibold'>
              {c.openAt} <span className='text-gray-400 font-normal'>({c.optional})</span>
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
            {c.cancel}
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className='bg-purple-500 hover:bg-purple-600'>
            {isSaving ? c.saving : c.saveChanges}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
