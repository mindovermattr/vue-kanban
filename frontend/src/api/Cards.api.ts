import { type TKanbanCard } from '@/types/TKanban'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getCards = async (): Promise<TKanbanCard[] | undefined> => {
  try {
    const response = await axios.get<TKanbanCard[]>(`${BASE_URL}/tasks`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCard = async (card: TKanbanCard) => {
  try {
    await axios.post<TKanbanCard[]>(`${BASE_URL}/tasks`, JSON.stringify(card))
  } catch (error) {
    console.log(error)
  }
}
