<script setup lang="ts">
import { useDND } from '@/@composables/useDND'
import { useMobile } from '@/@composables/useMobile'
import { useRouteParams } from '@/@composables/useRouteParams'
import { ERoles } from '@/@types/ERoles'
import { EDeskIcons } from '@/@types/icons/EDeskIcons'
import type { TCardResponse } from '@/@types/responses/TCardResponse'
import { createDeskLink } from '@/api/Desks.api'
import VKanbanColumn from '@/components/VKanban/VKanbanColumn.vue'
import { createTaskConnection } from '@/socket/tasks/tasks.cable'
import { useCardStore } from '@/store/useCardsStore'
import { useDeskStore } from '@/store/useDeskStore'
import { useFlashStore } from '@/store/useFlashStore'
import { useStatusStore } from '@/store/useStatusStore'
import { onMounted, provide } from 'vue'
import VDeskIcons from '../Icons/VDeskIcons.vue'
import VButton from '../VButton.vue'

const cardStore = useCardStore()
const statusStore = useStatusStore()
const flashStore = useFlashStore()
const deskStore = useDeskStore()
const emit = defineEmits<{ (e: 'openStatusModal'): void; (e: 'openUsersModal'): void }>()

const routeParams = useRouteParams('id')

const { isDragging, onDragEnd, onDropDragEvent, onStartDragEvent } = useDND(+routeParams.id)

onMounted(async () => {
  await statusStore.fetchStatus(+routeParams.id)
  await cardStore.fetchCards(+routeParams.id)
  await deskStore.fetchUsers(+routeParams.id)
  createTaskConnection(+routeParams.id, (card: TCardResponse) => {
    const newCard = {
      ...card,
    }
    cardStore.updateCardFromSocket(newCard)
  })
})

const createInviteLink = async () => {
  const response = await createDeskLink(+routeParams.id, 3)
  if (response?.data) {
    await navigator.clipboard.writeText(
      `${window.location.hostname}:${window.location.port}${response.data.link}`
    )
    flashStore.openFlash('Ссылка скопирована в буфер обмена!', 1500, 'success')
  }
}

const { isMobile } = useMobile()

provide('isDragging', isDragging)
</script>

<template>
  <div class="container desk">
    <div class="desk__wrapper">
      <h2 class="desk__title">Desk name</h2>
      <div v-if="deskStore.getRole === ERoles.OWNER" class="desk__controls">
        <VButton @click="emit('openStatusModal')" variant="default"
          ><VDeskIcons
            class="desk__icon"
            :size="30"
            stroke="none"
            fill="#000"
            :iconId="EDeskIcons.plus"
        /></VButton>
        <VButton variant="default">
          <VDeskIcons
            class="desk__icon"
            :size="30"
            stroke="#fff"
            fill="#fff"
            :iconId="EDeskIcons.delete"
          />
        </VButton>
        <VButton @click="createInviteLink" variant="default">
          <VDeskIcons class="desk__icon" :size="30" :icon-id="EDeskIcons.link" />
        </VButton>
        <VButton @click="emit('openUsersModal')" variant="default">
          <VDeskIcons stroke="black" class="desk__icon" :size="30" :icon-id="EDeskIcons.users" />
        </VButton>
      </div>
    </div>
    <div
      :style="{
        'grid-template-columns': !isMobile && `repeat(${statusStore.status.length}, 220px)`,
        'grid-template-rows': isMobile && `repeat(${statusStore.status.length}, 220px)`,
      }"
      class="container__kanban"
      v-if="statusStore.status.length"
    >
      <VKanbanColumn
        v-for="(status, idx) in statusStore.status"
        :columnName="status.name"
        :columnId="status.id"
        :key="status.id"
        :items="cardStore.filtredCards[status.name]"
        class="column"
        :style="{ animationDelay: `${idx * 150}ms` }"
        @onDropDragEvent="onDropDragEvent"
        @onDragStart="onStartDragEvent"
        @dragend="onDragEnd"
      />
    </div>
    <div class="container container--message" v-else>Самое время создать первую колонку!</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  &__kanban {
    display: grid;
    gap: 20px;
    overflow-x: scroll;
    padding-bottom: 20px;
  }
  &--message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    @include font-h1();
  }
}
.desk {
  &__title {
    @include font-h1();
    color: $gray-color-100;
    font-size: 4rem;
  }
  &__wrapper {
    padding: 24px 0 8px 0px;
    display: flex;
    align-items: baseline;
    gap: 24px;
    &:hover .desk__controls {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &__controls {
    display: flex;
    align-self: flex-end;
    gap: 8px;
    opacity: 0;
    transform: translateY(25px);
    transition: all 0.5s;
    background-color: $gray-color-40;
    border-radius: 15px;
  }
  &__icon {
    border-radius: 25px;
    padding: 2px 5px;
    transition: all 0.5s;
    &:hover {
      background-color: $white-color;
    }
  }
}

.column {
  animation: 1s 1 forwards fadeX;
  opacity: 0;
}

@keyframes fadeX {
  0% {
    transform: translateX(-35px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@media (max-width: $tablet-width) {
  .container--kanban {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .column {
    overflow-x: scroll;
  }
}
</style>
