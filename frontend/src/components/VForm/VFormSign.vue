<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'
import type { TFormValues } from '@/types/TFormValues'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { object, ref, string } from 'yup'
import VButton from '../VButton.vue'

interface IProps {
  signUp: boolean
}

const props = defineProps<IProps>()

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
    console.log('object')
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
        .oneOf([ref('password')], 'Пароли должны совпадать'),
    })
  }
})

const submitHandler = async (values: TFormValues) => {
  if (props.signUp) {
    const newUser = {
      user: {
        username: values.userName,
        password: values.password,
        email: values.email,
        password_confirmation: values?.passwordConfirm,
      },
    }

    await user.register(newUser)
    return
  } else {
    const loginUser = {
      user: {
        email: values.email,
        password: values.password,
      },
    }
    await user.login(loginUser)
  }
}
</script>
<template>
  <div class="form-wrapper">
    <Form
      :validation-schema="formScheme"
      @submit="submitHandler"
      class="form"
      v-slot="{ meta, errors }"
    >
      <h2 class="form__title">{{ signUp ? 'Регистрация' : 'Вход' }}</h2>
      <div class="form__fields">
        <template v-if="signUp">
          <fieldset class="form__field">
            <Field name="userName" type="text" class="form__input" placeholder="Имя" />
          </fieldset>
        </template>
        <fieldset class="form__field">
          <Field name="email" type="email" class="form__input" placeholder="Эл. почта" />
        </fieldset>
        <fieldset class="form__field">
          <Field name="password" type="password" class="form__input" placeholder="Пароль" />
        </fieldset>
        <fieldset v-if="signUp" class="form__field">
          <Field
            name="passwordConfirm"
            type="password"
            class="form__input"
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
      <div v-if="!meta.valid" class="form__validation-errors">
        <ErrorMessage as="p" class="form__error" name="email" />
        <ErrorMessage as="p" class="form__error" name="password" />
        <ErrorMessage as="p" v-if="signUp" class="form__error" name="userName" />
        <ErrorMessage as="p" v-if="signUp" class="form__error" name="passwordConfirm" />
      </div>
      <footer class="form__footer footer">
        <p class="footer__text">{{ signUp ? 'Уже есть аккаунт' : 'Еще нет аккаунта?' }}</p>
        <p class="footer__text">
          <RouterLink class="footer__link" :to="signUp ? '/sign-in' : '/sign-up'">{{
            signUp ? 'Войдите здесь' : 'Регистрируйтесь здесь'
          }}</RouterLink>
        </p>
      </footer>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 60px;
  background-color: $bg-white-color;

  &-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $bg-gray-color;
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
    color: $gray-text-color;
    font-size: 1.75rem;
    line-height: 150%;
    border: 0.7px solid rgba($gray-text-color, 0.4);
    border-radius: 8px;
  }
  &__button {
    border-radius: 4px;
    color: $bg-white-color;
    font-size: 1.75rem;
    font-weight: 500;
    text-align: center;
    &:disabled {
      background: $gray-text-color;
      cursor: auto;
    }
  }
  &__validation-errors {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__error {
    color: $red-text-color;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 150%;
  }
}

.footer {
  &__text {
    color: rgba($gray-text-color, 0.4);
    font-size: 1.75rem;
    line-height: 150%;
    text-align: center;
  }
  &__link {
    text-decoration: underline;
  }
}
</style>
