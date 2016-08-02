function formatDate(strDate) {
  const date = new Date(strDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const displayMonth = month < 10 ? `0${month}`: month
  const day = date.getDate()
  const displayDate = day < 10 ? `0${day}`: day
  return `${year}-${displayMonth}-${displayDate}`
}

export default formatDate
