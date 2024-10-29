import type { TStatus, TStatusErrorResponse } from '@/types/responses/TStatusResponse'
import axios, { type AxiosResponse } from 'axios'
import { protectedInstance } from './instance'

export const getStatuses = async (
  deskId: number
): Promise<AxiosResponse<TStatus[]> | TStatusErrorResponse | undefined> => {
  try {
    const response = await protectedInstance.get<TStatus[]>(`desks/${deskId}/statuses`)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return error
    return
  }
}

export const addStatus = async (
  deskId: number,
  name: string
): Promise<AxiosResponse<TStatus> | TStatusErrorResponse | undefined> => {
  try {
    const response = await protectedInstance.post<TStatus>(`desks/${deskId}/statuses`, { name })
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error
    }
    return
  }
}
