import { useCallback, useEffect, useState } from "react";
import * as emailTemplateService from "../services/email-template-service";
import type { EmailTemplate } from "../services/email-template-service";
import { useSiteContext } from "../contexts/siteContext";

interface UseEmailTemplateState {
  data: EmailTemplate | null;
  loading: boolean;
  error: boolean;
}

export const useEmailTemplate = (key: string) => {
  const { tenantId } = useSiteContext();
  const [state, setState] = useState<UseEmailTemplateState>({
    data: null,
    loading: true,
    error: false,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: false }));
    try {
      const data = await emailTemplateService.getByKey(key, tenantId);
      setState({ data, loading: false, error: false });
    } catch (err) {
      console.error(err);
      setState({ data: null, loading: false, error: true });
    }
  }, [key, tenantId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Saves only the provided fields; throws on failure so callers can toast.
  const save = useCallback(
    async (fields: Partial<EmailTemplate>) => {
      const data = await emailTemplateService.post(key, tenantId, fields);
      setState({ data, loading: false, error: false });
      return data;
    },
    [key, tenantId]
  );

  return { ...state, refetch: fetch, save };
};
