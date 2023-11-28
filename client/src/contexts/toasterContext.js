import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";

export const ToasterContext = createContext(null);

export const ToasterProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "" });

  const value = useMemo(() => {
    return {
      toast,
      setToast,
    };
  }, [toast]);
  return (
    <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>
  );
};

export const useToasterContext = () => useContext(ToasterContext);

ToasterProvider.propTypes = {
  children: PropTypes.any,
};
