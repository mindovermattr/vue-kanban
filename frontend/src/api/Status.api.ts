import type { TStatus, TStatusErrorResponse } from '@/@types/responses/TStatusResponse'
import axios, { AxiosError, type AxiosResponse } from 'axios'
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
    if (axios.isAxiosError(error)) return error

    return
  }
}

export const updateStatus = async (
  deskId: number,
  statusId: number,
  name: string
): Promise<AxiosResponse<TStatus> | AxiosError> => {
  try {
    const response = await protectedInstance.put<TStatus>(`desks/${deskId}/statuses/${statusId}`, {
      name,
    })
    return response
  } catch (error: unknown) {
    return error as AxiosError
  }
}

export const deleteStatus = async (
  deskId: number,
  statusId: number
): Promise<AxiosResponse<TStatus> | AxiosError> => {
  try {
    const response = await protectedInstance.delete<TStatus>(`desks/${deskId}/statuses/${statusId}`)
    return response
  } catch (error: unknown) {
    return error as AxiosError
  }
}
