type TKanbanCard = {
  id: number
  category_id?: number
  name: string
  period: string
  body: string
  status_id: number
}

type TCategory = {
  name: string
  id: number
  main_color: string
  accent_color: string
  desk_id: number
}

export type { TCategory, TKanbanCard }
