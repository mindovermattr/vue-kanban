import { getStatuses } from '@/api/Status.api'
import type { TStatus } from '@/types/responses/TStatusResponse'
import axios from 'axios'
import { defineStore } from 'pinia'

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
      const resp = await getStatuses(deskId)
      if (axios.isAxiosError(resp)) return resp.message
      if (resp) {
        this.status = resp.data
      }
    },
  },
})
