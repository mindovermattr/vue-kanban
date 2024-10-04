import type { TCardResponse } from '@/types/responses/TCardResponse'
import { type TKanbanCard } from '@/types/TKanban'
import { instance } from './instance'

export const getCards = async (): Promise<TCardResponse[] | undefined> => {
  try {
    const response = await instance.get<TCardResponse[]>(`/tasks`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCard = async (card: TKanbanCard & { category_id: number }) => {
  try {
    await instance.post<TKanbanCard>(`/tasks`, card)
  } catch (error) {
    console.log(error)
  }
}
