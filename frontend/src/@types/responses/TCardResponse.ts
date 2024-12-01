import type { TCategory, TKanbanCard } from '../TKanban'

export type TCardResponse = TKanbanCard & {
  category: TCategory
  user_id: number | null
}
