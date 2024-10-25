<template>
  <button
    class="button"
    :disabled="disabled"
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
  variant: 'contained' | 'outlined' | 'text' | 'default'
  disabled?: boolean
}

defineProps<IProps>()
</script>

<style scoped lang="scss">
.button {
  transition:
    color 0.4s,
    background-color 0.4s;
  &--contained {
    background-color: $blue-color;
    color: $white-color;
    padding: 10px 14px 10px 14px;
    font-size: 1.75rem;
    font-weight: 500;
    border-radius: 4px;

    &:hover {
      outline: 0.7px solid $blue-color;
      color: $blue-color;
      background-color: $white-color;
    }
  }
  &--outlined {
    color: $blue-color;
    border-radius: 4px;
    padding: 10px 14px 10px 14px;
    border: 0.7px solid $blue-color;
    &:hover {
      color: $white-color;
      border-color: $white-color;
      background-color: $blue-color;
    }
  }
  &:disabled {
    background-color: $bg-gray-color;
  }
}
</style>
