import { useState, useEffect, useCallback } from "react";
import * as useFeatureToLoginService from "../services/feature-to-login-service";

export const useFeatureToLogin = (id, type) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await useFeatureToLoginService.getLoginsByFeature();
        setData(response);
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
