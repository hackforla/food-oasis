import React, { useState, useEffect } from "react";
import * as suggestionService from "../services/suggestion-service";

export const useSuggestions = (params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = React.useCallback(async () => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const suggestions = await suggestionService.getAll(params);

        setData(suggestions);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchApi();
  }, [params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading, refetch: fetch };
};
