import axios from "axios";

const baseUrl =
  "https://t.stormly.com/collect/json/d6f56047e6527499d8e4854b8db2f5f49";

export const post = async (eventName, properties) => {
  const response = axios.post(baseUrl, {
    user_client: "browser",
    action: "event",
    name: eventName,
    user_id: "anonymous-id-or-user-id-from-cookie",
    timestamp: new Date().toISOString(),

    // "event_id": null, // Optional. Makes sure only one event is stored, even if tracked or imported multiple times.
    // "share_code": null, // Optional. Specify, by share code, which other user referred this user in order to track virality. Share code must be generated as follow: MD5(user-id-of-referring-user).substring(0, 9). This share code can then be added to urls, etc. so when the share code parameter is detected in them, we track any request from current user and add <code>share_code</code> to track virality.
    // "referred_by_user_id": null, // Optional. Same as <code>share_code</code>, except that it is the unhashed user ID of the referring user, of which the hashed share code will be generated automatically before being processed. Normally this parameter should not be used in public calls or otherwise, due to user IDs being personal data. Only use it when needed, using server-side API calls.

    properties: properties,
  });
  return response.data;
};
