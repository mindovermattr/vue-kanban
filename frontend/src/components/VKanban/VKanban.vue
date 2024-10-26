<script setup lang="ts">
import VKanbanColumn from '@/components/VKanban/VKanbanColumn.vue'
import { useDND } from '@/helpers/useDND'
import { useCardStore } from '@/store/useCardsStore'
import { useStatusStore } from '@/store/useStatusStore'
import { onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const cardStore = useCardStore()
const statusStore = useStatusStore()

const route = useRoute()
const router = useRouter()

const { isDragging, onDragEnd, onDropDragEvent, onStartDragEvent } = useDND(+route.params.id)

onMounted(async () => {
  await statusStore.fetchStatus(+route.params.id)
  await cardStore.fetchCards(+route.params.id)
})

provide('isDragging', isDragging)
</script>

<template>
  <div
    :style="{ 'grid-template-columns': `repeat(${statusStore.status.length}, 220px)` }"
    class="container container--kanban"
    v-if="statusStore.status.length"
  >
    <VKanbanColumn
      v-for="status in statusStore.status"
      :columnName="status.name"
      :columnId="status.id"
      :key="status.id"
      :items="cardStore.filtredCards[status.name]"
      class="anim"
      @onDropDragEvent="onDropDragEvent"
      @onDragStart="onStartDragEvent"
      @dragend="onDragEnd"
    />
  </div>
  <div class="container container--message" v-else>Самое время создать первую колонку!</div>
</template>

<style lang="scss" scoped>
.container {
  &--kanban {
    display: grid;
    gap: 20px;
    overflow-x: scroll;
  }
  &--message {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
