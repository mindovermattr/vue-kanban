import type { EStatus } from './EStatus'
import type { TCardResponse } from './responses/TCardResponse'

type TKanbanCard = {
  id: number
  category_id: number
  name: string
  period: Date
  body: string
  status: EStatus
}

type TCategory = {
  name: string
  id: number
  main_color: string
  accent_color: string
}

type TKanbanItems = {
  noStatus: TCardResponse[]
  needDone: TCardResponse[]
  inProgress: TCardResponse[]
  testing: TCardResponse[]
  done: TCardResponse[]
}

export type { TCategory, TKanbanCard, TKanbanItems }
