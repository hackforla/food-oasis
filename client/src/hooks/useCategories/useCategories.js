import { useState, useEffect, useCallback } from "react";
import * as categoryService from "../../services/category-service";

export const useCategories = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const categories = await categoryService.getAll();
        setState({ data: categories, loading: false, error: false });
      } catch (err) {
        setState({ data: null, loading: false, error: true });
        throw console.error(err);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
