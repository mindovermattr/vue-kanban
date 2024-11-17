<script setup lang="ts">
import { deleteDesk, getDesks } from '@/api/Desks.api'
import VButton from '@/components/VButton.vue'
import VDesk from '@/components/VDesk/VDesk.vue'
import VDeskSkeleton from '@/components/VDesk/VDeskSkeleton.vue'
import VFlash from '@/components/VFlash/VFlash.vue'
import VHeader from '@/components/VHeader.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import VModalAddDesk from '@/components/VModal/Add/Desk/VModalAddDesk.vue'
import { useModal } from '@/helpers/useModal'
import { useAuthStore } from '@/store/useAuthStore'
import type { TDesk } from '@/types/TDesk'
import { onMounted, ref } from 'vue'

const desks = ref<TDesk[]>([])
const isDeskModalOpen = ref(false)
const isLoading = ref(true)
const authStore = useAuthStore()

const { openModal, closeModal } = useModal(isDeskModalOpen)

const addDesk = (desk: { id: number; name: string }) => {
  desks.value?.push({
    ...desk,
    categories: [],
    username: authStore.user!.username,
    statuses: [],
    tasks: [],
  })
}

const deleteDeskHandler = async (deskId: number) => {
  await deleteDesk(deskId)
  const idx = desks.value!.findIndex((el) => el.id === deskId)
  desks.value?.splice(idx, 1)
}

onMounted(async () => {
  const response = await getDesks()
  console.log(response?.data)
  isLoading.value = false
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
      <h2 class="desks__title">Доступные доски:</h2>
      <div class="desks">
        <template v-if="isLoading">
          <VDeskSkeleton />
        </template>
        <template v-else-if="desks.length">
          <VDesk
            @deleteDesk="deleteDeskHandler"
            v-for="(desk, idx) in desks"
            :index="idx"
            :key="desk.id"
            v-bind="desk"
          />
        </template>
        <div v-else>
          <h2 class="desks__message">
            Сейчас доступных досок нет. Самое время создать или присоединиться!
          </h2>
        </div>
      </div>
    </section>
    <template #modal>
      <VModalAddDesk @addDesk="addDesk" @closeModal="closeModal" :is-visible="isDeskModalOpen" />
      <VFlash />
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
  padding-bottom: 20px;
  &-wrapper {
    padding-top: 32px;
  }
  &__title {
    @include font-h1();
    font-size: 3.5rem;
  }
  &__message {
    @include font-h1();
    color: $gray-color-100;
  }
}
</style>
