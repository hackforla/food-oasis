import { useState, useEffect, useCallback } from "react";
import * as featureService from "../services/feature-service";

export const useFeatures = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const tags = await featureService.getAllFeatures();

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
