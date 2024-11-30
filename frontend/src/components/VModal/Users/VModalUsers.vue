<script setup lang="ts">
import { useRouteParams } from '@/@composables/useRouteParams'
import { ERoles } from '@/@types/ERoles'
import type { TUserKanban } from '@/@types/TUserKanban'
import VButton from '@/components/VButton.vue'
import VModal from '@/components/VModal/VModal.vue'
import { type IFormCard } from '@/schemes/CardScheme'
import { useDeskStore } from '@/store/useDeskStore'
import { useForm } from 'vee-validate'

interface IProps {
  isVisible: boolean
}

defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()

const deskStore = useDeskStore()
const { id: deskId } = useRouteParams('id')

const { handleSubmit, errors, meta } = useForm<IFormCard>({})

const submitHandler = handleSubmit(async (values: IFormCard) => {
  emit('closeModal')
})

const changeHandler = (user: TUserKanban, event: Event) => {
  deskStore.updateUserRole(+deskId, user, (event.target as HTMLSelectElement).value as ERoles)
}
</script>

<template>
  <VModal :isVisible="isVisible" @closeModal="emit('closeModal')">
    <form class="modal" @submit="submitHandler">
      <div class="users">
        <div>
          <h3 class="users__title">Администраторы:</h3>
          <ol class="modal__list list">
            <li
              class="list__item"
              v-for="user in deskStore.getFiltredUsers['owner']"
              v-bind:key="user.user_id"
            >
              <p>{{ user.username }}</p>
              <select @change="changeHandler(user, $event)" name="owners" id="">
                <option
                  v-for="role in Object.values(ERoles)"
                  v-bind:key="role"
                  :selected="user.role === role"
                >
                  {{ role }}
                </option>
              </select>
            </li>
          </ol>
        </div>
        <div>
          <h3 class="users__title">Участники:</h3>
          <ol class="modal__list list">
            <li
              class="list__item"
              v-for="user in deskStore.getFiltredUsers['member']"
              v-bind:key="user.user_id"
            >
              <p>{{ user.username }}</p>
              <select @change="changeHandler(user, $event)" name="members" id="">
                <option
                  v-for="role in Object.values(ERoles)"
                  v-bind:key="role"
                  :selected="user.role === role"
                >
                  {{ role }}
                </option>
              </select>
            </li>
          </ol>
        </div>
        <div>
          <h3 class="users__title">Гости:</h3>
          <ol class="modal__list list">
            <li
              class="list__item"
              v-for="user in deskStore.getFiltredUsers['guest']"
              v-bind:key="user.user_id"
            >
              <p>{{ user.username }}</p>
              <select @change="changeHandler(user, $event)" name="guests" id="">
                <option
                  v-for="role in Object.values(ERoles)"
                  v-bind:key="role"
                  :selected="user.role === role"
                >
                  {{ role }}
                </option>
              </select>
            </li>
          </ol>
        </div>
      </div>
      <VButton @click="emit('closeModal')" variant="contained" class="modal__button"
        >Сохранить</VButton
      >
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
    margin-top: 18px;
    width: 100%;
  }
}
.users {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__title {
    @include font-h1();
    color: $blue-color;
  }
}

.list {
  &__item {
    display: flex;
    justify-content: space-between;
    gap: 48px;
    @include font-h3();
  }
}
</style>
