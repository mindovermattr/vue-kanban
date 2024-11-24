import type { TCategory } from '@/@types/TKanban'
import { protectedInstance } from './instance'

export const getCategories = async (deskId: number): Promise<TCategory[] | undefined> => {
  try {
    const response = await protectedInstance.get<TCategory[]>(`desks/${deskId}/categories`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const addCategory = async (
  category: Omit<TCategory, 'id'>,
  deskId: number
): Promise<TCategory | undefined> => {
  try {
    const response = await protectedInstance.post<TCategory>(`desks/${deskId}/categories`, category)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
