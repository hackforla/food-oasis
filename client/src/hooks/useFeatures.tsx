import { useState, useEffect, useCallback } from "react";
import * as featureService from "../services/feature-service";

export const useFeatures = () => {
  const [data, setData] = useState<featureService.Feature[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const features = await featureService.getAllFeatures();

        setData(features);
      } catch (err: any) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading, refetch: fetch } as const;
};
