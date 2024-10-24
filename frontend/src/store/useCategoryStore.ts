import type { TCategory } from '@/types/TKanban'
import { defineStore } from 'pinia'
import * as categoriesApi from '../api/Categories.api'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as TCategory[],
  }),

  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    setCategories(categories: TCategory[]) {
      this.categories = categories
    },

    async fetchCategories(deskId: number) {
      const categories = await categoriesApi.getCategories(deskId)
      if (categories) {
        this.setCategories(categories)
      }
    },

    async addCategory(deskId: number, category: Omit<TCategory, 'id'>) {
      const resp = await categoriesApi.addCategory(category, deskId)
      if (resp) this.categories.push(resp)
    },
  },
})
