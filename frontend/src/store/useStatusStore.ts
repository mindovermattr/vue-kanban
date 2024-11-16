import { addStatus as addStatusApi, getStatuses } from '@/api/Status.api'
import type { TStatus } from '@/types/responses/TStatusResponse'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useCardStore } from './useCardsStore'

export const useStatusStore = defineStore('status', {
  state: () => {
    return {
      status: [] as TStatus[],
    }
  },
  getters: {
    categories: (state) => state.status,
  },

  actions: {
    async fetchStatus(deskId: number) {
      const response = await getStatuses(deskId)
      if (axios.isAxiosError(response)) return response.message
      if (response) {
        this.status = response.data
      }
    },
    async addStatus(deskId: number, status: Omit<TStatus, 'id'>) {
      const cardStore = useCardStore()
      const response = await addStatusApi(deskId, status.name)
      if (axios.isAxiosError(response)) return response.message
      else if (response) {
        this.status.push(response.data)
        cardStore.addStatus(response.data)
      }
    },
  },
})
