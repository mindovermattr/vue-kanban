import type { TKanbanCard } from '@/@types/TKanban'
import { getMinDate } from '@/helpers/getMinDate'
import { date, number, object, string } from 'yup'

export type IFormCard = TKanbanCard & { selectedDate: Date }

export const validationSchemeCard = object<IFormCard>({
  name: string().required('Нужно ввести название').min(4, 'Минимум 4 символа'),
  body: string(),
  category_id: number().required('Нужно выбрать одну из категорий'),
  selectedDate: date()
    .min(getMinDate(), 'Минимальный срок выполнения задачи - следующий день')
    .required('Нужно выбрать дату'),
})

export const validationSchemeCardUpdate = object<IFormCard>({
  body: string(),
  selectedDate: date()
    .min(new Date(), 'Минимальный срок выполнения задачи - следующий день')
    .required('Нужно выбрать дату'),
})
