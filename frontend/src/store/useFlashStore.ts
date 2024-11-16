import { defineStore } from 'pinia'

export const useFlashStore = defineStore('flash', {
  state: () => ({
    message: '',
    isOpen: false,
    timeInMs: 0,
    variant: 'success' as 'success' | 'error',
  }),
  getters: {
    state: (state) => state,
  },
  actions: {
    openFlash(message: string, timeInMs: number, variant = 'success' as 'success' | 'error') {
      ;(this.message = message), (this.timeInMs = timeInMs), (this.isOpen = true)
      this.variant = variant
    },
    closeFlash() {
      this.isOpen = false
    },
  },
})
