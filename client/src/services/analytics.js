export const postEvent = async (eventName, properties) => {
  // Post event to Google Tag Manager
  window.dataLayer.push({
    event: eventName,
    action: "click",
    value: properties?.id,
    name: properties?.name,
  });
  // Post event to Stormly
  window.stormly("event", eventName, properties);
};

export const identify = async (userId) => {
  // Post event to Google Tag Manager
  window.dataLayer.push({
    event: "identify",
    action: "click",
    value: userId,
    name: "user-" + userId,
  });

  // Post event to Stormly
  window.stormly("identify", userId ? "user-" + userId : null);
};
