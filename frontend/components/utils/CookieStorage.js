import cookie from 'react-cookies'
/**
 * Get JWT token from cookie
 */
export const getJWTToken = () => {
  return cookie.load('accessToken')
}
/**
 * Get refresh token from cookie
 * @returns refresh token from cookie
 */
export const getJWTRefreshToken = () => {
  return cookie.load('refreshToken')
}
/**
 * @returns gets access token from cookie
 */
export const getAccessToken = () => {
  console.log(JSON.parse(Buffer.from(getJWTToken().split('.')[1], 'base64').toString()))

  return JSON.parse(Buffer.from(getJWTToken().split('.')[1], 'base64').toString()).jti
}
/**
 * Save access token to cookie
 */
export const setAccessToken = (token) => {
  return cookie.save('accessToken', token)
}
/**
 * Set refresh token to cookie
 */
export const setRefreshToken = (token) => {
  return cookie.save('refreshToken', token)
}

export const setRole = (role) => {
  return cookie.save('role', role)
}

export const getRole = () => {
  return cookie.load('role')
}


/**
 * Remove access token from cookie
 */
export const deleteAccessToken = () => {
  cookie.remove('accessToken')
  cookie.remove('refreshToken')
  cookie.remove('id')
  window.location.href = '/login';
}
/**
 * Gets the data stored in the JWT token
 */
export const parseJwt = () => {
  try {
    const token = getJWTToken()
    if (token) return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  } catch (e) {
    return null
  }
}
