<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VButton from './VButton.vue'
import VModalAdd from './VModal/Add/VModalAdd.vue'

const isAddModalVisible = ref(false)
const isUpdateModalVisible = ref(false)

const openAddModalHandler = () => {
  isAddModalVisible.value = true
}
const openUpdateModalHandler = () => {
  isUpdateModalVisible.value = true
}
const closeAddModalHandler = () => {
  isAddModalVisible.value = false
}
const closeUpdateModalHandler = () => {
  isUpdateModalVisible.value = false
}
const router = useRouter()
const clickHander = () => {
  router.push('/SignUp/')
}
</script>

<template>
  <header class="header container">
    <h1 class="header__title">KamBam</h1>

    <div class="header__controls controls">
      <VButton variant="contained" @click="openUpdateModalHandler"> Создать категорию </VButton>
      <VButton variant="contained" @click="openAddModalHandler"> Создать новую задачу </VButton>
      <VButton variant="text" @click="clickHander" class="controls__button controls__button--text">
        Ivan ivanov
      </VButton>
    </div>
  </header>
  <VModalAdd @closeModal="closeAddModalHandler" :is-visible="isAddModalVisible" />
  <!-- <VModalUpdate @closeModal="closeUpdateModalHandler" :is-visible="isUpdateModalVisible" /> -->
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 20px 0;
  &__title {
    font-size: 3rem;
  }
}
.controls {
  display: flex;
  gap: 20px;
  &__button {
    font-size: 1.75rem;
    font-weight: 500;

    &--contained {
      border-radius: 4px;
      background-color: $purple-color;
      color: white;
      padding: 10px 14px;
    }
    &--text {
      color: $purple-color;
      &::after {
        content: '↓';
      }
    }
  }
}
</style>
