import { getUserFromLS } from '@/helpers/getUserFromLS'
import axios from 'axios'
import { login } from './User.api'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const instance = axios.create({
  baseURL: backendUrl,
})

export const protectedInstance = axios.create({
  baseURL: backendUrl,
})

protectedInstance.interceptors.request.use((config) => {
  const user = getUserFromLS()
  config.headers.Authorization = `Bearer ${user.token}`
  return config
})

protectedInstance.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    const originalConfig = error.config
    if (error.response.status === 401) {
      originalConfig._retry = true
      const user = getUserFromLS()

      try {
        const newUser = {
          user: {
            ...user.user,
            password: JSON.parse(localStorage.getItem('password') as string),
          },
        }
        const rs = await login(newUser)
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: { ...rs?.data },
            token: rs?.token,
          })
        )
        const newToken = rs?.token
        protectedInstance.defaults.headers.common['Authorization'] = newToken

        return protectedInstance(originalConfig)
      } catch (err) {
        console.log(error)
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)
