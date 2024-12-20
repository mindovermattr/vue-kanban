import type { TStatus } from '@/@types/responses/TStatusResponse'
import {
  addStatus as addStatusApi,
  deleteStatus as deleteStatusApi,
  getStatuses,
  updateStatus as updateStatusApi,
} from '@/api/Status.api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useCardStore } from './useCardsStore'
import { useFlashStore } from './useFlashStore'

export const useStatusStore = defineStore('status', {
  state: () => {
    return {
      status: [] as TStatus[],
    }
  },
  getters: {
    getStatus: (state) => state.status,
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
    async updateStatus(deskId: number, status: TStatus, name: string) {
      const flesh = useFlashStore()
      const response = await updateStatusApi(deskId, status.id, name)
      if (axios.isAxiosError(response)) {
        flesh.openFlash('Нельзя создать статус с одинаковым именем', 1500, 'error')
        return
      } else if (response) {
        const index = this.status.findIndex((el) => el.id === response.data.id)
        this.status[index] = response.data
        return response.data
      }
    },
    async deleteStatus(deskId: number, status: TStatus) {
      const flesh = useFlashStore()
      const response = await deleteStatusApi(deskId, status.id)
      if (axios.isAxiosError(response)) {
        flesh.openFlash('Не удалось удалить солонку', 1500, 'error')
        return
      } else if (response) {
        flesh.openFlash(`Колонка ${status.name} успешно удалена!`, 1500, 'success')
        const idx = this.status.findIndex((el) => el.id === status.id)
        this.status.splice(idx, 1)
      }
    },
  },
})
