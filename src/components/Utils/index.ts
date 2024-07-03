export function getItems(name: string) {
  if (typeof window !== "undefined") {
    const storedItems = localStorage.getItem(name)
    if (storedItems !== null) {
      try {
        const item = JSON.parse(storedItems)
        return item
      } catch (error) {
        console.error(error)
      }
    }
  }
  return []
}
