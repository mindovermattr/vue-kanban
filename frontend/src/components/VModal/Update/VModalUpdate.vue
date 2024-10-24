<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VCalendar from '@/components/VCalendar/VCalendar.vue'
import VCategory from '@/components/VCategory.vue'
import { useCardStore } from '@/store/useCardsStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useStatusStore } from '@/store/useStatusStore'
import { Form } from 'vee-validate'
import { computed, ref } from 'vue'
import VModal from '../VModal.vue'

interface IProps {
  isVisible: boolean
  cardId: number
}

const categories = useCategoryStore()
const statusStore = useStatusStore()
const cards = useCardStore()
const props = defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()

const isRedacting = ref(false)
const isSelected = ref('Done')
const currentCard = computed(() => cards.cards.find((el) => el.id === props.cardId))

const redactingHandler = () => {
  isRedacting.value = !isRedacting.value
}
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
        <TransitionGroup name="list" tag="fieldset" class="status__wrapper">
          <VButton
            type="button"
            v-if="!isRedacting"
            class="status__button status__button--selected"
            variant="contained"
          >
            Без статуса
          </VButton>
          <template v-else>
            <VButton
              v-for="status in statusStore.status"
              type="button"
              :key="status"
              class="status__button"
              :class="{
                'status__button--selected': isSelected === status,
              }"
              variant="contained"
              >{{ status }}
            </VButton>
          </template>
        </TransitionGroup>
      </div>
      <div class="update-modal__input input">
        <fieldset class="input__body">
          <legend class="input__title">Описание задачи</legend>
          <textarea class="input__text" placeholder="Введите" name="body"></textarea>
        </fieldset>
        <fieldset class="input__body">
          <VCalendar />
        </fieldset>
      </div>
      <div class="update-modal__controls controls">
        <div class="controls__wrapper">
          <VButton v-if="isRedacting" variant="contained" type="button">Сохранить</VButton>
          <VButton
            @click="redactingHandler"
            class="controls__button"
            type="button"
            variant="outlined"
          >
            {{ isRedacting ? 'Отменить' : 'Редактировать задачу' }}</VButton
          >
          <VButton class="controls__button" type="button" variant="outlined">
            Удалить задачу</VButton
          >
        </div>
        <VButton @click="emit('closeModal')" type="button" variant="contained">Закрыть</VButton>
      </div>
    </Form>
  </VModal>
</template>

<style lang="scss" scoped>
.update-modal {
  &__header {
    display: flex;
    justify-content: space-between;

    align-items: center;
  }
  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 23px;
  }
}
.status {
  margin-top: 20px;
  margin-bottom: 20px;
  &__name {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 12px;
  }
  &__button {
    background-color: $gray-color-100;
    border-radius: 24px;
    font-size: 1.75rem;
    opacity: 0.4;
    &--selected {
      opacity: 1;
    }
  }
  &__wrapper {
    display: flex;
    gap: 8px;
  }
}

.input {
  display: flex;
  gap: 21px;
  margin-bottom: 20px;
  &__text {
    @include font-h6();
    width: 370px;
    height: 100%;
    background-color: $gray-color-40;
    resize: none;
    color: $gray-color-100;
    padding: 14px;
    border-radius: 8px;
  }
  &__title {
    @include font-h5();
    margin-bottom: 20px;
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  &__wrapper {
    display: flex;
    gap: 8px;
  }
  &__button {
    @include font-h4();
    line-height: 14px;
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
