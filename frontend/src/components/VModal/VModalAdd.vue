<script setup lang="ts">
import { useCardStore } from '@/store/useCardsStore'
import { EKanbanCategory } from '@/types/EKanbanCategory'
import type { TKanbanCard } from '@/types/TKanban'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { object, string, date as yupDate } from 'yup'
import VButton from '../VButton.vue'
import VCalendar from '../VCalendar/VCalendar.vue'
import VCategory from '../VCategory.vue'

interface IProps {
  isVisible: boolean
}
const props = defineProps<IProps>()

const cards = useCardStore()

const date = ref<Date | null>(null)
const selectedCategory = ref<EKanbanCategory>(EKanbanCategory.Web)

const emit = defineEmits<(e: 'closeModal') => void>()

const setDate = (selectedDate: Date) => {
  date.value = selectedDate
}

const setCategory = (category: EKanbanCategory) => {
  selectedCategory.value = category
}

const addCardHandler = async (card: TKanbanCard) => {
  // await cards.addCard(card)
  // emit('closeModal')
}

const validationScheme = object({
  name: string().required().min(4),
  body: string(),
  category: string().required(),
  selectedDate: yupDate().min(new Date()).required(),
})

const submitHandler = async (values) => {
  const newCard = {
    status: 'noStatus',
    category: 'Research',
    name: values.name,
    period: values.selectedDate,
    body: values.body,
  }
  await cards.addCard(newCard)
  console.log('Карточка:', newCard)
}
</script>

<template>
  <div v-if="isVisible" class="modal-wrapper" @click="emit('closeModal')">
    <Form
      :validation-schema="validationScheme"
      @click.stop=""
      @submit="submitHandler"
      class="modal"
      v-slot="{ errors }"
    >
      {{ errors }}
      <h2 class="modal__title">Создание задачи</h2>
      <div class="modal__fields fields">
        <div class="fields__wrapper">
          <fieldset class="fields__item field">
            <legend class="field__title title">Название задачи</legend>
            <Field
              name="name"
              placeholder="Введите название задачи..."
              class="field__input"
              type="text"
            />
          </fieldset>
          <fieldset class="fields__item field">
            <legend class="field__title title">Описание задачи</legend>
            <Field name="body" class="field__textarea" as="textarea" />
          </fieldset>
          <fieldset class="fields__item field">
            <legend class="field__title title">Категория</legend>
            <div class="field__categories categories">
              <button
                class="categories__button"
                type="button"
                v-for="category in EKanbanCategory"
                :key="category"
                :name="category"
              >
                <VCategory
                  :name="'category'"
                  class="categories__item"
                  :category="category"
                  @setCategory="setCategory"
                />
              </button>
              <ErrorMessage name="category" />
            </div>
          </fieldset>
        </div>

        <VCalendar @set-date="setDate" />
      </div>
      <div class="modal__button-wrapper">
        <VButton type="submit" @click="addCardHandler" class="modal__button" variant="contained"
          >Создать задачу</VButton
        >
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 40px 30px;
  background-color: $bg-white-color;
  transform: translate(-50%, -50%);
  width: 630px;

  &-wrapper {
    position: absolute;
    width: calc((#{100vw}) - 18px);
    height: 100vh;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 23px;
  }
  &__button {
    &-wrapper {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.title {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 16px;
}
.fields {
  display: flex;
  gap: 21px;
  justify-content: space-between;
  &__wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__date {
    margin-top: 20px;
  }
}

.categories {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  &__item {
    padding: 10px 20px;
  }
}
.field {
  &__input {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
    margin-top: 20px;

    width: 100%;
    padding: 14px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
  }
  &__textarea {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
    margin-top: 14px;

    height: 200px;
    width: 376px;

    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    padding: 10px;

    resize: none;
    &:focus {
      outline: none;
    }
  }
}
</style>

<style lang="scss"></style>
