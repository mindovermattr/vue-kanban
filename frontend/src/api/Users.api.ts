import { ERoles } from '@/@types/ERoles'
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

export const changeUserRole = async (
  deskId: number,
  userId: number,
  role: ERoles
): Promise<AxiosResponse<TUserKanban> | AxiosError> => {
  try {
    //0 - guest 1 - member 2 - admin
    const roleId = Object.values(ERoles).findIndex((el) => el === role)
    const response = await protectedInstance.put<TUserKanban>(
      `desks/${deskId}/desk_users/${userId}`,
      {
        role: roleId,
      }
    )
    return response
  } catch (e: unknown) {
    return e as AxiosError
  }
}
