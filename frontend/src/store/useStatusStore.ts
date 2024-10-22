import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', {
  state: () => {
    return {
      status: [] as string[],
    }
  },
  getters: {
    categories: (state) => state.status,
  },

  actions: {
    async fetchCategories() {
      this.status = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестиование', 'Готово']
      return ['Без статуса', 'Нужно сделать', 'В работе', 'Тестиование', 'Готово']
    },
  },
})
