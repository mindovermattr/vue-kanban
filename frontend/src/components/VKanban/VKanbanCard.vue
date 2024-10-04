<script setup lang="ts">
import CalendarIcon from '@/components/Icons/CalendarIcon.vue'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import { inject } from 'vue'
import VCategory from '../VCategory.vue'
import VKanbanDropzone from './VKanbanDropzone.vue'

interface IProps extends TCardResponse {}

const props = defineProps<IProps>()

const isDragging = inject<{
  value: boolean
  id: number | null
  isHided: boolean
}>('isDragging')!

const onDragEnd = () => {
  isDragging.value = false
  isDragging.id = null
  isDragging.isHided = false
}
</script>

<template>
  <VKanbanDropzone v-if="isDragging?.isHided && isDragging?.id === id" />
  <article v-else class="card" @dragend="onDragEnd">
    <header class="card__header">
      <VCategory :is-field="false" class="card__category" v-bind="category" />
      <button class="card__button">...</button>
    </header>
    <h4 class="card__title">{{ name }}</h4>
    <footer class="card__footer">
      <CalendarIcon />
      <p class="card__date">{{ period }}</p>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.card {
  cursor: grab;
  min-height: 133px;
  min-width: 220px;
  background-color: $bg-white-color;
  padding: 13px 13px 19px 11px;
  border-radius: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  &__button {
    letter-spacing: 3px;
    font-size: 2.5rem;
    color: rgb(148, 166, 190);
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 500;
    line-height: 16px;

    margin-top: 12px;
  }
  &__footer {
    display: flex;
    gap: 6px;
    margin-top: 35px;
  }
  &__date {
    color: rgb(148, 166, 190);
    font-size: 10px;
    font-weight: 400;
  }
  &__category {
    padding: 5px 14px;
  }
}
.column {
  &__dropzone {
    min-height: 200px;
    border-radius: 5px;
    border: 1px dashed #94a6be;
    transition: all 0.5s;
  }
}
</style>
