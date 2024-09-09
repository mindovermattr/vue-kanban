<script setup lang="ts">
import CalendarIcon from '@/components/Icons/CalendarIcon.vue'
import { EKanbanCategory } from '@/types/EKanbanCategory'
import { inject } from 'vue'
import VCategory from '../VCategory.vue'
import VKanbanDropzone from './VKanbanDropzone.vue'

interface IProps {
  id: number
  category: EKanbanCategory
  title: String
  date: String
}

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
      <VCategory class="card__category" :category="category" />
      <button class="card__button">...</button>
    </header>
    <h4 class="card__title">{{ title }}</h4>
    <footer class="card__footer">
      <CalendarIcon />
      <p class="card__date">{{ date }}</p>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.card {
  cursor: grab;
  min-height: 133px;

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
