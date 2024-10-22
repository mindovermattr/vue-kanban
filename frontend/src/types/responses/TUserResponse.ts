import type { AxiosError } from 'axios'
import type { TUser } from '../User'

export type TUserRespRegistration = {
  data: TUser
  token: string
}

export type TUserRespLogin = {
  data: TUser
  token: string
}

export type TUserResp<T> = Promise<T | AxiosError | string>
