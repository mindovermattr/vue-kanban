<script setup lang="ts">
import { useModal } from '@/@composables/useModal'
import { useRouteParams } from '@/@composables/useRouteParams'
import { ERoles } from '@/@types/ERoles'
import { EDeskIcons } from '@/@types/icons/EDeskIcons'
import type { TCardResponse } from '@/@types/responses/TCardResponse'
import type { TStatus } from '@/@types/responses/TStatusResponse'
import VKanbanCard from '@/components/VKanban/VKanbanCard.vue'
import { useCardStore } from '@/store/useCardsStore'
import { useDeskStore } from '@/store/useDeskStore'
import { useStatusStore } from '@/store/useStatusStore'
import { inject, ref } from 'vue'
import VDeskIcons from '../Icons/VDeskIcons.vue'
import VButton from '../VButton.vue'
import VModalUpdateStatus from '../VModal/Update/VModalUpdateStatus.vue'
import VKanbanDropzone from './VKanbanDropzone.vue'

interface IProps {
  items: TCardResponse[] | undefined
  status: TStatus
}
const props = defineProps<IProps>()
const currentDate = new Date()
const isModalVisible = ref(false)
const statusStore = useStatusStore()
const { id } = useRouteParams('id')
const deskStore = useDeskStore()

const { openModal, closeModal } = useModal(isModalVisible)

const emit = defineEmits<{
  (e: 'onDropDragEvent', event: DragEvent, column: number): void
  (e: 'onDragStart', event: DragEvent, item: TCardResponse): void
}>()

const isDropzoneSelected = ref(false)

const onDragEnter = () => {
  isDropzoneSelected.value = true
}

const onDragLeave = () => {
  isDropzoneSelected.value = false
}

const onDrop = (event: DragEvent) => {
  isDropzoneSelected.value = false
  emit('onDropDragEvent', event, props.status.id)
}
const cardStore = useCardStore()
const deleteHandler = async () => {
  await statusStore.deleteStatus(+id, props.status)
  cardStore.setFiltredCardsByStatus(cardStore.cards)
}
const isDragging = inject<{
  value: boolean
  id: number | null
  isHided: boolean
}>('isDragging')!

const checkCard = (period: string) => {
  const cardDate = new Date(period)
  if (cardDate < currentDate) {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <section
    class="column"
    :class="{
      'column--dragging': isDragging.value,
    }"
    :data-section="status.name"
  >
    <div class="column__header">
      <div v-if="deskStore.getRole === ERoles.OWNER" class="column__toolbar">
        <VButton class="column__button" @click="openModal" variant="default">
          <VDeskIcons :size="14" fill="black" :icon-id="EDeskIcons.plus" />
        </VButton>
        <VButton @click="deleteHandler()" class="column__button" variant="default">
          <VDeskIcons :size="14" :icon-id="EDeskIcons.delete" />
        </VButton>
      </div>
      <h3 class="column__title">{{ status.name }}</h3>
    </div>

    <TransitionGroup name="list" tag="div" class="cards">
      <VKanbanCard
        v-for="item in items"
        v-bind="item"
        :key="item.id"
        @dragstart="emit('onDragStart', $event, item)"
        :draggable="checkCard(item.period)"
      />
    </TransitionGroup>
    <VKanbanDropzone
      v-if="isDragging.value"
      :is-selected="isDropzoneSelected"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent="onDragEnter"
      @dragleave="onDragLeave"
    />
    <VModalUpdateStatus :status="status" :isVisible="isModalVisible" @closeModal="closeModal" />
  </section>
</template>

<style lang="scss" scoped>
.column {
  margin-top: 18.5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__title {
    color: rgb(148, 166, 190);
    font-size: 1.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  &--dragging {
    padding-bottom: 70px;
  }
  &__header {
    position: relative;
    display: flex;
    padding: 20px 0;
    &:hover .column__toolbar {
      visibility: visible;
      translate: 0px -17px;
      opacity: 1;
    }
  }
  &__toolbar {
    display: flex;
    align-items: center;
    transition: all 0.3s;
    gap: 8px;
    position: absolute;
    top: 50%;
    right: 20px;
    background-color: $gray-color-40;
    border-radius: 15px;
    opacity: 0;
    visibility: hidden;
  }
  &__button {
    padding: 5px;
    border-radius: 15px;
    &:hover {
      background-color: #fff;
    }
  }
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-move,
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-enter-from {
  transform: translateX(20px);
}

.list-leave-active {
  position: absolute;
}

@media (max-width: $tablet-width) {
  .cards {
    flex-direction: row;
    overflow-x: scroll;
  }
}
</style>
