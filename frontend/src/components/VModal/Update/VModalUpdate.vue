<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VCategory from '@/components/VCategory.vue'
import { useCardStore } from '@/store/useCardsStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { EStatus } from '@/types/EStatus'
import type { TCardResponse } from '@/types/responses/TCardResponse'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import VModal from '../VModal.vue'

interface IProps {
  isVisible: boolean
  cardId: number
}

const categories = useCategoryStore()
const cards = useCardStore()
const props = defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()

const isRedacting = ref(false)
const currentCard = ref<TCardResponse | undefined>(
  cards.cards.find((el) => el.category_id === props.cardId)
)
</script>

<template>
  <VModal :isVisible="isVisible" @closeModal="emit('closeModal')">
    <Form class="modal__update update-modal">
      <div class="update-modal__header">
        <h3 class="update-modal__title">Название задачи</h3>
        <VCategory v-bind="currentCard!.category" />
      </div>
      <div class="update-modal__status status">
        <h4 class="status__name">Статус</h4>
        <TransitionGroup name="list" tag="fieldset" class="">
          <VButton v-if="!isRedacting" class="status__button" variant="contained"
            >Без статуса</VButton
          >
          <template v-if="isRedacting">
            <VButton
              v-for="status in EStatus"
              v-bind:key="status"
              class="status__button"
              variant="contained"
              >{{ status }}</VButton
            >
          </template>
        </TransitionGroup>
      </div>
      <VButton type="button" variant="contained">asd</VButton>
    </Form>
  </VModal>
</template>

<style lang="scss" scoped>
.update-modal {
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 23px;
  }
}
.status {
  margin-top: 18px;
  &__name {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
  }
  &__button {
    background-color: $gray-text-color-selected;
    border-radius: 24px;
    font-size: 1.75rem;
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
