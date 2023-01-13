// @ts-nocheck

import awsService from "./aws-service";
import {
  WEEKS_HOURLY,
  MAP_NUM_TO_DAY,
  STAKEHOLDER_SCHEMA,
} from "./import-constants";

function formatMapAddress(formData) {
  return `${formData.address_1 || ""} ${formData.address_2 || ""} ${formData.city || ""
    }, ${formData.state || ""} ${formData.zip || ""}`;
}

function setDefaultValues(row) {
  STAKEHOLDER_SCHEMA.forEach((field) => {
    const { name } = field;
    if (!row[name] || !row[name].length) {
      row[name] = field.default_value;
    }
  });

  return row;
}

function convertRowHoursToArray(rowHours) {
  if (!rowHours) return;
  return rowHours.replace(/\s/g, "").replace(/\(/g, "").split("),");
}

function convertDayFieldsToArray(dayFields) {
  if (!dayFields) return;
  return dayFields.replace(/\)/g, "").replace(/'/g, "").split(",");
}

function parseHoursAll(row, week) {
  // parses OLD HOURS FORMATTING - hours for entire month in one column
  // eg. hours = (1,Mon,10:00,13:00),(2,Wed,10:000,15:00)
  const { value: weekOfMonth } = week;
  const weeklyHours = [];
  const weekArray = convertRowHoursToArray(row.hours);

  weekArray.forEach((day) => {
    const fields = convertDayFieldsToArray(day);

    if (fields.length !== 4) return;
    if (parseInt(fields[0]) === weekOfMonth) {
      const dayOfWeek = Object.keys(MAP_NUM_TO_DAY).includes(fields[1])
        ? MAP_NUM_TO_DAY[fields[1]]
        : fields[1];
      const open = fields[2];
      const close = fields[3];

      const weekEntry = {
        weekOfMonth,
        dayOfWeek,
        open,
        close,
      };

      weeklyHours.push(weekEntry);
    }
  });

  return weeklyHours;
}

function parseHoursWeekly(row, week) {
  // parses NEW HOURS FORMATTING - hours split by hourseWeek1, hoursWeek2 ...
  // eg. hoursWeek1 = (Mon,10:00,13:00); hoursWeek2 = (Wed,10:000,15:00), etc.
  const { label, value: weekOfMonth } = week;
  const weeklyHours = [];

  if (!row[label]) return;

  const weekArray = convertRowHoursToArray(row[label]);
  if (!weekArray) return;

  weekArray.forEach((day) => {
    const fields = convertDayFieldsToArray(day);

    if (fields.length !== 3) return;

    const dayOfWeek = Object.keys(MAP_NUM_TO_DAY).includes(fields[0])
      ? MAP_NUM_TO_DAY[fields[0]]
      : fields[0];
    const open = fields[1];
    const close = fields[2];

    const weekEntry = {
      weekOfMonth,
      dayOfWeek,
      open,
      close,
    };

    weeklyHours.push(weekEntry);
  });

  return weeklyHours;
}

function parseStakeholderHours(row) {
  const monthlyHours = [];

  WEEKS_HOURLY.forEach((week) => {
    let day;

    if (row.hours && row.hours.length) {
      // compatible with old hours format
      day = parseHoursAll(row, week);
    } else {
      // new hours format
      day = parseHoursWeekly(row, week);
    }

    if (day && day.length) monthlyHours.push(...day);
  });

  return monthlyHours;
}

function getDefaultStakeholderValues(schema) {
  return schema.filter((col) => col.show === false);
}

async function getLatLong(row) {
  const { latitude, longitude } = row;
  if (latitude && longitude) {
    return {
      latitude: +latitude,
      longitude: +longitude,
    };
  }
  try {
    const result = await awsService.getCoords(formatMapAddress(row));
    return {
      latitude: result.Results[0].Place.Geometry.Point[1],
      longitude: result.Results[0].Place.Geometry.Point[0],
    };
  } catch {
    return {
      latitude: 0,
      longitude: 0,
    };
  }
}

export default {
  formatMapAddress,
  parseStakeholderHours,
  getDefaultStakeholderValues,
  setDefaultValues,
  getLatLong,
};
