import type { TUser } from '@/types/User'
import { instance } from './instance'

export const signUp = (user: TUser) => {
  try {
    const response = instance.post('signup', user)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
