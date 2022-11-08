import { TENANT_CONFIG } from "./Constants";

export const tenantId = (() =>
  window.location.hostname.toLowerCase().includes("sb.") ||
  process.env.REACT_APP_TENANT_ID === "6"
    ? 6
    : window.location.hostname.toLowerCase().includes("mck.") ||
      window.location.hostname.toLowerCase().includes("mckinney.") ||
      process.env.REACT_APP_TENANT_ID === "5"
    ? 5
    : window.location.hostname.toLowerCase().includes("hi.") ||
      window.location.hostname.toLowerCase().includes("hawaii") ||
      process.env.REACT_APP_TENANT_ID === "3"
    ? 3
    : 1)();

export const tenantName = (() => {
  switch (tenantId) {
    case 3:
      return "Hawaii";
    case 5:
      return "McKinney";
    case 6:
      return "Santa Barbara";
    default:
      return "Los Angeles";
  }
})();

export const tenantDetails = (() => {
  return TENANT_CONFIG[tenantId] || TENANT_CONFIG.default;
})();

export const defaultViewport = (() => {
  switch (tenantId) {
    case 6:
      return {
        center: { latitude: 34.68758, longitude: -120.157 },
        zoom: 8.75,
      };
    case 5:
      return {
        center: { latitude: 33.216239, longitude: -96.65014 },
        zoom: 10.5,
      };
    case 3:
      return {
        center: { latitude: 21.4601548, longitude: -157.99 },
        zoom: 9.5,
      };
    default:
      return {
        center: { latitude: 34.0354899, longitude: -118.2439235 },
        zoom: 11,
      };
  }
})();
