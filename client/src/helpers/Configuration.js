export const getTenantId = () =>
  window.location.hostname.toLowerCase().includes("ca") ||
  process.env.REACT_APP_TENANT_ID === "2"
    ? 2
    : 1;
