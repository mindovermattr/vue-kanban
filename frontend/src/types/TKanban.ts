import type { TCardResponse } from './responses/TCardResponse'

type TKanbanCard = {
  id: number
  category_id: number
  name: string
  period: string
  body: string
  status: string
}

type TCategory = {
  name: string
  id: number
  main_color: string
  accent_color: string
  desk_id: number
}

type TKanbanItems = {
  noStatus: TCardResponse[]
  needDone: TCardResponse[]
  inProgress: TCardResponse[]
  testing: TCardResponse[]
  done: TCardResponse[]
}

export type { TCategory, TKanbanCard, TKanbanItems }
