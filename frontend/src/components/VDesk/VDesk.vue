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
    <header class="desk__header">
      <RouterLink :to="`/desk/${id}`" class="desk__title">{{ name }}</RouterLink>
      <ul class="desk__stats stats">
        <li class="stats__item"><VDeskIcons :size="18" icon-id="task" /> {{ tasks.length }}</li>
        <li class="stats__item">
          <VDeskIcons :size="18" icon-id="status" /> {{ statuses.length }}
        </li>
        <li class="stats__item">
          <VDeskIcons :size="18" icon-id="category" /> {{ categories.length }}
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
      <div class="desk__controls controls">
        <VButton class="controls__button" variant="contained">Добавить пользователя</VButton>
        <VButton class="controls__button" variant="outlined">Удалить доску</VButton>
      </div>
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

  animation: bounce-anim 0.5s linear forwards;
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
    transition: max-height 0.5s ease-out;

    &--opened {
      transition: max-height 0.5s ease-in;
      max-height: 180px;
      display: flex;
      flex-direction: column;
    }
  }
}

.stats {
  display: flex;
  gap: 12px;
  &__item {
    @include font-h4();
    font-size: 2.5rem;
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
</style>
