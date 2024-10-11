import type { TUser } from '@/types/User'

export const getUserFromLS = (): (TUser & { token: string }) | undefined => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : undefined
}
