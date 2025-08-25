import type { Suggestion, TripCriteria } from '../types';
import { API_BASE_URL, AI_API_KEY } from '../config';

export async function fetchSuggestions(
  _criteria: TripCriteria,
): Promise<Suggestion[]> {
  // TODO: replace mock implementation with real AI API call
  void API_BASE_URL; // referenced to show usage
  void AI_API_KEY;
  void _criteria;
  return [
    { id: '1', title: 'Museum Visit', description: 'Explore the city museum.' },
    { id: '2', title: 'Local Cafe', description: 'Try coffee at the local cafe.' },
    { id: '3', title: 'City Park', description: 'Take a walk in the park.' },
  ];
}
