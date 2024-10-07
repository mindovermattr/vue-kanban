import type { TCategory } from '@/types/TKanban'
import { instance } from './instance'

export const getCategories = async (): Promise<TCategory[] | undefined> => {
  try {
    const response = await instance.get<TCategory[]>(`/categories`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCategory = async (
  category: TCategory
): Promise<Omit<TCategory, 'id'> | undefined> => {
  try {
    const response = await instance.post<Omit<TCategory, 'id'>>(`/categories`, category)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
