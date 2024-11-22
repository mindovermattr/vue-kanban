import type { TUser } from '../User'

export type TUserLogin = { user: Omit<TUser, 'passwordConfirm' | 'username'> }

export type TUserRegistration = {
  user: Omit<TUser, 'passwordConfirm'> & { password_confirmation: string }
}
