import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const RAILS_API = process.env.BASE_URL

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const formData = await req.formData()

  const res = await fetch(`${RAILS_API}/api/v1/memories`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.accessToken}` },
    body: formData,
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
