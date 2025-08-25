import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSuggestions } from './services/ai';
import { getTrips, saveTrip } from './services/storage';
import type { Trip } from './types';

export function useSuggestions(prompt: string) {
  return useQuery({
    queryKey: ['suggestions', prompt],
    queryFn: () => fetchSuggestions(prompt),
    enabled: !!prompt,
  });
}

export function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: getTrips,
  });
}

export function useSaveTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trip: Trip) => saveTrip(trip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}
