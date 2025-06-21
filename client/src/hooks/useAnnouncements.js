import { useState, useEffect, useCallback } from "react";
import * as announcementService from "../services/announcements-service";

export const useAnnouncements = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const announcements = await announcementService.getAllAnnouncements();
        setData(announcements);
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