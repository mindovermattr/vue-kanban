import type { TCategory, TKanbanCard } from '@/@types/TKanban'
import { getMinDate } from '@/helpers/getMinDate'
import { date, number, object, string } from 'yup'

export type IFormCard = TKanbanCard & { selectedDate: Date }
export type IFormCardUpdate = Omit<TKanbanCard, 'category_id' | 'period'> & {
  selectedDate: Date
  category: TCategory
}

export const validationSchemeCard = object<IFormCard>({
  name: string().required('Нужно ввести название').min(4, 'Минимум 4 символа'),
  body: string(),
  category_id: number().required('Нужно выбрать одну из категорий'),
  selectedDate: date()
    .min(getMinDate(), 'Минимальный срок выполнения задачи - следующий день')
    .required('Нужно выбрать дату'),
})

export const validationSchemeCardUpdate = object<IFormCardUpdate>({
  name: string().min(4, 'Минимум 4 символа'),
  body: string(),
  selectedDate: date().min(getMinDate(), 'Минимальный срок выполнения задачи - следующий день'),
})
