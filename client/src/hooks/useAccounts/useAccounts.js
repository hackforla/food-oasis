import { useState, useEffect, useCallback } from "react";
import * as accountService from "../../services/account-service";

export const useAccounts = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const { data } = await accountService.getAll();
        setState({ data: data || [], loading: false, error: false });
      } catch (err) {
        setState({ data: [], loading: false, error: true });
        console.error(err);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
