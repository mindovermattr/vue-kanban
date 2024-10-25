import type { TCardResponse } from '@/types/responses/TCardResponse'
import { type TKanbanCard } from '@/types/TKanban'
import type { AxiosResponse } from 'axios'
import { protectedInstance } from './instance'

export const getCards = async (deskId: number): Promise<TCardResponse[] | undefined> => {
  try {
    const response = await protectedInstance.get<TCardResponse[]>(`desks/${deskId}/tasks`)
    return response.data
  } catch (error: unknown) {
    console.error(error)
  }
}

export const addCard = async (
  deskId: number,
  card: Omit<TKanbanCard, 'id'>
): Promise<AxiosResponse<TCardResponse> | undefined> => {
  try {
    return await protectedInstance.post<TCardResponse>(`desks/${deskId}/tasks`, card)
  } catch (error) {
    console.log(error)
  }
}

export const updateCard = async (deskId: number, id: number, card: TCardResponse) => {
  try {
    const resp = await protectedInstance.put(`desks/${deskId}/tasks/${id}`, card)
    return resp
  } catch (error) {
    return error
  }
}
