import { useState, useEffect, useCallback } from "react";
import * as localNotificationsService from "../services/localNotifications-service";

export const useLocalNotifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const tags = await localNotificationsService.getAlllocalNotifications();

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
