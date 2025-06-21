import { useQuery } from "@tanstack/react-query";
import { fetchDefinition } from "../api/dictionaryApi";
import type { DictionaryDefinition } from "../api/dictionaryApi";

/**
 * useDictionaryQuery is a custom hook that fetches the dictionary definition for a given word.
 * @param word - The word to look up in the dictionary.
 * @returns A React Query object containing the dictionary definition data and metadata.
 */
export const useDictionaryQuery = (word: string) => {
  return useQuery<DictionaryDefinition[]>({
    queryKey: ["dictionary", word],
    queryFn: () => fetchDefinition(word),
    // manual trigger(ONLY runs when you call refetch() manually): It's a common pattern for user-triggered actions rather than automatic data fetching.
    enabled: false,
    // prevent auto-retries if it fails (default - retries 3 times)
    retry: false,
  });
};
