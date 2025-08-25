import type { Suggestion } from '../types';
import { mockFetchSuggestions } from '../mocks/ai';
import { API_BASE_URL, AI_API_KEY } from '../config';

export async function fetchSuggestions(prompt: string): Promise<Suggestion[]> {
  // TODO: replace mock implementation with real AI API call
  void API_BASE_URL; // referenced to show usage
  void AI_API_KEY;
  return mockFetchSuggestions(prompt);
}
