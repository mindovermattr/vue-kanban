<template>
  <button
    :class="{
      'button--contained': variant === 'contained',
      'button--outlined': variant === 'outlined',
      'button--text': variant === 'text',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type IProps = {
  variant: 'contained' | 'outlined' | 'text'
}
defineProps<IProps>()
</script>

<style scoped lang="scss">
.button {
  &--contained {
    background-color: $purple-color;
    color: #fff;
    padding: 10px 14px 10px 14px;
    font-size: 1.75rem;
    font-weight: 500;
  }
}
</style>
