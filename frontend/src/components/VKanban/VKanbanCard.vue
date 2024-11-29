<script setup lang="ts">
import { EDeskIcons } from '@/@types/icons/EDeskIcons'
import type { TCardResponse } from '@/@types/responses/TCardResponse'
import CalendarIcon from '@/components/Icons/CalendarIcon.vue'
import { inject, ref } from 'vue'
import VDeskIcons from '../Icons/VDeskIcons.vue'
import VButton from '../VButton.vue'
import VCategory from '../VCategory.vue'
import VModalUpdate from '../VModal/Update/VModalUpdate.vue'
import VKanbanDropzone from './VKanbanDropzone.vue'

interface IProps extends TCardResponse {}

defineProps<IProps>()

const isDragging = inject<{
  value: boolean
  id: number | null
  isHided: boolean
}>('isDragging')!

const isModalVisible = ref(false)

const closeModal = () => {
  isModalVisible.value = false
}

const openModal = () => {
  isModalVisible.value = true
}

const onDragEnd = () => {
  isDragging.value = false
  isDragging.id = null
  isDragging.isHided = false
}
</script>

<template>
  <VKanbanDropzone v-if="isDragging?.isHided && isDragging?.id === id" />
  <article v-else class="card" @dragend="onDragEnd">
    <header class="card__header">
      <VCategory :is-field="false" class="card__category" v-bind="category" />
      <div class="card__controls">
        <VButton variant="default" @click="openModal" class="card__button">...</VButton>
      </div>
    </header>
    <h4 class="card__title">{{ name }}</h4>
    <footer class="card__footer">
      <div class="card__period">
        <CalendarIcon />
        <p class="card__date">
          {{ `${period}${$attrs.draggable ? '' : '. Карточка просрочена '}` }}
        </p>
      </div>
      <div class="card__users">
        <VDeskIcons class="card__icon" :size="16" :icon-id="EDeskIcons.users" />
        <span class="card__users-list"
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga provident vitae officiis.
          Dolor, natus hic nisi distinctio qui accusantium ex nam? Est minima exercitationem
          architecto quae earum, unde molestias? Libero.</span
        >
      </div>
    </footer>
    <VModalUpdate
      :status-id="status_id"
      :cardId="id"
      :is-visible="isModalVisible"
      @closeModal="closeModal"
    />
  </article>
</template>

<style lang="scss" scoped>
.card {
  cursor: grab;
  min-height: 133px;
  min-width: 220px;
  background-color: $white-color;
  padding: 13px 13px 19px 11px;
  border-radius: 10px;
  position: relative;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  &__button {
    letter-spacing: 3px;
    font-size: 2.5rem;
    color: rgb(148, 166, 190);
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 500;
    line-height: 16px;

    margin-top: 12px;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 25px;
  }
  &__period {
    display: flex;
    gap: 6px;
  }
  &__users {
    display: flex;
    gap: 6px;
    align-items: center;
    overflow: hidden;
    max-height: 18px;

    &-list {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
      @include font-h6();
      color: $gray-color-100;
    }
  }
  &__icon {
    flex-shrink: 0;
  }
  &__date {
    color: rgb(148, 166, 190);
    font-size: 10px;
    font-weight: 400;
  }
  &__category {
    padding: 5px 14px;
  }

  &[draggable='false'] {
    border: 1px solid rgb(232, 92, 92);
    cursor: no-drop;
    & .card__date {
      color: rgb(232, 92, 92);
    }
  }
  &__controls {
    display: flex;
  }
}
</style>
