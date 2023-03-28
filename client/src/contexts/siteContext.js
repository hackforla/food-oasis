import React from "react";
import PropTypes from "prop-types";
import { TENANT_CONFIG } from "../helpers/Constants";

export const SiteContext = React.createContext(null);

export function getTenantId() {
  if (process.env.NODE_ENV === "development") {
    return Number(process.env.REACT_APP_TENANT_ID) || 1;
  }
  const tenant = Object.entries(TENANT_CONFIG.urlContains).find(
    ([id, config]) => {
      return config.some((value) =>
        window.location.hostname.toLowerCase().includes(config)
      );
    }
  );
  return tenant ? Number(tenant[0]) : 1;
}

export const SiteProvider = ({ children }) => {
  const tenantId = getTenantId();
  const tenantName = TENANT_CONFIG[tenantId].tenantName;
  const tenantDetails = TENANT_CONFIG[tenantId];
  const defaultViewport = TENANT_CONFIG[tenantId].defaultViewport;

  const value = React.useMemo(() => {
    return {
      tenantId,
      tenantName,
      tenantDetails,
      defaultViewport,
    };
  }, [tenantId, tenantName, tenantDetails, defaultViewport]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSiteContext = () => React.useContext(SiteContext);

SiteProvider.propTypes = {
  children: PropTypes.any,
};
