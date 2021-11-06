import React, { useState, useEffect } from "react";
import * as suggestionService from "../services/suggestion-service";

export const useSuggestions = (initialStatuses = [1, 2, 3, 4]) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusIds, setStatusIds] = useState(initialStatuses);

  const fetch = React.useCallback(async () => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const suggestions = await suggestionService.getAll(statusIds);

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
