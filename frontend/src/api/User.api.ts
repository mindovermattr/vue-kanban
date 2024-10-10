import type { TUser } from '@/types/User'
import { instance } from './instance'

export const signUp = async (user: TUser) => {
  try {
    const response = await instance.post('signup', user)

    return {
      data: response.data.data,
      token: response.headers['authorization'].split(' ')[1],
    }
  } catch (error) {
    console.error(error)
  }
}

export const login = async (user: { user: TUser }) => {
  try {
    const response = await instance.post('login', user)
    return {
      data: response.data.data,
      token: response.headers['authorization'].split(' ')[1],
    }
  } catch (error) {
    console.error(error)
  }
}
