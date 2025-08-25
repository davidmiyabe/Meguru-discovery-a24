export interface Suggestion {
  id: number
  title: string
  description: string
}

export async function fetchSuggestions(_criteria: Record<string, unknown>): Promise<Suggestion[]> {
  void _criteria
  return [
    { id: 1, title: 'Museum Visit', description: 'Explore the city museum.' },
    { id: 2, title: 'Local Cafe', description: 'Try coffee at the local cafe.' },
    { id: 3, title: 'City Park', description: 'Take a walk in the park.' },
  ]
}
