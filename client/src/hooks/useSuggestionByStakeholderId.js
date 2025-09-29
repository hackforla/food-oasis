import { useCallback, useEffect, useState } from "react";
import * as suggestionService from "../services/suggestion-service";

export const useSuggestionByStakeholderId = (stakeholderId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    const fetchApi = async () => {
      if (!stakeholderId) return;

      setLoading({ loading: true });
      try {
        const suggestions = await suggestionService.getByStakeholderId(
          stakeholderId
        );

        setData(suggestions);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading, refetch: fetch };
};
