import type { TUser } from '@/types/User'

export const getUserFromLS = (): ({ user: TUser } & { token: string }) | null => {
  const user = localStorage.getItem('user')
  try {
    if (user) {
      const userJSON = JSON.parse(user)
      return userJSON
    } else {
      throw new Error('Нет пользователя в сторе')
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
