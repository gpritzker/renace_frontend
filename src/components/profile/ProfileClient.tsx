'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { updateProfile, type IUserProfile } from '@/actions/profile/profile-actions'
import { Mail, Calendar, Phone, CreditCard, User, Pencil, X, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const FormSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  dni: z.string().optional().or(z.literal('')),
  birth_date: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
})

type FormData = z.infer<typeof FormSchema>

interface Props {
  profile: IUserProfile
}

function getInitials(first: string | null, last: string | null) {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase() || '?'
}

function capitalize(s: string | null) {
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const ProfileClient = ({ profile }: Props) => {
  const router = useRouter()
  const { t } = useLanguage()
  const p = t.profile
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: profile.first_name ?? '',
      last_name: profile.last_name ?? '',
      dni: profile.dni ?? '',
      birth_date: profile.birth_date ?? '',
      phone: profile.phone ?? '',
    },
  })

  const handleSubmit = async (data: FormData) => {
    try {
      await updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
        dni: data.dni || undefined,
        birth_date: data.birth_date || undefined,
        phone: data.phone || undefined,
      })
      toast.success(p.updated)
      setIsEditing(false)
      router.refresh()
    } catch (e: any) {
      toast.error(e.message || 'Error')
    }
  }

  const initials = getInitials(profile.first_name, profile.last_name)
  const fullName = [capitalize(profile.first_name), capitalize(profile.last_name)].filter(Boolean).join(' ') || p.noName

  return (
    <div className='min-h-screen bg-gray-50'>

      <div className='bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 px-6 pt-12 pb-20'>
        <div className='max-w-2xl mx-auto flex flex-col items-center text-center gap-4'>
          <div className='w-24 h-24 rounded-full bg-white/20 border-4 border-white/40 backdrop-blur-sm flex items-center justify-center shadow-xl'>
            <span className='text-3xl font-bold text-white tracking-wide'>{initials}</span>
          </div>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold text-white'>{fullName}</h1>
            <p className='text-purple-100 flex items-center justify-center gap-1.5 mt-1 text-sm'>
              <Mail className='w-3.5 h-3.5' />
              {profile.email}
            </p>
          </div>
          <div className='flex items-center gap-2 text-xs text-purple-100 bg-white/10 border border-white/20 rounded-full px-4 py-1.5'>
            <Calendar className='w-3.5 h-3.5' />
            {p.memberSince} {new Date(profile.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div className='max-w-2xl mx-auto px-4 -mt-10 pb-16'>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>

          <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
            <h2 className='text-base font-semibold text-gray-800'>{p.personalData}</h2>
            {!isEditing ? (
              <Button
                size='sm'
                variant='outline'
                className='gap-1.5 text-purple-600 border-purple-200 hover:bg-purple-50'
                onClick={() => setIsEditing(true)}
              >
                <Pencil className='w-3.5 h-3.5' />
                {p.edit}
              </Button>
            ) : (
              <Button
                size='sm'
                variant='ghost'
                className='gap-1.5 text-gray-500'
                onClick={() => { setIsEditing(false); form.reset() }}
              >
                <X className='w-3.5 h-3.5' />
                {p.cancel}
              </Button>
            )}
          </div>

          <div className='px-6 py-6'>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <FormField control={form.control} name='first_name' render={({ field }) => (
                      <FormItem>
                        <FormLabel>{p.firstName}</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name='last_name' render={({ field }) => (
                      <FormItem>
                        <FormLabel>{p.lastName}</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name='dni' render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.auth.dni}</FormLabel>
                        <FormControl><Input placeholder='12345678' {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name='birth_date' render={({ field }) => (
                      <FormItem>
                        <FormLabel>{p.birthDate}</FormLabel>
                        <FormControl><Input type='date' {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name='phone' render={({ field }) => (
                    <FormItem>
                      <FormLabel>{p.phone}</FormLabel>
                      <FormControl><Input placeholder='+54 11 1234-5678' {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button
                    type='submit'
                    disabled={form.formState.isSubmitting}
                    className='w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-0 gap-2'
                  >
                    <Check className='w-4 h-4' />
                    {form.formState.isSubmitting ? p.saving : p.save}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100'>
                <InfoCell icon={<User className='w-4 h-4 text-purple-400' />} label={p.firstName} value={capitalize(profile.first_name)} />
                <InfoCell icon={<User className='w-4 h-4 text-purple-400' />} label={p.lastName} value={capitalize(profile.last_name)} />
                <InfoCell icon={<CreditCard className='w-4 h-4 text-cyan-500' />} label={t.auth.dni} value={profile.dni} />
                <InfoCell icon={<Calendar className='w-4 h-4 text-amber-400' />} label={p.birthDate} value={profile.birth_date ? new Date(profile.birth_date + 'T12:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : null} />
                <InfoCell icon={<Phone className='w-4 h-4 text-green-500' />} label={p.phone} value={profile.phone} className='sm:col-span-2' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCell({ icon, label, value, className }: {
  icon: React.ReactNode
  label: string
  value: string | null | undefined
  className?: string
}) {
  return (
    <div className={`bg-white px-5 py-4 flex items-start gap-3 ${className ?? ''}`}>
      <div className='mt-0.5'>{icon}</div>
      <div>
        <p className='text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5'>{label}</p>
        <p className='text-gray-800 font-medium text-sm'>
          {value || <span className='text-gray-300'>—</span>}
        </p>
      </div>
    </div>
  )
}
