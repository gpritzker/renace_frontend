export const API_URL = process.env.BASE_URL;

const ACCOUNT = {
    FRIENDS: `${API_URL}/account/friends`,
    CAPSULES: `${API_URL}/account/capsules`,
}

const ADDRESS = {
    CITIES: `${ API_URL}/addresses/cities`,
    PROVINCES: `${API_URL}/addresses/provinces`,
}

const AUTH = {
    LOGIN: `${API_URL}/user/login`,
    LOGOUT: `${API_URL}/user/logout`,
}

export const ENDPOINTS = {
    EXAMPLE: `${API_URL}/NEW`,
    ACCOUNT,
    ADDRESS,
    AUTH
} as const;

