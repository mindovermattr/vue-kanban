import type { TUser } from '@/types/User'
import { instance } from './instance'

export const signUp = async (user: TUser) => {
  try {
    const response = await instance.post('signup', user)

    return {
      data: response.data,
      token: response.headers['authorization'].split(' ')[1],
    }
  } catch (error) {
    console.error(error)
  }
}

export const login = async (user: TUser) => {
  try {
    const response = await instance.post('login', user)

    console.log(respose)
  } catch (error) {
    console.error(error)
  }
}
