import React, { useState } from "react";
import PropTypes from "prop-types";

export const ToasterContext = React.createContext(null);

export const ToasterProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "" });

  const value = React.useMemo(() => {
    return {
      toast,
      setToast,
    };
  }, [toast]);
  return (
    <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>
  );
};

export const useToasterContext = () => React.useContext(ToasterContext);

ToasterProvider.propTypes = {
  children: PropTypes.any,
};
