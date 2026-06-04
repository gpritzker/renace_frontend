import { NextRequest, NextResponse } from 'next/server'
import { getHeader } from '@/lib/api/headerServer'

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  const headers = await getHeader()

  const res = await fetch(`${process.env.BASE_URL}/api/v1/voice_profile/preview`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(
      { error: data.error || 'Error al generar el audio' },
      { status: res.status }
    )
  }

  const audioBuffer = await res.arrayBuffer()
  return new NextResponse(audioBuffer, {
    headers: { 'Content-Type': 'audio/mpeg' }
  })
}
