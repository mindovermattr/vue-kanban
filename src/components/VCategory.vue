<template>
  <div
    @click="emit('setCategory', category)"
    class="category"
    :class="{
      'category--web': category === EKanbanCategory.Web,
      'category--research': category === EKanbanCategory.Research,
      'category--copywriting': category === EKanbanCategory.Copywriting,
      'category--selection': selectedCategory,
      'category--selected': category === selectedCategory,
    }"
  >
    {{ category }}
  </div>
</template>

<script setup lang="ts">
import { EKanbanCategory } from '@/types/EKanbanCategory'

interface IProps {
  category: EKanbanCategory
  selectedCategory?: EKanbanCategory
}

defineProps<IProps>()

const emit = defineEmits<(e: 'setCategory', item: EKanbanCategory) => void>()
</script>

<style lang="scss" scoped>
.category {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 10px;

  border-radius: 18px;
  transition: 0.3s;
  &--selection {
    opacity: 0.4;
  }
  &--web {
    background: $bg-orange-color;
    color: $orange-text-color;
  }
  &--research {
    background: $bg-violet-color;
    color: $violet-text-color;
  }
  &--copywriting {
    background: $bg-mint-color;
    color: $mint-text-color;
  }
  &--selected {
    opacity: 1;
  }
}
</style>
