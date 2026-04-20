import { useCallback, useState, useEffect } from "react";
import * as parentOrganizationService from "../services/parent-organization-service";

interface ParentOrganization {
  id: number;
  name: string;
  code: string;
  [key: string]: unknown;
}

type LoadingState = boolean | { loading: true };

export const useParentOrganizations = () => {
  const [data, setData] = useState<ParentOrganization[]>([]);
  const [loading, setLoading] = useState<LoadingState>(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const parentOrgs =
          (await parentOrganizationService.getAllByTenantId()) as ParentOrganization[];

        setData(parentOrgs);
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