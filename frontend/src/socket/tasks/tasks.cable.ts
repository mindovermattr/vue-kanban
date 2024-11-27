import type { TCardResponse } from '@/@types/responses/TCardResponse'
import { cable } from '../consumer'

export const createTaskConnection = (id: number, onReciveMessage: (obj: TCardResponse) => void) =>
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
        onReciveMessage(obj)
      },
    }
  )
