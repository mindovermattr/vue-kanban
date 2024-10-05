<script setup lang="ts">
import VKanbanColumn from '@/components/VKanban/VKanbanColumn.vue'
import { useDND } from '@/helpers/useDND'
import { useCardStore } from '@/store/useCardsStore'
import { EStatus } from '@/types/EStatus'
import { onMounted, provide } from 'vue'

const card = useCardStore()

const { isDragging, onDragEnd, onDropDragEvent, onStartDragEvent } = useDND(card.filtredCards)

onMounted(async () => {
  await card.fetchCards()
})

provide('isDragging', isDragging)
</script>

<template>
  <div class="container container--kanban">
    <VKanbanColumn
      v-for="(status, column) in EStatus"
      :column="column"
      :key="status"
      :items="card.filtredCards[status]"
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
