'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FlaskConical, Sparkles, Clock, Calendar, Save } from 'lucide-react'
import { toast } from 'sonner'
import { createCapsule } from '@/actions/capsules/capsule-actions'
import { useLanguage } from '@/contexts/LanguageContext'

export const CreateContent = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const c = t.capsule
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
      toast.success(c.saved)
      router.push('/my-capsules')
    } catch (err: any) {
      toast.error(err.message || 'Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-2xl mx-auto'>

        <div className='text-center mb-10'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 mb-4 shadow-lg shadow-purple-100'>
            <FlaskConical className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>{c.createNew}</h1>
          <p className='text-gray-500 max-w-md mx-auto'>{c.createSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5'>
            <div>
              <Label htmlFor='title' className='text-sm font-semibold text-gray-700 mb-1.5 block'>
                {c.titleLabel}
              </Label>
              <Input
                id='title'
                placeholder={c.titlePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='description' className='text-sm font-semibold text-gray-700 mb-1.5 block'>
                {c.descriptionLabel}
              </Label>
              <Textarea
                id='description'
                placeholder={c.descriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='min-h-[120px]'
                required
              />
            </div>
          </div>

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
                  <p className='text-sm font-semibold text-gray-800'>{c.scheduleTitle}</p>
                  <p className='text-xs text-gray-400'>
                    {scheduleEnabled && openAt
                      ? `${c.openAtLabel}: ${new Date(openAt).toLocaleDateString()}`
                      : c.scheduleSubtitle}
                  </p>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${scheduleEnabled ? 'bg-purple-500' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${scheduleEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </button>

            {scheduleEnabled && (
              <div className='px-6 pb-5 border-t border-gray-100 space-y-4'>
                <div>
                  <Label htmlFor='open_at' className='text-sm font-semibold text-gray-700 mb-1.5 block mt-4'>
                    {c.openAtLabel}
                  </Label>
                  <Input
                    id='open_at'
                    type='datetime-local'
                    value={openAt}
                    onChange={(e) => setOpenAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  <p className='text-xs text-gray-400 mt-1.5'>{c.openAtHint}</p>
                </div>
                <div>
                  <Label htmlFor='recipient_email' className='text-sm font-semibold text-gray-700 mb-1.5 block'>
                    {c.recipientEmail} <span className='text-gray-400 font-normal'>({c.optional})</span>
                  </Label>
                  <Input
                    id='recipient_email'
                    type='email'
                    placeholder='milo@ejemplo.com'
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <p className='text-xs text-gray-400 mt-1.5'>{c.recipientEmailHint}</p>
                </div>
              </div>
            )}
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm'>
            <div className='flex items-center gap-3 px-6 py-4 opacity-50'>
              <div className='w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center'>
                <Calendar className='w-5 h-5 text-gray-400' />
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-800'>{c.remindersTitle}</p>
                <p className='text-xs text-gray-400'>{c.remindersSubtitle}</p>
              </div>
              <span className='ml-auto text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-medium'>
                {c.remindersComingSoon}
              </span>
            </div>
          </div>

          <div className='bg-purple-50 rounded-2xl border border-purple-100 p-5'>
            <h3 className='flex items-center text-sm font-semibold text-purple-700 mb-3'>
              <Sparkles className='h-4 w-4 mr-2' />
              {c.tips}
            </h3>
            <ul className='text-sm text-purple-600 space-y-2'>
              <li className='flex items-start gap-2'><span className='mt-0.5 text-purple-400'>•</span>{c.tip1}</li>
              <li className='flex items-start gap-2'><span className='mt-0.5 text-purple-400'>•</span>{c.tip2}</li>
              <li className='flex items-start gap-2'><span className='mt-0.5 text-purple-400'>•</span>{c.tip3}</li>
            </ul>
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-100 h-12 text-base gap-2'
          >
            <Save className='h-4 w-4' />
            {isSubmitting ? c.saving : c.saveCapsule}
          </Button>
        </form>
      </div>
    </div>
  )
}
