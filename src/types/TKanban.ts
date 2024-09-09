import type { EKanbanCategory } from './EKanbanCategory'
import type { EStatus } from './EStatus'

type TKanbanCard = {
  id: number
  title: string
  date: string
  category: EKanbanCategory
  status: EStatus
}

type TKanbanItems = {
  noStatus: TKanbanCard[]
  needDone: TKanbanCard[]
  inProgress: TKanbanCard[]
  testing: TKanbanCard[]
  done: TKanbanCard[]
}

export type { TKanbanCard, TKanbanItems }
