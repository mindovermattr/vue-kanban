import type { TCardResponse } from '@/@types/responses/TCardResponse'
import type { TStatus } from '@/@types/responses/TStatusResponse'
import type { TKanbanCard } from '@/@types/TKanban'
import {
  addCard as addCardApi,
  deleteCard as deleteCardApi,
  getCards as getCardsApi,
  updateCard as updateCardApi,
} from '@/api/Cards.api'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { useStatusStore } from './useStatusStore'

export const useCardStore = defineStore('cards', {
  state: () => {
    const statusStore = useStatusStore()
    const filtred: Record<string, []> = {}
    statusStore.status.forEach((status) => {
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
    ): Promise<AxiosResponse<TCardResponse, any> | undefined> {
      const statusStore = useStatusStore()
      const initialStatuts = statusStore.status.find((el) => el.id === itemStatusId)
      const card = this.filtredCards[initialStatuts!.name].find((card) => {
        return card.id === itemID
      })

      if (card) {
        const newCard = {
          ...card,
          category_id: card.category.id,
          status_id: selectedStatusId,
        }
        const resp = await updateCardApi(deskId, newCard)
        if (!resp) return

        return resp
      }
    },
    async fetchCards(deskId: number) {
      const cards = await getCardsApi(deskId)
      if (cards) this.setCards(cards)
    },
    async updateCard(deskId: number, card: TCardResponse) {
      const resp = await updateCardApi(deskId, card)
      return resp
    },
    updateCardFromSocket(card: TCardResponse) {
      const statusStore = useStatusStore()
      const prevCard = this.cards.find((storeCard) => storeCard.id === card.id)
      const prevCardStatus = statusStore.status.find((el) => el.id === prevCard?.status_id)

      if (prevCardStatus) {
        const prevCardIndex = this.filtredCards[prevCardStatus.name].findIndex(
          (el) => el.id === prevCard?.id
        )
        this.filtredCards[prevCardStatus.name].splice(prevCardIndex, 1)
        const idx = this.cards.findIndex((el) => el.id === card.id)
        this.cards.splice(idx, 1)
      }
      this.cards.push(card)

      const newCardStatus = statusStore.status.find((el) => el.id === card.status_id)
      if (newCardStatus) this.filtredCards[newCardStatus.name].push(card)
    },

    async addCard(deskId: number, card: Omit<TKanbanCard, 'id'>) {
      const resp = await addCardApi(deskId, card)
      const statusStore = useStatusStore()
    },
    async deleteCard(deskId: number, cardId: number, statusId: number) {
      const statusStore = useStatusStore()
      await deleteCardApi(deskId, cardId)

      const status = statusStore.status.find((el) => el.id === statusId)
      const idx = this.cards.findIndex((el) => el.id === cardId)

      this.cards.splice(idx, 1)
      const statusIdx = this.filtredCards[status!.name].findIndex((el) => el.id === cardId)
      this.filtredCards[status!.name].splice(statusIdx, 1)
    },
    addStatus(status: TStatus) {
      this.filtredCards = {
        ...this.filtredCards,
        [status.name]: [],
      }
    },
  },
})
