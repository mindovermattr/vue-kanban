<script setup lang="ts">
interface IProps {
  iconId: 'status' | 'category' | 'profile' | 'task'
}

defineProps<IProps>()
</script>
<template>
  <svg class="icon">
    <use :xlink-href="`#${iconId}`" />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 100%;
}
</style>
