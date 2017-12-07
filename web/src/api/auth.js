import api, { setToken } from './init'
import { getDecodedToken } from './token'

export function signUp({ firstName, lastName, email, password }) {
  return api.post('/auth/register', { firstName, lastName, email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}

export function signOutNow() {
  setToken(null)
}