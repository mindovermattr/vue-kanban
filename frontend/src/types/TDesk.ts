import type { TStatus } from './responses/TStatusResponse'
import type { TCategory, TKanbanCard } from './TKanban'

export type TDesk = {
  id: number
  name: string
  username: string
  tasks: TKanbanCard[]
  statuses: TStatus[]
  categories: TCategory[]
}
