export const tenantId = (() =>
  window.location.hostname.toLowerCase().includes("sb.") ||
  process.env.REACT_APP_TENANT_ID === "6"
    ? 6
    : window.location.hostname.toLowerCase().includes("mck.") ||
      window.location.hostname.toLowerCase().includes("mckinney.") ||
      process.env.REACT_APP_TENANT_ID === "5"
    ? 5
    : window.location.hostname.toLowerCase().includes("or.") ||
      window.location.hostname.toLowerCase().includes("oregon.") ||
      window.location.hostname.toLowerCase().includes("pdx.") ||
      window.location.hostname.toLowerCase().includes("portland.") ||
      process.env.REACT_APP_TENANT_ID === "4"
    ? 4
    : window.location.hostname.toLowerCase().includes("hi.") ||
      window.location.hostname.toLowerCase().includes("hawaii") ||
      process.env.REACT_APP_TENANT_ID === "3"
    ? 3
    : window.location.hostname.toLowerCase().includes("ca.") ||
      window.location.hostname.toLowerCase().includes("california") ||
      process.env.REACT_APP_TENANT_ID === "2"
    ? 2
    : 1)();

export const tenantName = (() => {
  switch (tenantId) {
    case 2:
      return "California";
    case 3:
      return "Hawaii";
    case 4:
      return "Oregon";
    case 5:
      return "McKinney";
    case 6:
      return "Santa Barbara";
    default:
      return "Los Angeles";
  }
})();

export const defaultCoordinates = (() => {
  switch (tenantId) {
    case 6:
      return { lat: 34.68758, lon: -120.157, zoom: 8.75, radius: 100 };
    case 5:
      return { lat: 33.216239, lon: -96.65014, zoom: 10.5, radius: 100 };
    case 4:
      return { lat: 45.52445, lon: -122.65066, zoom: 8, radius: 300 };
    case 3:
      return { lat: 21.4601548, lon: -157.99, zoom: 9.5, radius: 100 };
    case 2:
      return { lat: 37.96, lon: -118.87, zoom: 4.5, radius: 450 };
    default:
      return { lat: 34.0354899, lon: -118.2439235, zoom: 11, radius: 20 };
  }
})();
