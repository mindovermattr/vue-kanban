import type { TCardResponse } from '@/types/responses/TCardResponse'
import { type TKanbanCard } from '@/types/TKanban'
import { protectedInstance } from './instance'

export const getCards = async (): Promise<TCardResponse[] | undefined> => {
  try {
    console.log(JSON.parse(localStorage.getItem('user')).token)
    const response = await protectedInstance.get<TCardResponse[]>(`/tasks`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCard = async (card: TKanbanCard) => {
  try {
    await protectedInstance.post<TKanbanCard>(`/tasks`, card, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
    })
  } catch (error) {
    console.log(error)
  }
}
