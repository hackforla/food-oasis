import { useState, useEffect } from "react";
import * as categoryService from "../../services/category-service";

export const useCategories = () => {
  const [state, setState] = useState({ data: null });

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await categoryService.getAll();
      setState({ data });
    };

    fetchApi();
  }, []);

  return state;
};
