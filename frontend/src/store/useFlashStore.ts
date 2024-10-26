import { defineStore } from 'pinia'

export const useFlashStore = defineStore('flash', {
  state: () => ({
    isOpened: false,
    message: '',
    timeInMs: 0,
  }),
})
