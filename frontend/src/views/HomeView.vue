<script setup lang="ts">
import { getDesks } from '@/api/Desks.api'
import VButton from '@/components/VButton.vue'
import VDesk from '@/components/VDesk/VDesk.vue'
import VHeader from '@/components/VHeader.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import VModalAddDesk from '@/components/VModal/Add/Desk/VModalAddDesk.vue'
import { useModal } from '@/helpers/useModal'
import type { TDesk } from '@/types/TDesk'
import { onMounted, ref } from 'vue'

const desks = ref<TDesk[]>([])

const isDeskModalOpen = ref(false)

const { openModal, closeModal } = useModal(isDeskModalOpen)

onMounted(async () => {
  const response = await getDesks()
  console.log(response)
  if (response) desks.value = response.data
})
</script>
<template>
  <VLayout>
    <template #header>
      <VHeader>
        <VButton @click="openModal" variant="contained">Добавить доску</VButton>
      </VHeader>
    </template>
    <section class="container desks-wrapper">
      <template v-if="desks.length">
        <h2 class="desks__title">Доступные доски:</h2>
        <div class="desks">
          <VDesk v-for="(desk, idx) in desks" :index="idx" :key="desk.id" v-bind="desk" />
        </div>
      </template>
      <div v-else>
        <h2>Сейчас доступных досок нет. Самое время создать!</h2>
      </div>
    </section>
    <template #modal
      ><VModalAddDesk @closeModal="closeModal" :is-visible="isDeskModalOpen" />
    </template>
  </VLayout>
</template>

<style lang="scss" scoped>
.desks {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
  &-wrapper {
    padding-top: 32px;
  }
  &__title {
    @include font-h1();
    font-size: 3.5rem;
  }
}
</style>
