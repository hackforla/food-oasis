import React from "react";
import PropTypes from "prop-types";
import { TENANT_CONFIG } from "../helpers/Constants";

export const SiteContext = React.createContext(null);

const TENANT_IDS = {
  1: ["la."],
  2: ["ca.", "california"],
  3: ["hi.", "hawaii"],
  4: ["or.", "oregon", "pdx.", "portland."],
  5: ["mck.", "mckinney."],
  6: ["sb."],
};

const TENANT_NAMES = {
  1: "Los Angeles",
  2: "California",
  3: "Hawaii",
  4: "Oregon",
  5: "McKinney",
  6: "Santa Barbara",
};

export const DEFAULT_VIEWPORTS = {
  1: {
    center: { latitude: 34.0354899, longitude: -118.2439235 },
    zoom: 11,
  },
  2: {
    center: { latitude: 37.96, longitude: -118.87 },
    zoom: 4.5,
  },
  3: {
    center: { latitude: 21.4601548, longitude: -157.99 },
    zoom: 9.5,
  },
  4: {
    center: { latitude: 45.52445, longitude: -122.65066 },
    zoom: 8,
  },
  5: {
    center: { latitude: 33.216239, longitude: -96.65014 },
    zoom: 10.5,
  },
  6: {
    center: { latitude: 34.68758, longitude: -120.157 },
    zoom: 8.75,
  },
};

export function getTenantId() {
  if (process.env.NODE_ENV === "development") {
    return Number(process.env.REACT_APP_TENANT_ID) || 1;
  }
  const tenant = Object.entries(TENANT_IDS).find(([id, values]) => {
    return values.some((value) =>
      window.location.hostname.toLowerCase().includes(value)
    );
  });

  return tenant ? Number(tenant[0]) : 1;
}

export const SiteProvider = ({ children }) => {
  const tenantId = getTenantId();
  const tenantName = TENANT_NAMES[tenantId];
  const tenantDetails = TENANT_CONFIG[tenantId];
  const defaultViewport = DEFAULT_VIEWPORTS[tenantId];

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
