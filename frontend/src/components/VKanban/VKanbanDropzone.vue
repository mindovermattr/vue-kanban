<script setup lang="ts">
interface IProps {
  isSelected?: boolean
}
defineProps<IProps>()
</script>

<template>
  <div
    class="dropzone"
    :class="{
      'dropzone--selected': isSelected,
    }"
  ></div>
</template>

<style lang="scss" scoped>
.dropzone {
  min-height: 137px;
  min-width: 220px;
  border-radius: 5px;
  border: 1px dashed #94a6be;
  transition: all 0.3s;
  &--selected {
    transform: scale(1.1);
    background-color: #c4cbd3;
  }
}
</style>
