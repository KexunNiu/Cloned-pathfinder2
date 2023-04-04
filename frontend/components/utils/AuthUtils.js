import { refreshAccessToken } from './Api'
import { deleteAccessToken, setAccessToken } from './CookieStorage'

// refresh access token or go to login page if refresh token is expired
export const RefreshOrRedirect = (router) => {
  return refreshAccessToken()
    .then((data) => {
      setAccessToken(data.access)
    })
    .catch((e) => {
      // delete token and redirect to login page
      console.error(e.message)
      deleteAccessToken()
      if (router !== null) {
        router.push('/login')
      }
      else {
        router.push('/')
      }
    })
}
