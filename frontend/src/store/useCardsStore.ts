import {
  addCard as addCardApi,
  getCards as getCardsApi,
  updateCard as updateCardApi,
} from '@/api/Cards.api'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import { defineStore } from 'pinia'
import { useStatusStore } from './useStatusStore'

export const useCardStore = defineStore('cards', {
  state: () => {
    const categoryStore = useStatusStore()
    const filtred: Record<string, []> = {}
    categoryStore.status.forEach((status) => {
      filtred[status] = []
    })
    return {
      cards: [] as TCardResponse[],
      filtredCards: filtred as Record<string, TCardResponse[]>,
    }
  },

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
      const categoryStore = useStatusStore()
      const filtred: Record<string, TCardResponse[]> = {}
      categoryStore.status.forEach((status) => {
        filtred[status] = []
      })

      cards.forEach((el) => {
        if (el.status === 'noStatus')
          filtred['Без статуса'].push({
            ...el,
            status: 'Без статуса',
            category_id: el.category.id,
          })
      })
      this.filtredCards = filtred
      console.log(filtred)
    },

    async replaceCard(selectedStatus: string, itemStatus: string, itemID: string) {
      let cardIndex = 0
      const card = this.filtredCards[itemStatus].find((card, idx) => {
        cardIndex = idx
        return `${card.id}` === itemID
      })

      if (cardIndex >= 0) this.filtredCards[itemStatus].splice(cardIndex, 1)
      if (card) {
        card.status = selectedStatus

        this.filtredCards[selectedStatus].push(card)
        const resp = await updateCardApi(+itemID, card)
        return resp
      }
    },
    async fetchCards() {
      const cards = await getCardsApi()
      if (cards) this.setCards(cards)
    },

    // async updateCard(card: TCardResponse) {
    //   updateCardApi(card)
    // },

    async addCard(card: TCardResponse) {
      await addCardApi(card)
      this.cards.push(card)
    },
  },
})
