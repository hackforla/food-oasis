import { breakpoints } from "../theme/breakpoints";
import geoViewport from "@mapbox/geo-viewport";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

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

export const formatShortWeekdayToLong = (shortWeekday) => {
  const weekdays = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  return weekdays[shortWeekday] || null;
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

export const checkIfStaleData = () => {
  const storedTimestamp = localStorage.getItem("stakeholdersTimestamp");
  if (!storedTimestamp) return true;

  const currentTimestamp = new Date().getTime();
  const timeToRefreshInMilliseconds = 10 * 60 * 1000; //this is 10 minutes

  return (
    currentTimestamp - Number(storedTimestamp) > timeToRefreshInMilliseconds
  );
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

/**
 * This function takes in a dayInput and timeInput from the global openTimeFilter state and a targetTimezone
 * and returns the next date and time in the target timezone that matches
 * the day and time.
 * Example inputs: day: "SUN", time: "01:00AM", "America/New_York";
 * Example output: "2023-12-24T06:00:00.003Z"
 */
export const getNextDateForDay = (dayInput, timeInput, targetTimezone) => {
  const dayMap = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
  const targetDay = dayMap[dayInput.toUpperCase()];

  if (timeInput === "Any") {
    let currentDate = dayjs().tz(targetTimezone);
    let currentDay = currentDate.day();

    let dayDifference = targetDay - currentDay;
    if (dayDifference < 0) dayDifference += 7;

    return currentDate.add(dayDifference, "day").startOf("day");
  }

  let time = dayjs(timeInput, "hh:mmA");
  let currentDate = dayjs().tz(targetTimezone);
  let currentDay = currentDate.day();

  let dayDifference = targetDay - currentDay;
  if (dayDifference < 0) dayDifference += 7;
  if (dayDifference === 0 && currentDate.hour() > time.hour()) {
    dayDifference += 7;
  }

  return currentDate
    .add(dayDifference, "day")
    .set("hour", time.hour())
    .set("minute", time.minute())
    .set("second", 0);
};

export const getDayTimeNow = () => {
  const now = dayjs();
  const dayNow = now.format("ddd").toUpperCase();
  const timeTime = now.format("hh:mmA");

  return [dayNow, timeTime];
};

export const getDayOfWeekNum = (dayOfWeekString) => {
  const weekdayNumbers = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  return weekdayNumbers[dayOfWeekString.toLowerCase()] || null;
};

export const getLastWeekdayInMonth = (year, month, dayOfWeek) => {
  let date = new Date(year, month + 1, 0, 12);
  date.setDate(date.getDate() - ((date.getDay() + 7 - dayOfWeek) % 7));
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
};

export const getNthWeekdayInMonth = (day_of_week, week_of_month, date) => {
  const weekday = getDayOfWeekNum(day_of_week);

  if (week_of_month === -1) {
    return getLastWeekdayInMonth(date.getFullYear(), date.getMonth(), weekday);
  }

  let nDate = new Date(date.getFullYear(), date.getMonth(), 1);
  let add = ((weekday - nDate.getDay() + 7) % 7) + (week_of_month - 1) * 7;

  nDate.setDate(1 + add);

  return nDate;
};

export const getCurrentWeekOfMonth = () => {
  const todaysDate = new Date();
  const date = todaysDate.getDate();
  const day = todaysDate.getDay();
  const weekOfMonth = Math.ceil((date - 1 - day) / 7);

  return weekOfMonth;
};

export const isLastWeekOfMonth = () => {
  const todaysDate = new Date();
  const currentMonth = todaysDate.getMonth();
  const nextMonth = new Date(todaysDate);
  nextMonth.setMonth(currentMonth + 1);
  nextMonth.setDate(0);

  const lastWeekStartDate = nextMonth.getDate() - 6;
  const currentDate = todaysDate.getDate();

  if (currentDate >= lastWeekStartDate) {
    return true;
  } else {
    return false;
  }
};

const addMonths = (date, months) => {
  const normalizedDate = new Date(date);
  const d = normalizedDate.getDate();
  normalizedDate.setMonth(normalizedDate.getMonth() + months);
  if (normalizedDate.getDate() !== d) {
    normalizedDate.setDate(0);
  }
  return normalizedDate;
};

export const isCurrentDayAndWeek = (timeZone, hour) => {
  const currentDate = new Date();
  const currentDayOfWeek = formatDatewTimeZoneWeekdayShort(
    currentDate,
    timeZone
  );

  if (hour.day_of_week === currentDayOfWeek) {
    if (
      hour.week_of_month === 0 ||
      (hour.week_of_month > 0 && hour.week_of_month === getCurrentWeekOfMonth())
    )
      return true;
    if ((hour.week_of_month === -1) & isLastWeekOfMonth()) return true;
  }
  return false;
};

const dayOfWeek = (dayOfWeekString) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const order = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const firstHalf = order.slice(0, currentDay);
  const secondHalf = order.slice(currentDay, order.length);
  const newOrder = secondHalf.concat(firstHalf);

  return newOrder.indexOf(dayOfWeekString.toLowerCase());
};

export const standardTime = (timeStr) => {
  if (timeStr) {
    if (parseInt(timeStr.substring(0, 2)) === 12) {
      return `12${timeStr.substring(2, 5)} pm`;
    }
    if (parseInt(timeStr.substring(0, 2)) === 0) {
      return `12${timeStr.substring(2, 5)} am`;
    }
    return parseInt(timeStr.substring(0, 2)) > 12
      ? `${parseInt(timeStr.substring(0, 2)) - 12}${timeStr.substring(2, 5)} pm`
      : `${parseInt(timeStr.substring(0, 5))}${timeStr.substring(2, 5)} am`;
  }
};

export const hoursSort = (hourOne, hourTwo) => {
  let hourOneWeekOfMonth = hourOne.week_of_month;
  let hourTwoWeekOfMonth = hourTwo.week_of_month;

  if (hourOneWeekOfMonth !== hourTwoWeekOfMonth) {
    const currentWeek = getCurrentWeekOfMonth();
    const isLastWeek = isLastWeekOfMonth();

    const isCurrentWeek = (weekOfMonth) => {
      return (
        weekOfMonth === 0 ||
        weekOfMonth === currentWeek ||
        (weekOfMonth === -1 && isLastWeek)
      );
    };

    let hourOneIsCurrentWeek = isCurrentWeek(hourOneWeekOfMonth);
    let hourTwoIsCurrentWeek = isCurrentWeek(hourTwoWeekOfMonth);

    if (hourOneIsCurrentWeek !== hourTwoIsCurrentWeek) {
      return hourOneIsCurrentWeek ? -1 : 1;
    }

    if (!hourOneIsCurrentWeek && !hourTwoIsCurrentWeek) {
      const normalizeWeekOfMonth = (week) => (week === -1 ? 5 : week);

      hourOneWeekOfMonth = normalizeWeekOfMonth(hourOneWeekOfMonth);
      hourTwoWeekOfMonth = normalizeWeekOfMonth(hourTwoWeekOfMonth);

      if (
        (hourOneWeekOfMonth < currentWeek &&
          hourTwoWeekOfMonth < currentWeek) ||
        (hourOneWeekOfMonth > currentWeek && hourTwoWeekOfMonth > currentWeek)
      ) {
        return hourOneWeekOfMonth - hourTwoWeekOfMonth;
      } else if (
        hourOneWeekOfMonth < currentWeek &&
        hourTwoWeekOfMonth > currentWeek
      ) {
        return 1;
      } else {
        return -1;
      }
    }
  }

  const hourOneDayOfWeek = dayOfWeek(hourOne.day_of_week);
  const hourTwoDayOfWeek = dayOfWeek(hourTwo.day_of_week);

  if (hourOneDayOfWeek !== hourTwoDayOfWeek) {
    return hourOneDayOfWeek < hourTwoDayOfWeek ? -1 : 1;
  }
  return hourOne.open < hourTwo.open ? -1 : 1;
};

export const nextOpenTime = (sortedHours, timeZone) => {
  const currentDate = new Date();
  const currentDayOfWeek = formatDatewTimeZoneWeekdayShort(
    currentDate,
    timeZone
  );
  const currentTime = formatDatewTimeZonehhmmss(currentDate, timeZone);

  for (let i = 0; i < sortedHours.length; i++) {
    if (sortedHours[i].week_of_month > 0) {
      if (getCurrentWeekOfMonth() !== sortedHours[i].week_of_month) {
        continue;
      }
    }

    if (sortedHours[i].week_of_month === -1 && !isLastWeekOfMonth()) {
      continue;
    }

    if (currentDayOfWeek !== sortedHours[i].day_of_week) {
      return formatShortWeekdayToLong(sortedHours[i].day_of_week);
    }

    if (currentTime < sortedHours[i].close) {
      return `${standardTime(sortedHours[i].open)} - ${standardTime(
        sortedHours[i].close
      )}`;
    }
  }
  if (sortedHours[0].day_of_week === currentDayOfWeek) {
    return formatShortWeekdayToLong(sortedHours[0].day_of_week);
  }

  let nextDate = getNthWeekdayInMonth(
    sortedHours[0].day_of_week,
    sortedHours[0].week_of_month,
    currentDate
  );

  if (currentDate < nextDate) {
    return nextDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  return addMonths(nextDate, 1).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

const calculateTimeDifference = (time1, time2) => {
  const date1 = new Date(`1970-01-01T${time1}Z`);
  const date2 = new Date(`1970-01-01T${time2}Z`);

  const differenceInMilliseconds = date1.getTime() - date2.getTime();

  const differenceInMinutes = Math.round(
    differenceInMilliseconds / (1000 * 60)
  );

  return differenceInMinutes;
};

export const calculateMinutesToClosing = (hours, tenantTimeZone) => {
  const currentTime = formatDatewTimeZonehhmmss(new Date(), tenantTimeZone);
  return calculateTimeDifference(hours[0].close, currentTime);
};
export const calculateMinutesToOpening = (hours, tenantTimeZone) => {
  if (!hours) {
    return;
  }
  const currentTime = formatDatewTimeZonehhmmss(new Date(), tenantTimeZone);

  return calculateTimeDifference(currentTime, hours[0].open);
};

export const isAlmostClosed = (hours, tenantTimeZone) => {
  const minutesToCloseFlag = 60;
  const minutesToClosing = calculateMinutesToClosing(hours, tenantTimeZone);
  return minutesToClosing <= minutesToCloseFlag;
};

export const isAlmostOpen = (hours, tenantTimeZone) => {
  const minutesToOpenFlag = 60;
  const minutesToOpening = calculateMinutesToOpening(hours, tenantTimeZone);
  return minutesToOpening <= minutesToOpenFlag;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
