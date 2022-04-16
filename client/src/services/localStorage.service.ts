const TOKEN_KEY = "jwt-access-token"
const REFRESH_KEY = "jwt-refresh-token"
const EXPIRES_KEY = "jwt-expires"
const USERID_KEY = "userId"

export function setTokens({accessToken, refreshToken, userId, expiresIn = 3600}: { accessToken: string; refreshToken: string; userId: string; expiresIn: number }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, String(expiresDate))
    localStorage.setItem(USERID_KEY, userId)
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY)
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(USERID_KEY)
}

export const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeToken
}