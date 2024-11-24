import type { TCategory, TKanbanCard } from '../TKanban'

export type TCardResponse = TKanbanCard & {
  category: TCategory
}
