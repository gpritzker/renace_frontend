'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Props {
  error: string | null
}

export const ErrorAlert = ({ error }: Props) => {
  const [showAlert, setShowAlert] = useState(!!error)
  const [displayedError, setDisplayedError] = useState(error)

  useEffect(() => {
    if (error) {
      setDisplayedError(error)
      setShowAlert(true)
    } else {
      const timeout = setTimeout(() => {
        setShowAlert(false)
      }, 500) // Duración de la animación de salida
      return () => clearTimeout(timeout)
    }
  }, [error])

  useEffect(() => {
    if (!showAlert) {
      const clearErrorTimeout = setTimeout(() => {
        setDisplayedError(null)
      }, 500) // Sincronizado con la animación de salida
      return () => clearTimeout(clearErrorTimeout)
    }
  }, [showAlert])

  return (
    showAlert && (
      <Alert
        variant='destructive'
        className={cn(
          'bg-red-200 text-red-600 text-sm p-4 rounded-md shadow w-full',
          {
            'animate-shake animate-duration-300 animate-ease-in animate-thrice':
              error,
            'animate-fade animate-duration-300 animate-ease-out': !error
          }
        )}
      >
        <AlertDescription className='text-sm'>
          {displayedError}
        </AlertDescription>
      </Alert>
    )
  )
}
