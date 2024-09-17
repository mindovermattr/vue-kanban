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

const onDropDragEventMobile = (event: TouchEvent) => {
  event.target!.style.position = 'static'
  event.target!.style.top = null
  event.target!.style.left = null
  document.body.classList.remove('body--modal-open')
  console.log(event.currentTarget)
  onDragEnd()
}
let moving
const onStartDragEventMobile = (event: TouchEvent, item: TKanbanCard) => {
  isDragging.value = true
  isDragging.id = item.id
  // event.target!.style.position = 'absolute'
  moving = event.target

  moving.style.height = moving.clientHeight
  moving.style.width = moving.clientWidth
  moving.style.position = 'fixed'
}

const touchMove = (event: TouchEvent) => {
  if (isDragging.id) {
    moving.style.left = event.changedTouches[0].clientX - moving.clientWidth / 2 + 'px'
    moving.style.top = event.changedTouches[0].clientY - moving.clientHeight / 2 + 'px'
  }
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
      @touchMove="touchMove"
      @onDropDragEventMobile="onDropDragEventMobile"
      @onStartDragEventMobile="onStartDragEventMobile"
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
