<script setup lang="ts">
import { useModal } from '@/@composables/useModal'
import VButton from '@/components/VButton.vue'
import VFlash from '@/components/VFlash/VFlash.vue'
import VHeader from '@/components/VHeader.vue'
import Vkanban from '@/components/VKanban/VKanban.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import VModalAddCard from '@/components/VModal/Add/Card/VModalAddCard.vue'
import VModalAddCategory from '@/components/VModal/Add/Category/VModalAddCategory.vue'
import VModalAddStatus from '@/components/VModal/Add/Status/VModalAddStatus.vue'
import { ref } from 'vue'

defineProps<{ id: string }>()

const isAddModalVisible = ref(false)
const isCategoryModalVisible = ref(false)
const isStatusModalVisible = ref(false)

const { closeModal: closeAddModalHandler, openModal: openAddModalHandler } =
  useModal(isAddModalVisible)

const { closeModal: closeCategoryModalHandler, openModal: openCategoryModalHandler } =
  useModal(isCategoryModalVisible)

const { closeModal: closeStatusModal, openModal: openStatusModal } = useModal(isStatusModalVisible)
</script>

<template>
  <VLayout>
    <template #header>
      <VHeader>
        <VButton variant="contained" @click="openCategoryModalHandler"> Создать категорию </VButton>
        <VButton variant="contained" @click="openAddModalHandler"> Создать новую задачу </VButton>
      </VHeader>
    </template>
    <Vkanban @openModal="openStatusModal" />
    <template #modal>
      <VModalAddCard @closeModal="closeAddModalHandler" :is-visible="isAddModalVisible" />
      <VModalAddCategory
        @closeModal="closeCategoryModalHandler"
        :is-visible="isCategoryModalVisible"
      />
      <VModalAddStatus @closeModal="closeStatusModal" :is-visible="isStatusModalVisible" />
      <VFlash />
    </template>
  </VLayout>
</template>

<style lang="scss" scoped></style>
