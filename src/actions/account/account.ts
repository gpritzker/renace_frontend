'use server'

import { httpServer } from '@/lib/api/httpServer'
import { ENDPOINTS } from '@/constants/apiEndpoints'

interface FetchError extends Error {
  status?: number
}

export const fetchProfile = async (): Promise<any> => {
  try {
    return await httpServer(ENDPOINTS.ACCOUNT.CAPSULES, {
      method: 'GET'
    })
  } catch (error) {
    const fetchError = error as FetchError
    console.error('Error fetching profile:', {
      message: fetchError.message,
      status: fetchError.status
    })
    throw error
  }
}

export const updateProfile = async (user: any): Promise<any> => {
  const requestBody = {
    user: {
      ...user
    }
  }
  try {
    return await httpServer(ENDPOINTS.ACCOUNT.FRIENDS, {
      method: 'PATCH',
      body: JSON.stringify(requestBody)
    })
  } catch (error) {
    const fetchError = error as FetchError
    console.error('Error with profile:', {
      message: fetchError.message,
      status: fetchError.status
    })
    throw error
  }
}
