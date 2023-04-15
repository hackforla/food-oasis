import { getTenantId } from "contexts/siteContext";
import { TENANT_CONFIG } from "./Constants";

export const tenantId = getTenantId();

export const tenantName = TENANT_CONFIG[tenantId].tenantName;

export const tenantDetails = TENANT_CONFIG[tenantId];

export const defaultViewport = TENANT_CONFIG[tenantId].defaultViewport;
