declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export interface AnalyticsEventProperties {
  id?: number | string;
  name?: string;
  [key: string]: unknown;
}

export const postEvent = async (
  eventName: string,
  properties?: AnalyticsEventProperties
) => {
  // Post event to Google Tag Manager
  window.dataLayer.push({
    event: eventName,
    action: "click",
    value: properties?.id,
    name: properties?.name,
  });
};

export const identify = async (userId?: number | string | null) => {
  // Post event to Google Tag Manager
  window.dataLayer.push({
    event: "identify",
    action: "click",
    value: userId,
    name: "user-" + userId,
  });
};
