export const toHashTable = (data) => {
  const hash = {}
  data.forEach((item) => {
    hash[item.name] = { ...item }
  })
  return hash
}
