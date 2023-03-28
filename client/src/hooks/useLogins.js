import React, { useState, useEffect } from "react";
import * as loginsService from "../services/logins-service";

const dateFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const useLogins = (emailQuery) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = React.useCallback(async (email) => {
    const fetchApi = async (email) => {
      setLoading({ loading: true });
      try {
        let logins = await loginsService.getAll(email);
        logins = logins.map((login) => ({
          ...login,
          loginTime: new Date(login.loginTime).toLocaleDateString(
            "en-US",
            dateFormatOptions
          ),
        }));
        setData(logins);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchApi(email);
  }, []);

  useEffect(() => {
    fetch(emailQuery);
  }, [fetch, emailQuery]);

  return { data, error, loading, refetch: fetch };
};
