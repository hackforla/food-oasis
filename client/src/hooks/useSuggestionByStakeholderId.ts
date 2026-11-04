import { useCallback, useEffect, useState } from "react";
import * as suggestionService from "../services/suggestion-service";
import type { Suggestion } from "../types/Organization";

type LoadingState = boolean | { loading: true };

export const useSuggestionByStakeholderId = (
  stakeholderId?: string | number
) => {
  const [data, setData] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<LoadingState>(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetch = useCallback(async () => {
    const fetchApi = async () => {
      if (!stakeholderId) return;

      setLoading({ loading: true });
      try {
        const suggestions =
          (await suggestionService.getByStakeholderId(stakeholderId)) as Suggestion[];

        setData(suggestions);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchApi();
  }, [stakeholderId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading, refetch: fetch };
};