export const API_URL = process.env.BASE_URL

const AUTH = {
  LOGIN: `${API_URL}/login`,
  LOGOUT: `${API_URL}/logout`,
  REGISTER: `${API_URL}/signup`,
}

const CAPSULES = {
  LIST: `${API_URL}/api/v1/capsules`,
  SHOW: (id: number) => `${API_URL}/api/v1/capsules/${id}`,
  CREATE: `${API_URL}/api/v1/capsules`,
  UPDATE: (id: number) => `${API_URL}/api/v1/capsules/${id}`,
  DELETE: (id: number) => `${API_URL}/api/v1/capsules/${id}`,
}

const MEMORIES = {
  LIST: `${API_URL}/api/v1/memories`,
  CREATE: `${API_URL}/api/v1/memories`,
  SHOW: (id: number) => `${API_URL}/api/v1/memories/${id}`,
  UPDATE: (id: number) => `${API_URL}/api/v1/memories/${id}`,
  DELETE: (id: number) => `${API_URL}/api/v1/memories/${id}`,
}

const PROFILE = {
  SHOW: `${API_URL}/api/v1/profile`,
  UPDATE: `${API_URL}/api/v1/profile`,
}

export const ENDPOINTS = {
  AUTH,
  CAPSULES,
  MEMORIES,
  PROFILE,
} as const
