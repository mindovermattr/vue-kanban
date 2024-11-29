import type { TUserKanban } from '@/@types/TUserKanban'
import type { AxiosError, AxiosResponse } from 'axios'
import { protectedInstance } from './instance'

export const acceptInvite = async (
  link: string
): Promise<AxiosResponse<{ message: string }> | AxiosError> => {
  try {
    const response = await protectedInstance.get<{ message: string }>(link)
    return response
  } catch (e: unknown) {
    return e as AxiosError
  }
}

export const getUsers = async (
  deskId: number
): Promise<AxiosResponse<TUserKanban[]> | AxiosError> => {
  try {
    const response = await protectedInstance.get<TUserKanban[]>(`desks/${deskId}/desk_users`)
    return response
  } catch (e: unknown) {
    return e as AxiosError
  }
}
