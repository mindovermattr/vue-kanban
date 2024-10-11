import type { TUserLogin, TUserRegistration } from '@/types/requests/TUserLogin'
import { instance } from './instance'

export const signUp = async (user: TUserRegistration) => {
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

export const login = async (user: TUserLogin) => {
  try {
    const response = await instance.post('login', user)
    return {
      data: response.data,
      token: response.headers['authorization'].split(' ')[1],
    }
  } catch (error) {
    console.error(error)
  }
}
