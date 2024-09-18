<template>
  <div class="form-wrapper">
    <form class="form">
      <h2 class="form__title">Вход</h2>
      <div class="form__fields">
        <fieldset class="form__field">
          <input type="email" class="form__input" placeholder="Эл. почта" />
        </fieldset>
        <fieldset class="form__field">
          <input type="text" class="form__input" placeholder="Пароль" />
        </fieldset>
      </div>
      <VButton
        @onsubmit.prevent="() => console.log('asd')"
        type="button"
        class="form__button"
        variant="contained"
        >Войти</VButton
      >
      <footer class="form__footer footer">
        <p class="footer__text">Еще нет аккаунта?</p>
        <p class="footer__text">
          <RouterLink class="footer__link" to="/">Зарегистрироваться</RouterLink>
        </p>
      </footer>
    </form>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import VButton from '../VButton.vue'
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
