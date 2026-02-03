import { useState, useEffect, useCallback } from "react";
import * as featureToLoginService from "../services/feature-to-login-service";

export const useFeatureToLogin = (id?: number, type?: string) => {
  const [data, setData] = useState<
    featureToLoginService.FeatureToLogin[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await featureToLoginService.getLoginsByFeature();
        setData(response);
        setLoading(false);
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
