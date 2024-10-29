import type { TDesk } from '@/types/TDesk'
import type { AxiosResponse } from 'axios'
import { protectedInstance } from './instance'

export const getDesks = async (): Promise<AxiosResponse<TDesk[]> | undefined> => {
  try {
    const response = await protectedInstance.get<TDesk[]>(`desks`)
    return response
  } catch (error) {
    console.error(error)
  }
}

export const addDesk = async (name: string): Promise<AxiosResponse<TDesk> | undefined> => {
  try {
    const response = await protectedInstance.post<TDesk>(`desks`, { name })
    return response
  } catch (error) {
    console.error(error)
  }
}

export const deleteDesk = async (deskId: number) => {
  try {
    const response = await protectedInstance.delete(`desks/${deskId}`)
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
  }
}
