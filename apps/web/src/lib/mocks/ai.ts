import type { Suggestion } from '../types';

export async function mockFetchSuggestions(prompt: string): Promise<Suggestion[]> {
  return Array.from({ length: 5 }, (_, i) => ({
    id: String(i + 1),
    text: `Mock suggestion ${i + 1} for ${prompt}`,
  }));
}
