<script setup lang="ts">
import type { EDeskIcons } from '@/types/icons/EDeskIcons'

interface IProps {
  iconId: EDeskIcons
  size?: number
  width?: number
  height?: number
  fill?: string
  stroke?: string
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
    <use :class="$attrs.class" :style="{ fill: fill, stroke }" :xlink:href="`#a${iconId}`" />
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
