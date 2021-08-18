import { useState, useEffect } from "react";
import * as parentOrganizationService from "../services/parent-organization-service";

export const useParentOrganization = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    setLoading({ loading: true });
    try {
      const parentOrgs = await parentOrganizationService.getAllByTenantId();

      setData(parentOrgs);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { data, error, loading, refetch: fetch };
};

