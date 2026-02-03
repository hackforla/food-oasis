import { useState, useEffect, useCallback } from "react";
import * as announcementService from "../services/announcements-service";

export interface ProcessedAnnouncement {
  announcementId: number;
  title: string;
  description: string;
  is_enabled: boolean;
  severity: "info" | "warning" | "error" | "success";
  created_at: string;
}

export interface UseAnnouncementsReturn {
  data: ProcessedAnnouncement[];
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

export const useAnnouncements = (): UseAnnouncementsReturn => {
  const [data, setData] = useState<ProcessedAnnouncement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const announcements = await announcementService.getAllAnnouncements();
        const processed = announcements
          .slice()
          .sort((a: any, b: any) => a.id - b.id)
          .map((announcement: any) => ({
            announcementId: announcement.id,
            title: announcement.title,
            description: announcement.description,
            is_enabled: announcement.is_enabled,
            severity: announcement.severity,
            created_at: announcement.created_at,
          }));
        setData(processed);
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading, refetch: fetch };
};
