export const getTenantId = () =>
  window.location.hostname.toLowerCase().includes("hi.food") ||
  window.location.hostname.toLowerCase().includes("hawaii") ||
  process.env.REACT_APP_TENANT_ID === "3"
    ? 3
    : window.location.hostname.toLowerCase().includes("ca.food") ||
      window.location.hostname.toLowerCase().includes("california") ||
      process.env.REACT_APP_TENANT_ID === "2"
    ? 2
    : 1;

export const defaultCoordinates = (() => {
  switch (getTenantId()) {
    case 3:
      return { lat: 21.33629, lon: -157.89435 };
    case 2:
      return { lat: 38.576711, lon: -121.493671 };
    default:
      return { lat: 34.07872, lon: -118.243328 };
  }
})();
