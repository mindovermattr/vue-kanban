import { addCard as addCardApi, getCards as getCardsApi } from '@/api/Cards.api'
import { EStatus, type EStatusKeys } from '@/types/EStatus'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import type { TKanbanItems } from '@/types/TKanban'
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
      const filtred = {
        done: [],
        inProgress: [],
        needDone: [],
        noStatus: [],
        testing: [],
      } as TKanbanItems
      cards.forEach((el) => {
        filtred[el.status].push(el)
      })
      this.filtredCards = filtred
      console.log(filtred)
    },

    replaceCard(selectedStatus: EStatusKeys, itemStatus: EStatus, itemID: string) {
      let cardIndex
      const card = this.filtredCards[itemStatus].find((card, idx) => {
        cardIndex = idx
        return `${card.id}` === itemID
      })

      if (cardIndex! >= 0) this.filtredCards[itemStatus].splice(cardIndex!, 1)
      if (card) {
        const newStatus = EStatus[selectedStatus]
        card.status = newStatus

        this.filtredCards[newStatus].push(card)
      }
    },
    async fetchCards() {
      const cards = await getCardsApi()
      if (cards) {
        this.setCards(cards)
      }
    },

    async addCard(card: TCardResponse) {
      await addCardApi(card)
      await this.fetchCards()
    },
  },
})
