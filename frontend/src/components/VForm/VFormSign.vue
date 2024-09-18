<template>
  <div class="form-wrapper">
    <Form :validation-schema="formScheme" @submit="submitHandler" class="form">
      <h2 class="form__title">Вход</h2>
      <div class="form__fields">
        <fieldset v-if="signUp" class="form__field">
          <Field name="userName" type="text" class="form__input" placeholder="Имя" />
        </fieldset>
        <fieldset class="form__field">
          <Field name="email" type="email" class="form__input" placeholder="Эл. почта" />
        </fieldset>
        <fieldset class="form__field">
          <Field name="password" type="password" class="form__input" placeholder="Пароль" />
        </fieldset>
      </div>
      <VButton class="form__button" variant="contained">Войти</VButton>
      <div class="form__validation-errors">
        <ErrorMessage as="p" class="form__error" name="email" />
        <ErrorMessage as="p" class="form__error" name="password" />
        <ErrorMessage as="p" v-if="signUp" class="form__error" name="userName" />
      </div>
      <footer class="form__footer footer">
        <p class="footer__text">{{ signUp ? 'Уже есть аккаунт' : 'Еще нет аккаунта?' }}</p>
        <p class="footer__text">
          <RouterLink class="footer__link" :to="signUp ? '/signIn' : '/signUp'">{{
            signUp ? 'Войдите здесь' : 'Регистрируйтесь здесь'
          }}</RouterLink>
        </p>
      </footer>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import { RouterLink } from 'vue-router'
import * as yup from 'yup'
import VButton from '../VButton.vue'

interface IProps {
  signUp: boolean
}

const props = defineProps<IProps>()

const formScheme = yup.object({
  userName: yup.string().required().min(4),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})

const submitHandler = (values) => {
  console.log(values)
}

const validateEmail = (value: string) => {}
</script>

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
  }

  &__input {
    padding: 5px 180px 5px 10px;
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
