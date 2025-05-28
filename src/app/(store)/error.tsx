'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
      <h2 className='text-xl font-semibold'>Algo salio mal!</h2>
      <Button onClick={() => reset()}>Intente nuevamente</Button>
    </div>
  )
}
