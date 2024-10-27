import { useState, useEffect, useCallback } from "react";
import * as featureService from "../services/feature-service";

export const useFeatures = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const featureRefetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
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
    featureRefetch();
  }, [featureRefetch]);
  
  return { data, error, loading, refetch: featureRefetch };
};
