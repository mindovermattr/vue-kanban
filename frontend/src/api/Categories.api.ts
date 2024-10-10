import type { TCategory } from '@/types/TKanban'
import { protectedInstance } from './instance'

export const getCategories = async (): Promise<TCategory[] | undefined> => {
  try {
    const response = await protectedInstance.get<TCategory[]>(`/categories`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCategory = async (
  category: TCategory
): Promise<Omit<TCategory, 'id'> | undefined> => {
  try {
    const response = await protectedInstance.post<Omit<TCategory, 'id'>>(`/categories`, category)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
