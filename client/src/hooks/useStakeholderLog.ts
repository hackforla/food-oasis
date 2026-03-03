import { useState, useEffect, useCallback } from "react";
import * as stakeholderLogService from "services/stakeholder-log-service";

export interface StakeholderLogEntry {
  id: number;
  version: number;
  modifiedDate: string;
  modifiedUser: string;
  modifiedUserRole: string;
  verificationStatusId: number;
  // ... all other stakeholder fields
  [key: string]: any;
}

export const useStakeholderLog = (stakeholderId: string | number | undefined) => {
  const [data, setData] = useState<StakeholderLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!stakeholderId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await stakeholderLogService.getByStakeholderId(stakeholderId);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [stakeholderId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
