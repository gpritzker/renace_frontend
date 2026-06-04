import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()

  const res = await fetch(`${process.env.BASE_URL}/api/v1/public/capsules/${id}/narrate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    return NextResponse.json({ error: data.error || 'Error al narrar' }, { status: res.status })
  }

  const audioBuffer = await res.arrayBuffer()
  return new NextResponse(audioBuffer, { headers: { 'Content-Type': 'audio/mpeg' } })
}
