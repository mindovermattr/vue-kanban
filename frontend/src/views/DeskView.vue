<script setup lang="ts">
import { useMobile } from '@/@composables/useMobile'
import { useModal } from '@/@composables/useModal'
import VButton from '@/components/VButton.vue'
import VFlash from '@/components/VFlash/VFlash.vue'
import VHeader from '@/components/VHeader.vue'
import Vkanban from '@/components/VKanban/VKanban.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import VModalAddCard from '@/components/VModal/Add/Card/VModalAddCard.vue'
import VModalAddCategory from '@/components/VModal/Add/Category/VModalAddCategory.vue'
import VModalAddStatus from '@/components/VModal/Add/Status/VModalAddStatus.vue'
import VModalUsers from '@/components/VModal/Users/VModalUsers.vue'
import { ref } from 'vue'

defineProps<{ id: string }>()

const isAddModalVisible = ref(false)
const isCategoryModalVisible = ref(false)
const isStatusModalVisible = ref(false)
const isUsersModalVisible = ref(false)

const { closeModal: closeAddModalHandler, openModal: openAddModalHandler } =
  useModal(isAddModalVisible)

const { closeModal: closeCategoryModalHandler, openModal: openCategoryModalHandler } =
  useModal(isCategoryModalVisible)

const { closeModal: closeStatusModal, openModal: openStatusModal } = useModal(isStatusModalVisible)
const { closeModal: closeUsersModal, openModal: openUsersModal } = useModal(isUsersModalVisible)
const { isMobile } = useMobile()
</script>

<template>
  <VLayout>
    <template #header>
      <VHeader>
        <template v-if="!isMobile">
          <VButton variant="contained" @click="openCategoryModalHandler">
            Создать категорию
          </VButton>
          <VButton variant="contained" @click="openAddModalHandler"> Создать новую задачу </VButton>
        </template>
      </VHeader>
    </template>
    <Vkanban @openStatusModal="openStatusModal" @openUsersModal="openUsersModal" />
    <template #modal>
      <VModalAddCard @closeModal="closeAddModalHandler" :is-visible="isAddModalVisible" />
      <VModalAddCategory
        @closeModal="closeCategoryModalHandler"
        :is-visible="isCategoryModalVisible"
      />
      <VModalAddStatus @closeModal="closeStatusModal" :is-visible="isStatusModalVisible" />
      <VModalUsers @close-modal="closeUsersModal" :is-visible="isUsersModalVisible" />
      <VFlash />
    </template>
  </VLayout>
</template>

<style lang="scss" scoped></style>
