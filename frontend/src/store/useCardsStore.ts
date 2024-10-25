import {
  addCard as addCardApi,
  getCards as getCardsApi,
  updateCard as updateCardApi,
} from '@/api/Cards.api'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import type { TKanbanCard } from '@/types/TKanban'
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
    },

    async replaceCard(
      deskId: number,
      selectedStatusId: number,
      itemStatusId: number,
      itemID: number
    ) {
      let cardIndex = 0
      const statusStore = useStatusStore()
      const initialStatuts = statusStore.status.find((el) => el.id === itemStatusId)
      const card = this.filtredCards[initialStatuts!.name].find((card, idx) => {
        cardIndex = idx
        return card.id === itemID
      })

      if (cardIndex >= 0) this.filtredCards[initialStatuts!.name].splice(cardIndex, 1)
      if (card) {
        const selectedStatus = statusStore.status.find((el) => el.id === selectedStatusId)
        card.status_id = selectedStatusId

        this.filtredCards[selectedStatus!.name].push(card)
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

    async addCard(deskId: number, card: Omit<TKanbanCard, 'id'>) {
      const resp = await addCardApi(deskId, card)
      if (resp) {
        this.cards.push(resp.data)
        this.filtredCards[0].push(resp.data)
      }
    },
  },
})
