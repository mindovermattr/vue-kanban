import { useCardStore } from '@/store/useCardsStore'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import { reactive } from 'vue'

export const useDND = () => {
  const isDragging = reactive<{
    value: boolean
    id: number | null
    isHided: boolean
  }>({
    value: false,
    id: null,
    isHided: false,
  })

  const cards = useCardStore()

  const onStartDragEvent = (event: DragEvent, item: TCardResponse) => {
    if (!event.dataTransfer) return
    isDragging.value = true
    isDragging.id = item.id

    setTimeout(() => {
      ;(event.target! as HTMLElement).classList.add('hide')
      isDragging.isHided = true
    }, 0)
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemID', item.id.toString())
    event.dataTransfer.setData('itemStatus', item.status)
  }

  const onDropDragEvent = (event: DragEvent, selectedStatus: string) => {
    if (!event.dataTransfer) return
    const itemID = event.dataTransfer.getData('itemID')
    const itemStatus = event.dataTransfer.getData('itemStatus')

    cards.replaceCard(selectedStatus, itemStatus, itemID)
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
