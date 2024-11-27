import type { TKanbanCard } from '@/@types/TKanban'
import { cable } from '../consumer'

export const createTaskConnection = (id: number, cb: (obj: TKanbanCard) => void) =>
  cable.subscriptions.create(
    { channel: 'TasksChannel', desk_id: id },
    {
      connected: () => {
        console.log('im connected')
      },
      disconnected: () => {
        console.log('disconnected')
      },
      received(obj) {
        cb(obj)
      },
    }
  )
