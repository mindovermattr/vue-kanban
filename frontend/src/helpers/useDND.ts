import { EStatus, type EStatusKeys } from '@/types/EStatus'
import type { TKanbanCard, TKanbanItems } from '@/types/TKanban'
import { reactive } from 'vue'

export const useDND = (kanbanCards: TKanbanItems) => {
  const isDragging = reactive<{
    value: boolean
    id: number | null
    isHided: boolean
  }>({
    value: false,
    id: null,
    isHided: false,
  })

  const onStartDragEvent = (event: DragEvent, item: TKanbanCard) => {
    if (!event.dataTransfer) return
    isDragging.value = true
    isDragging.id = item.id

    setTimeout(() => {
      event.target!.classList.add('hide')
      isDragging.isHided = true
    }, 0)
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemID', item.id.toString())
    event.dataTransfer.setData('itemStatus', item.status)
  }

  const onDropDragEvent = (event: DragEvent, selectedStatus: EStatusKeys) => {
    if (!event.dataTransfer) return
    const itemID = event.dataTransfer.getData('itemID')
    const itemStatus = event.dataTransfer.getData('itemStatus') as EStatus

    let cardIndex
    const card = kanbanCards[itemStatus].find((card, idx) => {
      cardIndex = idx
      return `${card.id}` === itemID
    })
    if (cardIndex! >= 0) kanbanCards[itemStatus].splice(cardIndex!, 1)
    if (card) {
      const newStatus = EStatus[selectedStatus]
      card.status = newStatus
      kanbanCards[newStatus].push(card)
    }
    onDragEnd()
  }

  const onDragEnd = () => {
    isDragging.value = false
    isDragging.id = null
    isDragging.isHided = false
  }

  return {
    isDragging,
    onStartDragEvent,
    onDropDragEvent,
    onDragEnd,
  }
}
