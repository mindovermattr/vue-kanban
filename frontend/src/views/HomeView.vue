<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import { onMounted } from 'vue'

onMounted(async () => {})
</script>
<template>
  <VLayout>
    <template #header>
      <VHeader> </VHeader>
    </template>
    <div class="container"></div>
  </VLayout>
</template>

<style scoped></style>
