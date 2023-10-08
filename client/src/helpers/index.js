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

export const haversineDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  const R = 3958.8; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d; // Returns distance in miles
};

export const isStaleData = () => {
  const storedTimestamp = localStorage.getItem("stakeholdersTimestamp");
  if (!storedTimestamp) return true;

  const currentTimestamp = new Date().getTime();
  const fiveMinutesInMilliseconds = 5 * 60 * 1000;

  return currentTimestamp - Number(storedTimestamp) > fiveMinutesInMilliseconds;
};

export const computeDistances = (userLatitude, userLongitude, stakeholders) => {
  const filteredStakeholders = stakeholders.filter(
    (stakeholder) =>
      !(stakeholder.latitude === 0 && stakeholder.longitude === 0)
  );

  filteredStakeholders.forEach((stakeholder) => {
    if (
      typeof stakeholder.latitude !== "undefined" &&
      stakeholder.latitude !== null &&
      typeof stakeholder.longitude !== "undefined" &&
      stakeholder.longitude !== null
    ) {
      stakeholder.distance = haversineDistanceInMiles(
        userLatitude,
        userLongitude,
        stakeholder.latitude,
        stakeholder.longitude
      );
    } else {
      stakeholder.distance = null;
    }
  });

  return filteredStakeholders;
};
