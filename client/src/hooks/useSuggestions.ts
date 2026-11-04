import { useCallback, useEffect, useState } from "react";
import * as suggestionService from "../services/suggestion-service";
import type { Suggestion } from "../types/Organization";

type LoadingState = boolean | { loading: true };

export const useSuggestions = (initialStatuses: number[] = [1, 2, 3, 4]) => {
  const [data, setData] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<LoadingState>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [statusIds, setStatusIds] = useState<number[]>(initialStatuses);

  const fetch = useCallback(async () => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const suggestions =
          (await suggestionService.getAll(statusIds)) as Suggestion[];

        setData(suggestions);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchApi();
  }, [statusIds]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading, refetch: fetch, setStatusIds };
};