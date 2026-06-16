'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    // Sin key configurada, renderizar sin reCAPTCHA (solo en desarrollo)
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{ async: true, defer: true }}
      language='es'
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
