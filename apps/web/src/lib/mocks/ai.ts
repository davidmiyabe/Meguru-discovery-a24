import type { Suggestion } from '../types';

export async function mockFetchSuggestions(prompt: string): Promise<Suggestion[]> {
  return [
    {
      id: '1',
      text: `Mock suggestion for ${prompt}`,
    },
  ];
}
