<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'
import type { TUserLogin, TUserRegistration } from '@/types/requests/TUserLogin'
import type { TFormValues } from '@/types/TFormValues'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string, ref as yupRef } from 'yup'
import VButton from '../VButton.vue'
import VField from '../VField/VField.vue'

interface IProps {
  signUp: boolean
}

const props = defineProps<IProps>()
const serverError = ref<string>('')
const emit = defineEmits<(e: 'toogleSignUp') => void>()
const router = useRouter()

const user = useUserStore()

const formScheme = computed(() => {
  if (!props.signUp) {
    return object<TFormValues>({
      email: string()
        .required('Поле email обязательно к заполнению')
        .email('В поле email некорректная почта'),
      password: string()
        .required('Поле пароль обязательно к заполнению')
        .min(6, 'Минимум 6 символов у пароля'),
    })
  } else {
    return object<TFormValues>({
      userName: string().required('Поле имя обязательно к заполнению'),
      email: string()
        .required('Поле email пароль к заполнению')
        .email('В поле email некорректная почта'),
      password: string()
        .required('Поле пароль обязательно к заполнению')
        .min(6, 'Минимум 6 символов у пароля'),
      passwordConfirm: string()
        .required('Поле подтверждение пароля должно быть заполнено')
        .oneOf([yupRef('password')], 'Пароли должны совпадать'),
    })
  }
})

const { handleSubmit, errors, meta } = useForm<TFormValues>({
  validationSchema: formScheme,
})

const onSubmit = handleSubmit(async (values) => {
  if (props.signUp && values?.passwordConfirm) {
    const newUser: TUserRegistration = {
      user: {
        username: values.userName,
        password: values.password,
        email: values.email,
        password_confirmation: values.passwordConfirm,
      },
    }

    const response = await user.register(newUser)
    if (axios.isAxiosError(response)) {
      serverError.value = (response as AxiosError<{ error: string }>).response!.data!.error
      return
    }
    return
  } else {
    const loginUser: TUserLogin = {
      user: {
        email: values.email,
        password: values.password,
      },
    }
    const response = await user.login(loginUser)
    if (axios.isAxiosError(response)) {
      serverError.value = response.response!.data! as string
      return
    }
  }
  router.replace({ name: 'home' })
})
</script>
<template>
  <div class="form-wrapper">
    <form @submit="onSubmit" class="form">
      <h2 class="form__title">{{ signUp ? 'Регистрация' : 'Вход' }}</h2>
      <div class="form__fields">
        <template v-if="signUp">
          <fieldset class="form__field">
            <VField name="userName" type="text" :isError="!!errors.userName" placeholder="Имя" />
          </fieldset>
        </template>
        <fieldset class="form__field">
          <VField name="email" type="email" :isError="!!errors.email" placeholder="Эл. почта" />
        </fieldset>
        <fieldset class="form__field">
          <VField
            name="password"
            type="password"
            :isError="!!errors.password"
            placeholder="Пароль"
          />
        </fieldset>
        <fieldset v-if="signUp" class="form__field">
          <VField
            name="passwordConfirm"
            type="password"
            :isError="!!errors.passwordConfirm"
            placeholder="Подтверждение пароля"
          />
        </fieldset>
      </div>
      <VButton
        type="submit"
        :disabled="Object.keys(errors).length !== 0 && !meta.valid"
        class="form__button"
        variant="contained"
      >
        {{ signUp ? 'Зарегистироваться' : 'Войти' }}
      </VButton>
      <div class="form__validation-errors">
        <ErrorMessage as="p" class="form__error" name="email" />
        <ErrorMessage as="p" class="form__error" name="password" />
        <ErrorMessage as="p" v-if="signUp" class="form__error" name="userName" />
        <ErrorMessage as="p" v-if="signUp" class="form__error" name="passwordConfirm" />
        <p v-if="serverError" class="form__error">{{ serverError }}</p>
      </div>
      <footer class="form__footer footer">
        <p class="footer__text">{{ signUp ? 'Уже есть аккаунт' : 'Еще нет аккаунта?' }}</p>
        <p class="footer__text">
          <VButton
            variant="text"
            type="button"
            @click="
              () => {
                emit('toogleSignUp')
                serverError = ''
              }
            "
            class="footer__link"
          >
            {{ signUp ? 'Войдите здесь' : 'Регистрируйтесь здесь' }}
          </VButton>
        </p>
      </footer>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 60px;
  background-color: $white-color;

  &-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $gray-color-40;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 150%;
    text-align: center;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 370px;
  }

  &__input {
    padding: 5px 0px 5px 10px;
    width: 100%;
    color: $gray-color-100;
    font-size: 1.75rem;
    line-height: 150%;
    border: 0.7px solid $gray-color-40;
    border-radius: 8px;

    &--error {
      border-color: $error-color;
    }
  }
  &__button {
    border-radius: 4px;
    color: $white-color;
    font-size: 1.75rem;
    font-weight: 500;
    text-align: center;
    &:disabled {
      background: $gray-color-100;
      cursor: auto;
    }
  }
  &__validation-errors {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__error {
    color: $error-color;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 150%;
  }
}

.footer {
  &__text {
    color: $gray-color-40;
    font-size: 1.75rem;
    line-height: 150%;
    text-align: center;
  }
  &__link {
    text-decoration: underline;
  }
}
</style>
