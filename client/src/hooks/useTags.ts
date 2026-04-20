import { useCallback, useState, useEffect } from "react";
import * as tagService from "../services/tag-service";

interface Tag {
  id?: number;
  name: string;
  [key: string]: string | number | undefined;
}

type LoadingState = boolean | { loading: true };

export const useTags = () => {
  const [data, setData] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<LoadingState>(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      setLoading({ loading: true });
      try {
        const tags = (await tagService.getAllByTenantId()) as Tag[];

        setData(tags);
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