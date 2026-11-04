import { useState, useEffect, useCallback } from "react";
import * as categoryService from "../services/category-service";

interface Category {
  id: number;
  name: string;
  display_order?: number;
  isForFoodSeeker?: boolean;
  [key: string]: unknown;
}

interface UseCategoriesState {
  data: Category[] | null;
  loading: boolean;
  error: boolean;
}

export const useCategories = () => {
  const [state, setState] = useState<UseCategoriesState>({
    data: [],
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setState({ data: null, loading: true, error: false });
      try {
        const categories = (await categoryService.getAll()) as Category[];
        setState({ data: categories || [], loading: false, error: false });
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