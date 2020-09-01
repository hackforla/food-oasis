export const getTenantId = () =>
  window.location.hostname.toLowerCase().includes("cafood") ||
  process.env.REACT_APP_TENANT_ID === "2"
    ? 2
    : 1;
