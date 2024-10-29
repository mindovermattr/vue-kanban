<script setup lang="ts">
interface IProps {
  iconId: 'status' | 'category' | 'profile' | 'task' | 'down-arrow' | 'plus' | 'delete'
  size?: number
  width?: number
  height?: number
}

const { size = 20 } = defineProps<IProps>()
</script>
<template>
  <svg
    :style="{
      width: width ? `${width}px` : `${size}px`,
      height: height ? `${height}px` : `${size}px`,
    }"
    class="icon"
  >
    <use :xlink:href="`#a${iconId}`" />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 18px;
  height: 18px;
  & > use {
    fill: none;
  }
}
</style>
