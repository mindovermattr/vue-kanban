import type { TCardResponse } from '@/types/responses/TCardResponse'
import { type TKanbanCard } from '@/types/TKanban'
import { protectedInstance } from './instance'

export const getCards = async (deskId: number): Promise<TCardResponse[] | undefined> => {
  try {
    const response = await protectedInstance.get<TCardResponse[]>(`desks/${deskId}/tasks`)
    return response.data
  } catch (error: unknown) {
    console.error(error)
  }
}

export const addCard = async (deskId: number, card: TKanbanCard) => {
  try {
    await protectedInstance.post<TKanbanCard>(`desks/${deskId}/tasks`, card)
  } catch (error) {
    console.error(error)
    return error
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
