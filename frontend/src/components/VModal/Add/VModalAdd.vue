<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VCalendar from '@/components/VCalendar/VCalendar.vue'
import VCategory from '@/components/VCategory.vue'
import { useCardStore } from '@/store/useCardsStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { EStatus } from '@/types/EStatus'
import type { TKanbanCard } from '@/types/TKanban'
import { Field, Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { number, object, string, date as yupDate } from 'yup'
import VModal from '../VModal.vue'

interface IProps {
  isVisible: boolean
}
defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()

const cards = useCardStore()
const categories = useCategoryStore()

const date = ref<Date | null>(null)

const validationScheme = object({
  name: string().required('Нужно ввести название').min(4, 'Минимум 4 символа'),
  body: string(),
  category_id: number().required('Нужно выбрать одну из категорий'),
  selectedDate: yupDate().min(new Date()).required('Нужно выбрать дату'),
})

const submitHandler = async (values: TKanbanCard & { category_id: number; body: string }) => {
  console.log(values)
  const newCard = {
    status: EStatus.NoStatus,
    category_id: values.category_id,
    name: values.name,
    period: values.selectedDate,
    body: values.body,
  }

  await cards.addCard(newCard)
  emit('closeModal')
}

const setDate = (selectedDate: Date) => {
  date.value = selectedDate
}

onMounted(async () => {
  await categories.fetchCategories()
  console.log(categories.categories)
})
</script>

<template>
  <VModal v-if="isVisible" @closeModal="emit('closeModal')">
    <Form
      :validation-schema="validationScheme"
      @click.stop
      @submit="submitHandler"
      v-slot="{ errors }"
    >
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
            <Transition name="slide-fade" class="field__error"
              ><p v-if="errors.name">{{ errors.name }}</p></Transition
            >
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
                :name="'category_id'"
                v-for="category in categories.categories"
                :key="category.id"
              >
                <VCategory class="categories__item" :is-field="true" v-bind="category" />
              </button>
            </div>
            <Transition name="slide-fade" class="field__error field__error--categories"
              ><p v-if="errors.category_id">{{ errors.category_id }}</p></Transition
            >
          </fieldset>
        </div>
        <div>
          <VCalendar @set-date="setDate" />
          <Transition name="slide-fade" class="field__error field__error--categories"
            ><p v-if="errors.selectedDate">{{ errors.selectedDate }}</p></Transition
          >
        </div>
      </div>
      <div class="modal__button-wrapper">
        <VButton type="submit" class="modal__button" variant="contained">Создать задачу</VButton>
      </div>
    </Form>
  </VModal>
</template>

<style lang="scss" scoped>
.modal {
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
  &__error {
    color: red;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 16px;
    &--categories {
      margin-top: 20px;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
