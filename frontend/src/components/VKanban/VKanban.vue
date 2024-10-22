<script setup lang="ts">
import VKanbanColumn from '@/components/VKanban/VKanbanColumn.vue'
import { useDND } from '@/helpers/useDND'
import { useCardStore } from '@/store/useCardsStore'
import { useStatusStore } from '@/store/useStatusStore'
import { onMounted, provide } from 'vue'

const cardStore = useCardStore()
const statusStore = useStatusStore()

const { isDragging, onDragEnd, onDropDragEvent, onStartDragEvent } = useDND()

onMounted(async () => {
  await statusStore.fetchCategories()
  await cardStore.fetchCards()
  console.log(cardStore.filtredCards)
})

provide('isDragging', isDragging)
</script>

<template>
  <div class="container container--kanban">
    <VKanbanColumn
      v-for="status in statusStore.status"
      :column="status"
      :key="status"
      :items="cardStore.filtredCards[status]"
      :isDragging="isDragging"
      class="anim"
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

.anim {
  animation: 1s 1 alternate bounce;
}

@keyframes bounce {
  0% {
    scale: 0;
  }
  100% {
    scale: 1;
  }
}
@media (max-width: $tablet-width) {
  .container--kanban {
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
