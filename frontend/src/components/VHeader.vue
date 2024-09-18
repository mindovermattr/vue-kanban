<script setup lang="ts">
import { ref } from 'vue'
import VModalAdd from './VModal/VModalAdd.vue'

const isModalVisible = ref(false)

const openModalHandler = () => {
  isModalVisible.value = true
}
const closeModalHandler = () => {
  isModalVisible.value = false
}
</script>

<template>
  <header class="header container">
    <h1 class="header__title">KamBam</h1>

    <div class="header__controls controls">
      <button @click="openModalHandler" class="controls__button controls__button--contained">
        Создать новую задачу
      </button>
      <button class="controls__button controls__button--text">Ivan ivanov</button>
    </div>
  </header>
  <VModalAdd @closeModal="closeModalHandler" :is-visible="isModalVisible" />
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
