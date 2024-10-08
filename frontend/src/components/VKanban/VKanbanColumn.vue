<script setup lang="ts">
import VKanbanCard from '@/components/VKanban/VKanbanCard.vue'
import { type EStatusKeys } from '@/types/EStatus'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import { inject, ref } from 'vue'
import VKanbanDropzone from './VKanbanDropzone.vue'

interface IProps {
  items: TCardResponse[]
  column: EStatusKeys
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'onDropDragEvent', event: DragEvent, column: EStatusKeys): void
  (e: 'onDragStart', event: DragEvent, item: TCardResponse): void
}>()

const titles: Record<EStatusKeys, string> = {
  Done: 'Готово',
  InProgress: 'В работе',
  NeedDone: 'Нужно сделать',
  NoStatus: 'Без статуса',
  Testing: 'Тестирование',
}

const isDropzoneSelected = ref(false)

const onDragEnter = () => {
  isDropzoneSelected.value = true
}

const onDragLeave = () => {
  isDropzoneSelected.value = false
}

const onDrop = (event: DragEvent) => {
  isDropzoneSelected.value = false
  emit('onDropDragEvent', event, props.column)
}

const isDragging = inject<{
  value: boolean
  id: number | null
  isHided: boolean
}>('isDragging')!
</script>

<template>
  <section
    class="column"
    :class="{
      'column--dragging': isDragging.value,
    }"
    :data-section="column"
  >
    <h3 class="column__title">{{ titles[column] }}</h3>

    <TransitionGroup name="list" tag="div" class="cards">
      <!-- <VKanbanDropzone
        v-if="isDragging.value"
        :is-selected="isDropzoneSelected"
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent="onDragEnter"
        @dragleave="onDragLeave"
      /> -->
      <VKanbanCard
        v-for="item in items"
        v-bind="item"
        :key="item.id"
        @dragstart="emit('onDragStart', $event, item)"
        draggable="true"
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

.anim {
  animation: none !important;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
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
