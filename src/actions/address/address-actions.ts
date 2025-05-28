'use server'

import { httpServer } from '@/lib/api/httpServer'
import { ENDPOINTS } from '@/constants/apiEndpoints'

const errorOption: any[] = [
  { label: 'No hay opciones disponibles', value: 'error' }
]

export const getProvinces = async (): Promise<any[]> => {
  try {
    const provinces = await httpServer(`${ENDPOINTS.ADDRESS.PROVINCES}`, {
      method: 'GET',
      cache: 'force-cache'
    })

    return provinces.map((province: any) => ({
      label: province.name,
      value: province.id.toString()
    }))
  } catch (e) {
    return errorOption
  }
}

export const getCities = async (provinceId: number): Promise<any[]> => {
  try {
    const cities = await httpServer(
      `${ENDPOINTS.ADDRESS.CITIES}?province_id=${provinceId}`,
      {
        method: 'GET'
      }
    )
    return cities.map((city: any) => ({
      label: city.name,
      value: city.id.toString()
    }))
  } catch (e) {
    return errorOption
  }
}
