<script setup lang="ts">
import VKanbanColumn from '@/components/VKanban/VKanbanColumn.vue'
import { kanbanCards } from '@/mock/kanbanCards'
import { EStatus, type EStatusKeys } from '@/types/EStatus'
import type { TKanbanCard } from '@/types/TKanban'
import { provide, reactive } from 'vue'

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

provide('isDragging', isDragging)
</script>

<template>
  <div class="container container--kanban">
    <VKanbanColumn
      v-for="(status, column) in EStatus"
      :column="column"
      :key="status"
      :items="kanbanCards[status]"
      :isDragging="isDragging"
      @onDropDragEvent="onDropDragEvent"
      @onDragStart="onStartDragEvent"
      @dragend="onDragEnd"
    />
  </div>
</template>

<style lang="scss" scoped>
.container--kanban {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
@media (max-width: $tablet-width) {
  .container--kanban {
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
