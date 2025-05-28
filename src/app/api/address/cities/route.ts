// no es necesario este desarrollo,
// se puede hacer en el cliente incluyendo 'use server' en el action

import { getCities } from '@/actions/address/address-actions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const provinceId = req.nextUrl.searchParams.get('province_id')

  if (!provinceId) {
    return NextResponse.json(
      { error: 'province_id is required' },
      { status: 400 }
    )
  }
  const cities: any = await getCities(Number(provinceId))
  return NextResponse.json(cities)
}
