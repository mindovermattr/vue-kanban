<script setup lang="ts">
import type { TCategory } from '@/@types/TKanban'
import { useField } from 'vee-validate'

interface IProps extends Omit<TCategory, 'desk_id'> {
  isField?: boolean
}

const props = defineProps<IProps>()

const { handleChange, checked } = useField('category_id', undefined, {
  type: 'radio',
  checkedValue: props.id,
})
</script>

<template>
  <div
    @click="handleChange(id)"
    class="category"
    :class="{
      'category--selection': isField && !checked,
    }"
    :style="{ backgroundColor: accent_color, color: main_color }"
  >
    {{ name }}
  </div>
</template>

<style lang="scss" scoped>
.category {
  @include font-h6-bold();
  padding: 5px 14px;
  max-width: 75px;

  overflow: hidden;

  border-radius: 18px;
  transition: 0.3s;
  opacity: 1;
  text-overflow: ellipsis;
  &--selection {
    opacity: 0.4;
  }
}
</style>
