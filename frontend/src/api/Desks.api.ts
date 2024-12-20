import type { TDesk } from '@/@types/TDesk'
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
    return response
  } catch (error) {
    console.error(error)
  }
}

export const updateDesk = async (desk: TDesk) => {
  try {
    const newDesk = {
      name: desk.name,
    }
    const response = await protectedInstance.put(`desks/${desk.id}`, newDesk)
    return response
  } catch (error) {
    console.error(error)
  }
}

export const createDeskLink = async (
  deskId: number,
  maxUses: number
): Promise<AxiosResponse<{ link: string }> | undefined> => {
  const requestData = {
    max_uses: maxUses,
  }
  try {
    const response = await protectedInstance.post(`desks/${deskId}/invitations`, requestData)
    return response
  } catch (error) {
    console.error(error)
  }
}
