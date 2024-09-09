export type TGetDate = {
  currentDayOfTheWeek: number
  days: Array<TDays>
  monthName: string
  currentYear: number
  currentDay: number
}

export type TDays = {
  day: number
  date: number
  dayName: string
  monthName: string
}

export const getDate = (year: number, month: number): TGetDate => {
  const currentDate = new Date(year, month)
  const currentDayOfTheWeek = currentDate.getDay()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const daysNameDict = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
  })
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = []
  for (let i = 1; i < lastDay + 1; i++) {
    const date = new Date(currentYear, currentMonth, i)
    const day = date.getDay()
    days.push({
      day: date.getDay(),
      date: date.getDate(),
      dayName: daysNameDict[day],
      monthName: formatter.format(date),
    })
  }
  return {
    currentDayOfTheWeek,
    currentYear,
    days,
    monthName: formatter.format(currentDate),
    currentDay,
  }
}
