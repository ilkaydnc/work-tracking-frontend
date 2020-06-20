export const formatDate = (date) => {
  date = new Date(date)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const sortDates = (dates) => {
  return dates.sort((a, b) => new Date(a) - new Date(b))
}

export const firstDayOfMount = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), 2)
}
