import { useCallback, useState, useEffect } from "react";
import * as tagService from "../services/tag-service";

export const useTags = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const tags = await tagService.getAllByTenantId();

        setData(tags);
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
