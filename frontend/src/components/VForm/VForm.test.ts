import { createTestingPinia } from '@pinia/testing'
import { waitFor } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import VFormSign from './VFormSign.vue'

const componentOptions = {
  props: {
    signUp: true,
  },
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          auth: {
            user: '',
            token: '',
          },
        },
      }),
    ],
  },
}
describe('Testing form', () => {
  test('Should render', async () => {
    const wrapper = mount(VFormSign, {
      ...componentOptions,
    })

    wrapper.vm.$emit('toogleSignUp')

    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-testid="userName"]')).toBeDefined()

    const switchButton = wrapper.get('.footer__link')

    await switchButton.trigger('click')
    expect(wrapper.emitted().toogleSignUp.length).toBe(2)
  })
  test('Testing email validation', async () => {
    const wrapper = mount(VFormSign, componentOptions)

    const input = wrapper.get('[data-testid="email"]')

    await waitFor(async () => {
      await input.setValue('11')

      const error = wrapper.get('.form__error')
      expect(error.text()).toContain('некорректная почта')
    })
  })
  test('Testing password confirm validation', async () => {
    const wrapper = mount(VFormSign, componentOptions)

    const passwordInput = wrapper.get('[data-testid="password"]')
    const passwordConfirmInput = wrapper.get('[data-testid="passwordConfirm"]')

    await waitFor(() => {
      passwordInput.setValue('123456')
      passwordConfirmInput.setValue('12345')

      const error = wrapper.get('.form__error')
      expect(error.text()).toContain('Пароли должны совпадать')
    })

    await waitFor(() => {
      passwordInput.setValue('123456')
      passwordConfirmInput.setValue('123456')

      expect(wrapper.find('.form__error').exists()).false
    })
  })
})
