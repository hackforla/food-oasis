import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { TENANT_METADATA } from "../helpers/Constants";

export const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  return (
    <SiteContext.Provider value={TENANT_METADATA}>
      {children}
    </SiteContext.Provider>
  );
};
export const useSiteContext = () => useContext(SiteContext);
SiteProvider.propTypes = {
  children: PropTypes.any,
};
