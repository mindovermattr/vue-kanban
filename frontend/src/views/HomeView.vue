<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
import Vkanban from '@/components/VKanban/VKanban.vue'
</script>

<template>
  <VHeader />
  <main class="main">
    <Vkanban />
  </main>
</template>

<style lang="scss" scoped>
.main {
  background-color: $bg-gray-color;
  height: max(calc(100vh - 77px), 100%);
}
</style>
