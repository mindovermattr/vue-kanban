<script setup lang="ts">
import type { TCardResponse } from '@/@types/responses/TCardResponse'
import VKanbanCard from '@/components/VKanban/VKanbanCard.vue'
import { inject, ref } from 'vue'
import VKanbanDropzone from './VKanbanDropzone.vue'

interface IProps {
  items: TCardResponse[] | undefined
  columnName: string
  columnId: number
}
const props = defineProps<IProps>()
const currentDate = new Date()

const emit = defineEmits<{
  (e: 'onDropDragEvent', event: DragEvent, column: number): void
  (e: 'onDragStart', event: DragEvent, item: TCardResponse): void
}>()

const isDropzoneSelected = ref(false)

const onDragEnter = () => {
  isDropzoneSelected.value = true
}

const onDragLeave = () => {
  isDropzoneSelected.value = false
}

const onDrop = (event: DragEvent) => {
  isDropzoneSelected.value = false
  emit('onDropDragEvent', event, props.columnId)
}

const isDragging = inject<{
  value: boolean
  id: number | null
  isHided: boolean
}>('isDragging')!

const checkCard = (period: string) => {
  const cardDate = new Date(period)
  if (cardDate < currentDate) {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <section
    class="column"
    :class="{
      'column--dragging': isDragging.value,
    }"
    :data-section="columnName"
  >
    <h3 class="column__title">{{ columnName }}</h3>

    <TransitionGroup name="list" tag="div" class="cards">
      <VKanbanCard
        v-for="item in items"
        v-bind="item"
        :key="item.id"
        @dragstart="emit('onDragStart', $event, item)"
        :draggable="checkCard(item.period)"
      />
    </TransitionGroup>
    <VKanbanDropzone
      v-if="isDragging.value"
      :is-selected="isDropzoneSelected"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent="onDragEnter"
      @dragleave="onDragLeave"
    />
  </section>
</template>

<style lang="scss" scoped>
.column {
  margin-top: 38.5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__title {
    color: rgb(148, 166, 190);
    font-size: 1.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  &--dragging {
    padding-bottom: 70px;
  }
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-move,
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-enter-from {
  transform: translateX(20px);
}

.list-leave-active {
  position: absolute;
}

@media (max-width: $tablet-width) {
  .cards {
    flex-direction: row;
    overflow-x: scroll;
  }
}
</style>
