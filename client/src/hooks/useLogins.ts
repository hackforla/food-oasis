import { useCallback, useEffect, useState } from "react";
import * as loginsService from "../services/logins-service";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};
export interface FormattedLogin {
  loginTime: string;
  id: number;
  firstName: loginsService.FirstName;
  lastName: loginsService.LastName;
  email: string;
}

export const useLogins = () => {
  const [data, setData] = useState<FormattedLogin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetch = useCallback(async (email?: string) => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        let logins = await loginsService.getAll(email);
        let formattedLogins: FormattedLogin[] = logins.map((login) => ({
          ...login,
          loginTime: new Date(login.loginTime).toLocaleDateString(
            "en-US",
            dateFormatOptions
          ),
        }));
        setData(formattedLogins);
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
