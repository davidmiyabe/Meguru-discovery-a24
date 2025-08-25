import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { searchCities } from '../lib/services/cities'

export function useCitySearch(query: string) {
  const [debounced, setDebounced] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  return useQuery({
    queryKey: ['cities', debounced],
    queryFn: () => searchCities(debounced),
    enabled: debounced.length >= 2,
    staleTime: 1000 * 60 * 5,
  })
}
