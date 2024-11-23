import type { AxiosError } from 'axios'
import type { TUser } from '../TUser'

export type TUserResponse = {
  data: TUser
  token: string
}

export type TUserError = {
  error: string
}

export type TUserResp<T> = Promise<T | AxiosError<TUserError> | string>
