import { fireEvent, render } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import VCalendar from './VCalendar.vue'

describe('Testing Calendar', () => {
  test('Should render', () => {
    const { getByText } = render(VCalendar, {})

    expect(getByText('1')).not.null
  })
  test('Testing selected', async () => {
    const { getByTestId } = render(VCalendar, {
      props: {
        initialDate: '2024-11-19',
      },
    })
    const element = getByTestId('1')
    expect(element.classList).not.toContain('layout__item--selected')
    await fireEvent.click(element)
    expect(element.classList).toContain('layout__item--selected')
  })
  test('Teesting incorrect date', () => {
    const { queryByTestId } = render(VCalendar, {
      props: {
        initialDate: '2024-11-19',
      },
    })

    expect(queryByTestId('0')).null
    expect(queryByTestId('32')).null
  })
  test('Testing emit date', async () => {
    const wrapper = mount(VCalendar, {
      props: {
        initialDate: '2014-11-19',
      },
    })
    wrapper.vm.$emit('setDate', new Date('2024-11-19').getDate())

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().setDate[0]).toEqual([19])
    expect(wrapper.emitted().setDate[0]).not.toEqual([20])
  })
})
