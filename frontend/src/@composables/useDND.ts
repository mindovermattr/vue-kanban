import type { TCardResponse } from '@/@types/responses/TCardResponse'
import { useCardStore } from '@/store/useCardsStore'
import { useFlashStore } from '@/store/useFlashStore'
import { reactive } from 'vue'

export const useDND = (deskId: number) => {
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
      ;(event.target as HTMLElement).classList.add('hide')
      isDragging.isHided = true
    }, 0)
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemID', item.id.toString())
    event.dataTransfer.setData('itemStatus', `${item.status_id}`)
  }

  const onDropDragEvent = async (event: DragEvent, statusSelected: number) => {
    if (!event.dataTransfer) return
    const flashStore = useFlashStore()
    const itemID = event.dataTransfer.getData('itemID')
    const itemStatus = event.dataTransfer.getData('itemStatus')
    const resp = await cards.replaceCard(deskId, statusSelected, +itemStatus, +itemID)
    if (!resp) flashStore.openFlash('У вас нет доступа к обновлению карточек', 1500, 'error')
    else await cards.updateCardFromSocket(resp.data)
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
