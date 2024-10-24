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
      filtred[status.name] = []
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
        filtred[status.name] = []
        cards.forEach((el) => {
          if (el.status_id === status.id)
            filtred[status.name].push({
              ...el,
              category_id: el.category.id,
            })
        })
      })

      this.filtredCards = filtred
      console.log(filtred)
    },

    async replaceCard(
      deskId: number,
      selectedStatus: number,
      itemStatusId: number,
      itemID: string
    ) {
      let cardIndex = 0
      const statusStore = useStatusStore()
      const selected = statusStore.status.find((el) => el.id === itemStatusId)
      const card = this.filtredCards[selected!.name].find((card, idx) => {
        cardIndex = idx
        return `${card.id}` === itemID
      })
      console.log(card)

      if (cardIndex >= 0) this.filtredCards[selected!.name].splice(cardIndex, 1)
      if (card) {
        const s = statusStore.status.find((el) => el.id === selectedStatus)
        card.status_id = selectedStatus

        this.filtredCards[s!.name].push(card)
        const resp = await updateCardApi(deskId, +itemID, card)
        return resp
      }
    },
    async fetchCards(deskId: number) {
      const cards = await getCardsApi(deskId)
      if (cards) this.setCards(cards)
    },

    // async updateCard(card: TCardResponse) {
    //   updateCardApi(card)
    // },

    async addCard(deskId: number, card: TCardResponse) {
      await addCardApi(deskId, card)
      this.cards.push(card)
    },
  },
})
