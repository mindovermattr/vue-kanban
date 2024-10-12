import { LOCAL_STORAGE_USER } from '@/constants/LocalStorageKeys'
import { getUserFromLS } from '@/helpers/getUserFromLS'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const instance = axios.create({
  baseURL: backendUrl,
})

export const protectedInstance = axios.create({
  baseURL: backendUrl,
})

protectedInstance.interceptors.request.use((config) => {
  const user = getUserFromLS()
  if (user) config.headers.Authorization = `Bearer ${user.token}`
  return config
})

protectedInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    localStorage.removeItem(LOCAL_STORAGE_USER)
    console.error(err)
  }
)
