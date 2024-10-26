<script setup lang="ts">
import type { TDesk } from '@/types/TDesk'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import VDeskIcons from '../Icons/VDeskIcons.vue'
import VButton from '../VButton.vue'

interface IProps extends TDesk {
  index: number
}

defineProps<IProps>()

const isOpen = ref(false)

const openHandler = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <article :style="{ animationDelay: `${index * 200}ms` }" class="desk">
    <header class="desk__header header">
      <div class="link">
        <div class="link__circle"></div>
        <RouterLink :to="`/desk/${id}`" class="desk__title">{{ name }}</RouterLink>
      </div>
      <ul class="desk__stats stats">
        <li class="stats__item">
          <VButton data-tooltip="Добавить пользователя" class="stats__button" variant="default"
            ><VDeskIcons :size="20" icon-id="plus"
          /></VButton>
        </li>
        <li class="stats__item">
          <VButton data-tooltip="Удалить доску" class="stats__button" variant="default">
            <VDeskIcons :size="20" icon-id="delete" />
          </VButton>
        </li>
      </ul>
    </header>
    <div
      class="desk__content"
      :class="{
        'desk__content--opened': isOpen,
        'desk__content--closed': !isOpen,
      }"
    >
      <ul class="desk__list list">
        <li class="list__item"><VDeskIcons icon-id="profile" /> Автор: {{ username }}</li>
        <li class="list__item">
          <VDeskIcons icon-id="category" />
          Категории:
          <span v-for="category in categories" :key="category.id">{{ category.name }}</span>
        </li>
        <li class="list__item">
          <VDeskIcons icon-id="task" />
          Задачи:
          <span v-for="task in tasks" :key="task.id">{{ task.name }}</span>
        </li>
        <li class="list__item">
          <VDeskIcons icon-id="status" />
          Колонки:
          <span v-for="status in statuses" :key="status.id">{{ status.name }}</span>
        </li>
      </ul>
      <div class="desk__controls controls"></div>
    </div>
    <VButton
      @click="openHandler"
      class="desk__arrow"
      :class="{
        'desk__arrow--opened': isOpen,
      }"
      variant="default"
      ><VDeskIcons :size="24" icon-id="down-arrow"
    /></VButton>
  </article>
</template>

<style lang="scss" scoped>
.desk {
  flex-basis: 360px;
  min-height: 110px;
  background-color: $white-color;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scale: 0;
  z-index: 1;

  animation: bounce-anim 0.5s ease-in-out forwards;
  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
  }
  &__title {
    @include font-h1();
    color: $blue-color;
    text-transform: capitalize;
  }
  &__arrow {
    align-self: center;
    transition: rotate 0.5s;
    &--opened {
      rotate: 180deg;
      margin-top: 12px;
    }
  }
  &__content {
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;

    &--opened {
      transition: max-height 0.3s ease-in;
      max-height: 110px;
      display: flex;
      flex-direction: column;
    }
  }
}

.link {
  display: flex;
  gap: 12px;
  align-items: center;
  &__circle {
    width: 14px;
    height: 14px;
    border-radius: 100%;
    background-color: rgb(62, 214, 115);
    animation: pulse-anim 2.5s ease-in-out alternate infinite;
  }
}

.stats {
  display: flex;
  gap: 12px;
  &__item {
    @include font-h4();
    font-size: 2.5rem;
  }
  &__button {
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px;
    margin-bottom: 5px;
    position: relative;

    &:hover {
      background-color: $gray-color-40;
    }
  }
}
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__item {
    @include font-h6();
    font-size: 2rem;
    display: flex;
    gap: 8px;
  }
}

.controls {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 12px;
  &__button {
    @include font-h6();
  }
}

@keyframes bounce-anim {
  0% {
    scale: 0;
  }
  100% {
    scale: 1;
  }
}

@keyframes pulse-anim {
  0% {
    scale: 0.7;
  }
  50% {
    scale: 1;
  }
  100% {
    scale: 0.7;
  }
}
</style>
