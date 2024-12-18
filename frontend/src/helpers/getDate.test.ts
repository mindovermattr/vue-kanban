import { getDate } from './getDate'

describe('Testing getDate helper', () => {
  test('Should return date', () => {
    const date = getDate(2024, 5)

    expect(date.currentDayOfTheWeek).toBe(6)
    expect(date.currentYear).toBe(2024)
    expect(date.days[0].date).toBe(1)
    expect(date.days[1].date).toBe(2)
    expect(date.monthName).toBe('июнь')
    expect(date.days.length).toBe(30)
  })
})
