<script setup lang="ts">
import { EDeskIcons } from '@/@types/icons/EDeskIcons'
import type { TDesk } from '@/@types/TDesk'
import { RouterLink } from 'vue-router'
import VDeskIcons from '../Icons/VDeskIcons.vue'
import VButton from '../VButton.vue'

interface IProps extends TDesk {
  index: number
}

defineProps<IProps>()
const emit = defineEmits<(e: 'deleteDesk', deskId: number) => void>()
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
          <VButton class="stats__button" variant="default"
            ><VDeskIcons fill="black" :size="20" :icon-id="EDeskIcons.plus"
          /></VButton>
        </li>
        <li class="stats__item">
          <VButton @click="emit('deleteDesk', id)" class="stats__button" variant="default">
            <VDeskIcons :size="20" :icon-id="EDeskIcons.delete" />
          </VButton>
        </li>
      </ul>
    </header>
    <div class="desk__content">
      <ul class="desk__list list">
        <li class="list__item">
          <VDeskIcons :icon-id="EDeskIcons.profile" /> Автор: {{ username }}
        </li>
        <li class="list__item">
          <VDeskIcons :icon-id="EDeskIcons.category" />
          Категории:
          <span v-for="(category, idx) in categories" :key="category.id"
            >{{ `${category.name}${categories[idx + 1] ? ', ' : '.'} ` }}
          </span>
        </li>
        <li class="list__item">
          <VDeskIcons :icon-id="EDeskIcons.task" />
          Задачи:
          <span v-for="(task, idx) in tasks" :key="task.id">{{
            `${task.name}${tasks[idx + 1] ? ', ' : '.'} `
          }}</span>
        </li>
        <li class="list__item">
          <VDeskIcons :icon-id="EDeskIcons.status" />
          Колонки:
          <span v-for="(status, idx) in statuses" :key="status.id">{{
            `${status.name}${statuses[idx + 1] ? ', ' : '.'} `
          }}</span>
        </li>
      </ul>
      <div class="desk__controls controls"></div>
    </div>
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

  &__content {
    overflow: hidden;
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
    background-color: $blue-color;
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

    &:hover {
      background-color: $gray-color-40;
    }
  }
}
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
  &__item {
    @include font-h6();
    font-size: 2rem;
    display: flex;
    gap: 8px;
    max-width: 100%;
    flex-wrap: wrap;
    overflow: hidden;
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
