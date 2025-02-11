<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
import { useDeskStore } from '@/store/useDeskStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VButton from './VButton.vue'

const authStore = useAuthStore()
const deskStore = useDeskStore()
const router = useRouter()

const isOpen = ref(false)

const toggleProfile = () => {
  isOpen.value = !isOpen.value
}

const closeProfile = () => {
  isOpen.value = false
}

const logoutHandler = () => {
  authStore.logout()
  router.replace({ name: 'SignIn' })
}
</script>

<template>
  <header @click="closeProfile" class="header container">
    <router-link to="/" class="header__title">
      Kam<span class="header__title header__title--blue">Bam</span>
    </router-link>
    <div class="header__controls controls">
      <slot></slot>
      <VButton
        variant="text"
        @click.stop="toggleProfile"
        class="controls__button controls__button--text"
      >
        {{ authStore.user?.username }}
      </VButton>
      <Transition name="profile">
        <div @click.stop v-if="isOpen" class="controls__profile profile">
          <div>
            <p class="profile__name">{{ authStore.user?.username }}</p>
            <p class="profile__email">{{ authStore.user?.email }}</p>
            <p class="profile__role" v-if="deskStore.getRole">
              Ваша роль: <span class="text-blue">{{ deskStore.getRole }}</span>
            </p>
          </div>
          <VButton @click="logoutHandler" class="profile__button" variant="outlined">Выйти</VButton>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 20px 0;
  &__title {
    font-size: 3rem;
    &--blue {
      color: $blue-color;
    }
  }
}
.controls {
  position: relative;
  display: flex;
  gap: 20px;
  &__button {
    @include font-h4();

    &--contained {
      border-radius: 4px;
      background-color: $blue-color;
      color: white;
      padding: 10px 14px;
    }
    &--text {
      color: $blue-color;
      &::after {
        content: '↓';
      }
    }
  }
  &__profile {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 50px;
  }
}

.profile {
  padding: 34px;
  background-color: $white-color;
  display: flex;
  flex-direction: column;
  gap: 20px;

  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 10px;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);

  &__name {
    @include font-h4();
    text-align: center;
  }
  &__email {
    @include font-h3();
    color: $gray-color-100;
    text-align: center;
  }
  &__role {
    @include font-h3();
    color: $gray-color-100;
    text-align: center;
  }
  &__button {
    @include font-h4();
  }
}
.text-blue {
  color: $blue-color;
  font-weight: 700;
}
.profile-enter-active {
  animation: bounce-in 0.2s;
}
.profile-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: $tablet-width) {
  .header {
    overflow: visible;
  }
  .controls {
    &__profile {
      right: 15px;
    }
  }
  .profile__role {
    white-space: nowrap;
  }
}
</style>
