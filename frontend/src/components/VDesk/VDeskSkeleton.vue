<script setup lang="ts">
import VSkeletonItem from '../VSkeletonItem/VSkeletonItem.vue'
</script>
<template>
  <!--  -->
  <article v-for="item in [1, 2, 3, 4]" :key="item" class="desk">
    <header class="desk__header header">
      <div class="link">
        <VSkeletonItem :style="{ animationDelay: `${item * 200}ms` }" class="link__circle circle" />
        <VSkeletonItem :style="{ animationDelay: `${item * 200}ms` }" class="link__title" />
      </div>
      <ul class="desk__stats stats">
        <li class="stats__item">
          <VSkeletonItem :style="{ animationDelay: `${item * 200}ms` }" class="stats__button" />
        </li>
        <li class="stats__item">
          <VSkeletonItem :style="{ animationDelay: `${item * 200}ms` }" class="stats__button" />
        </li>
      </ul>
    </header>
    <div class="desk__content">
      <ul class="desk__list list">
        <li class="list__item">
          <VSkeletonItem
            :style="{ animationDelay: `${item * 200}ms` }"
            class="circle list__circle"
          />
          <VSkeletonItem :style="{ animationDelay: `${item * 200}ms` }" class="list__text" />
        </li>
        <li class="list__item">
          <VSkeletonItem
            :style="{ animationDelay: `${item * 200}ms` }"
            class="circle list__circle"
          />
          <VSkeletonItem
            :style="{ animationDelay: `${item * 200}ms` }"
            class="list__text list__text--lg"
          />
        </li>
        <li class="list__item">
          <VSkeletonItem
            :style="{ animationDelay: `${item * 200}ms` }"
            class="circle list__circle"
          />
          <VSkeletonItem :style="{ animationDelay: `${item * 200}ms` }" class="list__text" />
        </li>
        <li class="list__item">
          <VSkeletonItem class="circle list__circle" />
          <VSkeletonItem class="list__text list__text--sm" />
        </li>
      </ul>
      <div class="desk__controls controls"></div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.desk {
  flex-basis: 360px;
  min-height: 110px;
  background-color: $white-color;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
  }
  &__title {
    @include font-h1();
    color: $blue-color;
    text-transform: capitalize;
  }

  &__content {
    overflow: hidden;
  }
}

.link {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 5px;

  &__title {
    width: 150px;
    height: 20px;
    border-radius: 5px;
  }
}

.circle {
  border-radius: 100%;
  width: 14px;
  height: 14px;
}

.stats {
  display: flex;
  gap: 12px;

  &__button {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin-bottom: 5px;
  }
}
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__item {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__text {
    width: 150px;
    height: 20px;
    &--sm {
      width: 100px;
    }
    &--lg {
      width: 200px;
    }
  }
}

.controls {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 12px;
}
</style>
