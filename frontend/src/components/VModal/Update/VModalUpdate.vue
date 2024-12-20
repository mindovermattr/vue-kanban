<script setup lang="ts">
import { ERoles } from '@/@types/ERoles'
import type { TCardResponse } from '@/@types/responses/TCardResponse'
import VButton from '@/components/VButton.vue'
import VCalendar from '@/components/VCalendar/VCalendar.vue'
import VCategory from '@/components/VCategory.vue'
import { validationSchemeCardUpdate, type IFormCardUpdate } from '@/schemes/CardScheme'
import { useCardStore } from '@/store/useCardsStore'
import { useDeskStore } from '@/store/useDeskStore'
import { useStatusStore } from '@/store/useStatusStore'
import { useField, useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import VModal from '../VModal.vue'

interface IProps {
  card: TCardResponse
  isVisible: boolean
}
const props = defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()

const statusStore = useStatusStore()
const cardsStore = useCardStore()
const deskStore = useDeskStore()
const route = useRoute()

const initialStatus = computed(() =>
  statusStore.status.find((el) => el.id === props.card.status_id)
)

const selectedStatus = ref(initialStatus.value!.id)
const isRedacting = ref(false)

const { handleSubmit, errors, setFieldValue } = useForm<IFormCardUpdate>({
  validationSchema: validationSchemeCardUpdate,
  initialValues: {
    ...props.card,
  },
})
const { value, setValue } = useField('body', (value) => !!value, {
  initialValue: props.card.body,
})

const { value: selectedUser } = useField('user_id', (value) => !!value, {
  initialValue: props.card.user_id,
})

watch([props.card], () => {
  setValue(props.card.body)
})

const redactingHandler = () => {
  isRedacting.value = !isRedacting.value
}

const changeStatus = (statusId: number) => {
  selectedStatus.value = statusId
  setFieldValue('status_id', statusId)
}

const onSubmit = handleSubmit(async (values) => {
  let newCard: TCardResponse = {
    body: values.body,
    name: values.name,
    period: values.selectedDate.toDateString(),
    status_id: values.status_id,
    id: values.id,
    category: values.category,
    user_id: selectedUser.value === 0 ? null : selectedUser.value,
  }

  console.log(selectedUser.value)
  const resp = await cardsStore.updateCard(+route.params.id, newCard)
  if (resp) cardsStore.updateCardFromSocket(resp.data)
  emit('closeModal')
})

const deleteHandler = async () => {
  await cardsStore.deleteCard(+route.params.id, props.card.id, props.card.status_id)
}
</script>

<template>
  <VModal :isVisible="isVisible" @closeModal="emit('closeModal')">
    <form @submit="onSubmit" class="modal__update update-modal">
      <div class="update-modal__header">
        <h3 class="update-modal__title">{{ props?.card.name }}</h3>
        <VCategory v-bind="props!.card.category" />
      </div>
      <div class="update-modal__status status">
        <div class="status__wrapper">
          <h4 class="status__name">Статус</h4>
          <TransitionGroup name="list" tag="fieldset" class="status__list">
            <VButton
              type="button"
              v-if="!isRedacting"
              class="status__button status__button--selected"
              variant="default"
            >
              {{ initialStatus!.name }}
            </VButton>
            <template v-else>
              <VButton
                v-for="status in statusStore.status"
                type="button"
                :key="status.name"
                class="status__button"
                :class="{
                  'status__button--selected': selectedStatus === status.id,
                }"
                @click="changeStatus(status.id)"
                variant="default"
              >
                {{ status.name }}
              </VButton>
            </template>
          </TransitionGroup>
        </div>
        <div class="status__user">
          <h4 class="status__name">Назначен на выполнение:</h4>
          <fieldset>
            <select class="status__select" :disabled="!isRedacting" v-model="selectedUser">
              <option class="status__option" disabled>Администраторы</option>
              <option
                class="status__option"
                :value="user.user_id"
                v-for="user in deskStore.getFiltredUsers.value[ERoles.OWNER]"
                :selected="user.user_id === props.card.user_id"
                v-bind:key="user.user_id"
              >
                {{ user.username }}
              </option>
              <option class="status__option" disabled>Участники</option>
              <option
                class="status__option"
                :value="user.user_id"
                v-for="user in deskStore.getFiltredUsers.value[ERoles.MEMBER]"
                :selected="user.user_id === props.card.user_id"
                v-bind:key="user.user_id"
              >
                {{ user.username }}
              </option>
              <!-- <option disabled>Никто</option>
              <option :selected="props.card.user_id === null" value="null">Никто</option> -->
            </select>
          </fieldset>
        </div>
      </div>
      <div class="update-modal__input input">
        <fieldset class="input__body">
          <legend class="input__title">Описание задачи</legend>
          <textarea
            :disabled="!isRedacting"
            class="input__text"
            :class="{
              'input__text--redacting': isRedacting,
            }"
            name="body"
            v-model="value"
          >
          </textarea>
        </fieldset>
        <fieldset class="input__body">
          <VCalendar
            :class="{
              input__error: errors.selectedDate,
            }"
            :initialDate="props.card.period"
          />
        </fieldset>
      </div>
      <div class="update-modal__controls controls">
        <div class="controls__wrapper">
          <VButton v-if="isRedacting" variant="contained" type="submit">Сохранить</VButton>
          <VButton
            @click="redactingHandler"
            class="controls__button"
            type="button"
            variant="outlined"
          >
            {{ isRedacting ? 'Отменить' : 'Редактировать задачу' }}
          </VButton>
          <VButton @click="deleteHandler" class="controls__button" type="button" variant="outlined">
            Удалить задачу
          </VButton>
        </div>
        <VButton @click="emit('closeModal')" type="button" variant="contained">Закрыть</VButton>
      </div>
    </form>
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  &__name {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
  }
  &__button {
    background-color: $gray-color-100;
    border-radius: 24px;
    font-size: 1.75rem;
    opacity: 0.4;
    padding: 10px 14px;
    color: $white-color;
    &--selected {
      opacity: 1;
    }
  }
  &__user {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__list {
    display: flex;
    gap: 8px;
  }
  &__select {
    padding: 10px 5px;
    @include font-h3();
    color: $white-color;
    border-radius: 5px;
    background-color: $blue-color;
  }
  &__option {
    @include font-h4();
    background-color: $blue-color;
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
    &--redacting {
      border: 1px solid $black-color;
      color: $black-color;
      background-color: $white-color;
    }
  }
  &__title {
    @include font-h5();
    margin-bottom: 20px;
  }
  &__error {
    border: 1px solid $error-color;
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

@media (max-width: $tablet-width) {
  .update-modal {
    &__input {
      flex-direction: column;
    }
  }
  .input {
    &__text {
      width: 100%;
    }
  }
  .status {
    &__wrapper {
      max-width: 100%;
      flex-wrap: wrap;
    }
    &__list {
      flex-wrap: wrap;
    }
  }
  .controls {
    flex-direction: column;
    gap: 8px;
    &__wrapper {
      flex-direction: column;
    }
  }
}
</style>
