import { breakpoints } from "../theme/breakpoints";
import geoViewport from "@mapbox/geo-viewport";

export const getMapBounds = (center, zoom, dimensions) => {
  const [minLng, minLat, maxLng, maxLat] = geoViewport.bounds(
    [center.longitude, center.latitude],
    zoom,
    [dimensions.width, dimensions.height],
    512
  );

  return { minLng, minLat, maxLng, maxLat };
};

export const getGoogleMapsUrl = (zip, address1, address2) => {
  const baseUrl = `https://google.com/maps/place/`;

  const address1urlArray = address1.split(" ");
  const address1url = address1urlArray.reduce(
    (acc, currentWord) => `${acc}+${currentWord}`
  );

  if (address2) {
    const address2urlArray = address2.split(" ");
    const address2url = address2urlArray.reduce(
      (acc, currentWord) => `${acc}+${currentWord}`
    );
    return `${baseUrl}${address1url},+${address2url},+${zip}`;
  }

  return `${baseUrl}${address1url},+${zip}`;
};

export const getGoogleMapsDirectionsUrl = (
  originCoordinates,
  destinationCoordinates
) => {
  return (
    `https://google.com/maps/dir/?api=1` +
    (originCoordinates
      ? `&origin=${originCoordinates.latitude},${originCoordinates.longitude}`
      : "") +
    `&destination=${destinationCoordinates.latitude},${destinationCoordinates.longitude}`
  );
};

export const isMobile = () => window.innerWidth < breakpoints.values.sm;

export const extractNumbers = (numbers) =>
  numbers.split(/(and)|,|&+/).map((n) => {
    const match = new RegExp(
      "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
      "g"
    ).exec(n);
    return match
      ? { number: true, value: match[0] }
      : { number: false, value: n };
  });

export const formatDate = (ts) => {
  return !ts
    ? null
    : new Date(ts).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
};

export const formatDateMMMddYYYY = (ts) => {
  return !ts
    ? null
    : new Date(ts).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

export const formatDatewTimeZoneDD = (ts, timeZone) => {
  if (!ts || !timeZone) {
    return null;
  }
  return new Date(ts).toLocaleString("en-US", { timeZone, day: "2-digit" });
};

export const formatDatewTimeZonehhmmss = (ts, timeZone) => {
  if (!ts || !timeZone) {
    return null;
  }
  return new Date(ts).toLocaleString("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// e.g. returns "Tue"
export const formatDatewTimeZoneWeekdayShort = (ts, timeZone) => {
  if (!ts || !timeZone) {
    return null;
  }
  return new Date(ts).toLocaleString("en-US", {
    timeZone,
    weekday: "short",
  });
};

// e.g. returns "Apr"
export const formatDatewTimeZoneMMM = (ts, timeZone) => {
  if (!ts || !timeZone) {
    return null;
  }
  return new Date(ts).toLocaleString("en-US", {
    timeZone,
    month: "short",
  });
};

export const validateUrl = (url) => {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `http://${url}`;
};
