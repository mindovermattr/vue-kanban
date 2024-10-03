<template>
  <div
    @click="handleChange(category)"
    class="category"
    :class="{
      'category--web': category === EKanbanCategory.Web,
      'category--research': category === EKanbanCategory.Research,
      'category--copywriting': category === EKanbanCategory.Copywriting,
      'category--selection': isField && !checked,
    }"
  >
    {{ category }}
  </div>
</template>

<script setup lang="ts">
import { EKanbanCategory } from '@/types/EKanbanCategory'
import { useField } from 'vee-validate'
import { toRefs } from 'vue'

interface IProps {
  name: string
  isField?: boolean
  category: EKanbanCategory
}

const props = defineProps<IProps>()

const { category, name } = toRefs(props)

const emit = defineEmits<(e: 'setCategory', item: EKanbanCategory) => void>()

const { handleChange, checked } = useField(name, undefined, {
  type: 'radio',
  checkedValue: category,
})
</script>

<style lang="scss" scoped>
.category {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 10px;
  padding: 10px 20px;

  border-radius: 18px;
  transition: 0.3s;
  opacity: 1;
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
}
</style>
