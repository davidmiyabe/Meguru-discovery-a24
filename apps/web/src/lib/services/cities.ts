export async function searchCities(query: string): Promise<string[]> {
  const mockCities = ['Paris', 'Tokyo', 'New York', 'London']
  try {
    const res = await fetch(`/cities?q=${encodeURIComponent(query)}`)
    if (res.ok) {
      return res.json()
    }
  } catch (e) {
    // ignore network errors and fall back to mock data
  }
  return mockCities.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  )
}
