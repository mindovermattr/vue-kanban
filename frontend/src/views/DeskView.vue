<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VHeader from '@/components/VHeader.vue'
import Vkanban from '@/components/VKanban/VKanban.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import VModalAddCard from '@/components/VModal/Add/Card/VModalAddCard.vue'
import VModalAddCategory from '@/components/VModal/Add/Category/VModalAddCategory.vue'
import { useModal } from '@/helpers/useModal'
import { ref } from 'vue'

defineProps<{ id: string }>()

const isAddModalVisible = ref(false)
const isCategoryModal = ref(false)

const { closeModal: closeAddModalHandler, openModal: openAddModalHandler } =
  useModal(isAddModalVisible)

const { closeModal: closeCategoryModalHandler, openModal: openCategoryModalHandler } =
  useModal(isCategoryModal)
</script>

<template>
  <VLayout>
    <template #header>
      <VHeader>
        <VButton variant="contained" @click="openCategoryModalHandler"> Создать категорию </VButton>
        <VButton variant="contained" @click="openAddModalHandler"> Создать новую задачу </VButton>
      </VHeader>
    </template>
    <Vkanban />
    <template #modal>
      <VModalAddCard @closeModal="closeAddModalHandler" :is-visible="isAddModalVisible" />
      <VModalAddCategory @closeModal="closeCategoryModalHandler" :is-visible="isCategoryModal" />
    </template>
  </VLayout>
</template>

<style lang="scss" scoped></style>
