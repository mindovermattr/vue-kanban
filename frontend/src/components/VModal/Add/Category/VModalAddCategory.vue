<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VCategory from '@/components/VCategory.vue'
import { useCategoryStore } from '@/store/useCategoryStore'
import { ref } from 'vue'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import VModal from '../../VModal.vue'

const isVisible = ref(false)
const mainColor = ref('#ffffff')
const accentColor = ref('#000000')
const name = ref('Demo')

const categories = useCategoryStore()

const addCategory = async () => {
  await categories.addCategory({
    name: name.value,
    main_color: mainColor.value.toUpperCase(),
    accent_color: accentColor.value.toUpperCase(),
  })
  emit('closeModal')
}

const emit = defineEmits<(e: 'closeModal') => void>()
</script>

<template>
  <VModal :is-visible="isVisible" @close-modal="emit('closeModal')">
    <form class="modal-update__form form" @click.stop>
      <h2 class="form__title">Создать новую категорию</h2>
      {{ name }}
      <fieldset class="form__field field">
        <legend class="field__title">Имя категории</legend>
        <input v-model="name" type="text" />
      </fieldset>
      <div class="colors">
        <fieldset class="form__field field">
          <legend class="field__title">Цвет текста</legend>
          <ColorPicker pickerType="chrome" format="hex6" v-model:pureColor="mainColor" />
          {{ mainColor }}
        </fieldset>
        <fieldset class="form__field field">
          <legend class="field__title">Цвет фона</legend>
          <ColorPicker pickerType="chrome" format="hex" v-model:pureColor="accentColor" />
          {{ accentColor }}
        </fieldset>
      </div>
      <div class="demo">
        <VCategory :name="name" :id="0" :main_color="mainColor" :accent_color="accentColor" />
      </div>
      <VButton @click.prevent="addCategory" variant="contained">Создать категорию</VButton>
    </form>
  </VModal>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 40px;
  &__title {
    font-size: 2.5rem;
  }
}

.field {
  &__title {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
}

.colors {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
