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

    async fetchCategories() {
      const categories = await categoriesApi.getCategories()
      if (categories) {
        this.setCategories(categories)
      }
    },

    async addCategory(category: Omit<TCategory, 'id'>) {
      await categoriesApi.addCategory(category)
      await this.fetchCategories()
    },
  },
})
