import type { TCardResponse } from '@/types/responses/TCardResponse'
import { type TKanbanCard } from '@/types/TKanban'
import { protectedInstance } from './instance'

export const getCards = async (): Promise<TCardResponse[] | undefined> => {
  try {
    const response = await protectedInstance.get<TCardResponse[]>(`/tasks`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const addCard = async (card: TKanbanCard) => {
  try {
    await protectedInstance.post<TKanbanCard>(`/tasks`, card)
  } catch (error) {
    console.error(error)
  }
}

export const updateCard = async (card: TCardResponse) => {
  try {
    await protectedInstance.put('/tasks', card)
  } catch (e) {
    console.error(e)
  }
}
