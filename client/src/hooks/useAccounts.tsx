import { useState, useEffect, useCallback } from "react";
import * as accountService from "../services/account-service";
import type { Account } from "../types/Account";

interface UseAccountsState {
  data: Account[];
  loading: boolean;
  error: boolean;
}

export const useAccounts = () => {
  const [state, setState] = useState<UseAccountsState>({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: [], loading: true, error: false });
      try {
        const { data } = await accountService.getAll();
        setState({ data: data || [], loading: false, error: false });
      } catch (err) {
        console.error(err);
        setState({ data: [], loading: false, error: true });
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
