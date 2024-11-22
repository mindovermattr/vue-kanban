export const getMinDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date
}
