import type { TCardResponse } from '@/@types/responses/TCardResponse'
import type { TStatus } from '@/@types/responses/TStatusResponse'
import type { TKanbanCard } from '@/@types/TKanban'
import {
  addCard as addCardApi,
  deleteCard as deleteCardApi,
  getCards as getCardsApi,
  updateCard as updateCardApi,
} from '@/api/Cards.api'
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
    ) {
      let cardIndex = 0
      const statusStore = useStatusStore()
      const initialStatuts = statusStore.status.find((el) => el.id === itemStatusId)
      const card = this.filtredCards[initialStatuts!.name].find((card, idx) => {
        cardIndex = idx
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
        if (cardIndex >= 0) this.filtredCards[initialStatuts!.name].splice(cardIndex, 1)

        const selectedStatus = statusStore.status.find((el) => el.id === selectedStatusId)

        this.filtredCards[selectedStatus!.name].push(newCard)
        return resp
      }
    },
    async fetchCards(deskId: number) {
      const cards = await getCardsApi(deskId)
      if (cards) this.setCards(cards)
    },
    async updateCard(deskId: number, card: TCardResponse, oldCard: TCardResponse) {
      const resp = await updateCardApi(deskId, card)

      const statusStore = useStatusStore()

      const initialStatus = statusStore.status.find((el) => el.id === oldCard.status_id)
      const cardIndex = this.filtredCards[initialStatus!.name].findIndex((filtredCard) => {
        return card.id === filtredCard.id
      })

      if (cardIndex >= 0) this.filtredCards[initialStatus!.name].splice(cardIndex, 1)
      const selectedStatus = statusStore.status.find((el) => el.id === card.status_id)
      card.status_id = selectedStatus!.id

      this.filtredCards[selectedStatus!.name].push(card)
      return resp
    },
    updateCardFromSocket(card: TCardResponse) {
      const statusStore = useStatusStore()
      const prevCard = this.cards.find((storeCard) => storeCard.id === card.id)
      const prevCardStatus = statusStore.status.find((el) => el.id === prevCard?.status_id)
      const prevCardIndex = this.filtredCards[prevCardStatus!.name].findIndex(
        (el) => el.id === prevCard?.id
      )

      this.filtredCards[prevCardStatus!.name].splice(prevCardIndex, 1)

      const newCardStatus = statusStore.status.find((el) => el.id === card.status_id)

      this.filtredCards[newCardStatus!.name].push(card)
    },

    async addCard(deskId: number, card: Omit<TKanbanCard, 'id'>) {
      const resp = await addCardApi(deskId, card)
      const statusStore = useStatusStore()
      if (resp) {
        this.cards.push(resp.data)
        this.filtredCards[statusStore.status[0].name].push(resp.data)
      }
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
