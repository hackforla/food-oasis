export const tenantId = (() =>
  window.location.hostname.toLowerCase().includes("hi.food") ||
  window.location.hostname.toLowerCase().includes("hawaii") ||
  process.env.REACT_APP_TENANT_ID === "3"
    ? 3
    : window.location.hostname.toLowerCase().includes("ca.food") ||
      window.location.hostname.toLowerCase().includes("california") ||
      process.env.REACT_APP_TENANT_ID === "2"
    ? 2
    : 1)();

export const defaultCoordinates = (() => {
  switch (tenantId) {
    case 3:
      return { lat: 21.3101548, lon: -157.8428712, zoom: 12, radius: 5 };
    case 2:
      return { lat: 38.3949164, lon: -122.7287326, zoom: 10, radius: 8 };
    default:
      return { lat: 34.0354899, lon: -118.2439235, zoom: 12, radius: 5 };
  }
})();
