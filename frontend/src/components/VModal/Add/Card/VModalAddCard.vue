<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VCalendar from '@/components/VCalendar/VCalendar.vue'
import VCategory from '@/components/VCategory.vue'
import VField from '@/components/VField/VField.vue'
import VModal from '@/components/VModal/VModal.vue'
import { validationSchemeCard, type IFormCard } from '@/schemes/CardScheme'
import { useCardStore } from '@/store/useCardsStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useStatusStore } from '@/store/useStatusStore'
import type { TKanbanCard } from '@/types/TKanban'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface IProps {
  isVisible: boolean
}

defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()
const route = useRoute()

const cards = useCardStore()
const categories = useCategoryStore()
const statusStore = useStatusStore()

const date = new Date()

const { handleSubmit, errors, meta } = useForm<IFormCard>({
  validationSchema: validationSchemeCard,
})

const submitHandler = handleSubmit(async (values: IFormCard) => {
  const newCard: Omit<TKanbanCard, 'id'> = {
    status_id: statusStore.status[0].id,
    category_id: values.category_id,
    name: values.name,
    period: values.selectedDate.toDateString(),
    body: values.body,
  }

  await cards.addCard(+route.params.id, newCard)

  emit('closeModal')
})

onMounted(async () => {
  date.setDate(date.getDate() + 1)
  await categories.fetchCategories(+route.params.id)
})
</script>

<template>
  <VModal :isVisible="isVisible" @closeModal="emit('closeModal')">
    <form @submit="submitHandler">
      <h2 class="modal__title">Создание задачи</h2>
      <div class="modal__fields fields">
        <div class="fields__wrapper">
          <fieldset class="fields__item field">
            <legend class="field__title title">Название задачи</legend>
            <VField
              name="name"
              placeholder="Введите название задачи..."
              class="field__input"
              type="text"
              :is-error="!!errors.name"
            />
            <Transition name="slide-fade" class="field__error">
              <ErrorMessage v-if="meta.touched" as="p" name="name">{{ errors.name }}</ErrorMessage>
            </Transition>
          </fieldset>
          <fieldset class="fields__item field">
            <legend class="field__title title">Описание задачи</legend>
            <Field name="body" class="field__textarea" as="textarea" />
          </fieldset>
          <fieldset class="fields__item field field--category">
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
            <Transition name="slide-fade" class="field__error field__error--categories">
              <ErrorMessage v-if="meta.touched" as="p" name="category_id">{{
                errors.category_id
              }}</ErrorMessage>
            </Transition>
          </fieldset>
        </div>
        <div class="fields__wrapper">
          <VCalendar />
          <Transition name="slide-fade" class="field__error field__error--categories"
            ><ErrorMessage v-if="meta.touched" as="p" name="selectedDate" class="error-date">
              {{ errors.selectedDate }}
            </ErrorMessage></Transition
          >
        </div>
      </div>
      <div class="modal__button-wrapper">
        <VButton type="submit" class="modal__button" variant="contained">Создать задачу</VButton>
      </div>
    </form>
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
  gap: 20px;
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
  max-width: 376px;
  overflow-x: scroll;
  &__item {
    max-width: 100%;
    padding: 10px 20px;
  }
}
.field {
  max-height: fit-content;
  &__input {
    margin-top: 20px;

    width: 100%;
    padding: 14px;
  }
  &__textarea {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
    margin-top: 14px;

    height: 200px;
    width: 370px;

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
    margin-top: 8px;
    &--categories {
      margin-top: 20px;
    }
  }
}
.error-date {
  margin-top: 0;
  max-width: 192px;
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
