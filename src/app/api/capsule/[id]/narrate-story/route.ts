import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const res = await fetch(`${process.env.BASE_URL}/api/v1/public/capsules/${id}/narrate_story`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    return NextResponse.json({ error: data.error || 'Error al generar el relato' }, { status: res.status })
  }

  const storyText = res.headers.get('X-Story-Text') || ''
  const audioBuffer = await res.arrayBuffer()

  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'X-Story-Text': storyText
    }
  })
}
