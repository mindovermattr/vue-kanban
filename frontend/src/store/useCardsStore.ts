import { addCard as addCardApi, getCards as getCardsApi } from '@/api/Cards.api'
import type { TKanbanCard, TKanbanItems } from '@/types/TKanban'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
  state: () => ({
    cards: [] as TKanbanCard[],
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
    setCards(cards: TKanbanCard[]) {
      this.cards = cards
    },
    async fetchCards() {
      const cards = await getCardsApi()
      if (cards) {
        this.setCards(cards)

        cards.forEach((card) => {
          this.filtredCards[card.status].push(card)
        })
      }
    },

    async addCard(card: TKanbanCard) {
      this.cards.push(card)
      await addCardApi(card)
    },
  },
})
