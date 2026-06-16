'use server'

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

// Score mínimo según la operación (0.0 bot → 1.0 humano)
const MIN_SCORE: Record<string, number> = {
  login: 0.3,
  register: 0.5,
  default: 0.5,
}

export async function verifyRecaptcha(
  token: string,
  action: string = 'default'
): Promise<{ success: boolean; score?: number; error?: string }> {
  if (!RECAPTCHA_SECRET) {
    // Si no está configurado, dejar pasar (desarrollo sin keys)
    if (process.env.NODE_ENV === 'development') return { success: true }
    return { success: false, error: 'reCAPTCHA no configurado' }
  }

  if (!token) {
    return { success: false, error: 'Token de reCAPTCHA faltante' }
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET,
        response: token,
      }),
    })

    const data = await res.json()

    if (!data.success) {
      return { success: false, error: 'Verificación de reCAPTCHA fallida' }
    }

    const minScore = MIN_SCORE[action] ?? MIN_SCORE.default
    const score: number = data.score ?? 0

    if (score < minScore) {
      return {
        success: false,
        score,
        error: 'Actividad sospechosa detectada. Intentá de nuevo.',
      }
    }

    return { success: true, score }
  } catch {
    return { success: false, error: 'Error al verificar reCAPTCHA' }
  }
}
