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
        const processed = announcements
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((announcement) => ({
            announcementId: announcement.id,
            title: announcement.title,
            description: announcement.description,
            is_enabled: announcement.is_enabled,
          }));
        setData(processed);
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