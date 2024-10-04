import { addCard as addCardApi, getCards as getCardsApi } from '@/api/Cards.api'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import type { TKanbanCard, TKanbanItems } from '@/types/TKanban'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
  state: () => ({
    cards: [] as TCardResponse[],
    filtredCards: {
      done: [],
      inProgress: [],
      needDone: [],
      noStatus: [],
      testing: [],
    } as TKanbanItems,
  }),

  getters: {
    getCards: (state) => state.cards,
    getFiltedCards: (state) => state.filtredCards,
  },
  actions: {
    setCards(cards: TCardResponse[]) {
      this.cards = cards
      this.setFiltredCardsByStatus(cards)
    },

    setFiltredCardsByStatus(cards: TCardResponse[]) {
      const filted = {} as TKanbanItems
      cards.forEach((el, idx) => {
        console.log(el.category)
      })
    },
    async fetchCards() {
      const cards = await getCardsApi()
      if (cards) {
        this.setCards(cards)
        cards.forEach((cardResonse) => {
          this.filtredCards[cardResonse.status].push(cardResonse)
        })
      }
    },

    async addCard(card: TKanbanCard & { category_id: number }) {
      await addCardApi(card)
      console.log(await getCardsApi())
    },
  },
})
