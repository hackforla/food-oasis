import { useState, useEffect } from "react";
import * as featureService from "../services/feature-service";

export const useFeatures = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const features = await featureService.getAllFeatures();
        setData(features);
      } catch (error) {
        setError(error);
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  return { data, error, loading, refetch: fetch };
};
