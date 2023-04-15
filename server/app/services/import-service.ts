// @ts-nocheck
import parse from "csv-parse";
import { Readable } from "stream";
import stakeholderService from "./stakeholder-service";
import {
  parseStakeholderHours,
  setDefaultValues,
  getLatLong,
} from "./import-utils";
import { ImportAction } from "../../types/import-types";

// These services are used by the CSV import process (originally designed for Hawaii)

// we can use this function to reformat the field names/values in the csv before rendering in browser table
// TODO: update any type
const parseCsv = async (file: any) => {
  // memory storage
  if (!file) return;
  const { buffer } = file;
  const stream = Readable.from(buffer.toString());
  // disk storage - comment out 'memory storage' above to replace with 'disk storage'
  // const stream = fs.createReadStream(file.path, "utf8");
  const rowArray = [];
  const parser = stream.pipe(
    parse({
      delimiter: ",",
      columns: true,
      trim: true,
    })
  );

  for await (const row of parser) {
    try {
      const { latitude, longitude } = await getLatLong(row);
      const newRow = await {
        ...setDefaultValues(row),
        selectedCategoryIds: row.selectedCategoryIds
          ? row.selectedCategoryIds.split(",")
          : [],
        latitude,
        longitude,
        hours: parseStakeholderHours(row),
      };
      rowArray.push(newRow);
    } catch {
      console.error("error");
      return;
    }
  }

  return rowArray;
};

// TODO: update data type, possibly stakeholder array
const importCsv = async (data: any, action: ImportAction, tenantId: number) => {
  try {
    stakeholderService.insertBulk(data, action, tenantId);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default {
  parseCsv,
  importCsv,
};
