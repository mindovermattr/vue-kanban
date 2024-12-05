<!-- eslint-disable vue/no-parsing-error -->
<template>
  <fieldset class="datepicker">
    <legend class="datepicker__title">Дата</legend>
    <div class="datepicker__calendar calendar">
      <div class="calendar__header header">
        <p class="header__title">{{ `${monthNameCapitalize} ${selectedDate.currentYear}` }}</p>
        <div class="header__controls">
          <button @click="prevMonthHandler" type="button"><</button>
          <button @click="nextMonthHandler" type="button">></button>
        </div>
      </div>
      <div class="calendar__content content">
        <div class="content__header layout">
          <p class="layout__item layout__item--1">Пн</p>
          <p class="layout__item layout__item--2">Вт</p>
          <p class="layout__item layout__item--3">Ср</p>
          <p class="layout__item layout__item--4">Чт</p>
          <p class="layout__item layout__item--5">Пт</p>
          <p class="layout__item layout__item--6">Сб</p>
          <p class="layout__item layout__item--7">Вс</p>
        </div>
        <TransitionGroup name="list" tag="div" class="content__days layout layout--days">
          <button
            v-for="item in selectedDate.days"
            :key="item.date"
            :class="[
              `layout__item--${item.day}`,
              'layout__item',
              'layout__item--day',
              {
                'layout__item--current-day': item.date === currentDay,
                'layout__item--selected':
                  item.date === selectedDay.date && item.monthName === selectedDay.monthName,
              },
            ]"
            type="button"
            @click="dayClickHandler(item)"
            :data-testid="item.date"
          >
            {{ item.date }}
          </button>
        </TransitionGroup>
      </div>
      <p class="calendar__text">
        Срок исполнения: <span class="calendar__text calendar__text--bold">{{ formatedDate }}</span>
      </p>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { formatDate } from '@/helpers/formatDate'
import { getDate, type TDays } from '@/helpers/getDate'
import { useField } from 'vee-validate'
import { computed, reactive, ref } from 'vue'

interface IProps {
  initialDate?: string
}
const props = defineProps<IProps>()
const emit = defineEmits<(e: 'setDate', date: Date) => void>()

const date = ref(props.initialDate ? new Date(props.initialDate) : new Date())
const formatedDate = ref<string>(formatDate(date))

const selectedDate = computed(() => getDate(date.value.getFullYear(), date.value.getMonth()))
const monthNameCapitalize = computed(() => {
  return (
    selectedDate.value.monthName.slice(0, 1).toUpperCase() +
    selectedDate.value.monthName.slice(1, selectedDate.value.monthName.length)
  )
})

const currentDay = computed(() => date.value.getDate())

const selectedDay = reactive<{
  date: number
  monthName: string
}>({ date: currentDay.value, monthName: selectedDate.value.monthName })

const nextMonthHandler = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1)
}
const prevMonthHandler = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1)
}

const dayClickHandler = (item: TDays) => {
  selectedDay.date = item.date
  selectedDay.monthName = item.monthName
  date.value.setDate(item.date)
  handleChange(date.value)
  formatedDate.value = formatDate(date)
  emit('setDate', date.value)
}

const { handleChange } = useField('selectedDate', undefined, {
  type: 'radio',
  initialValue: date.value,
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  margin-top: 16px;
  &__title {
    color: $gray-color-100;
    @include font-h5();
  }
  &__controls {
    font-size: 2rem;
    display: flex;
    gap: 16px;
    color: $gray-color-100;
  }
}

.content {
  margin-top: 9px;
  &__days {
    margin-top: 12px;
  }
}

.layout {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  &__item {
    color: $gray-color-100;
    @include font-h7();
    text-align: center;
    transition: 0.4s;
    @for $i from 1 through 7 {
      &--#{$i} {
        grid-column: $i;
      }
    }

    &--0 {
      grid-column: 7;
    }
    &--day {
      font-weight: 500;
      padding: 8px;
      &:hover {
        background-color: $gray-color-40;
        border-radius: 50%;
      }
    }
    &--current-day {
      font-weight: 700;
    }
    &--selected {
      background-color: $gray-color-100;
      color: $white-color;
      border-radius: 50%;
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
.datepicker {
  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 16px;
  }
  &__calendar {
    margin-top: 20px;
  }
}
.calendar {
  &__text {
    color: $gray-color-100;
    font-size: 1.25rem;
    margin-top: 14px;
    &--bold {
      font-weight: 600;
      color: black;
    }
  }
}
</style>
