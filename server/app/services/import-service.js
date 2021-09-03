const parse = require("csv-parse");
const { Readable } = require("stream");
const stakeholderService = require("./stakeholder-service");
const {
  parseStakeholderHours,
  setDefaultValues,
  getLatLong,
} = require("./import-utils");

// we can use this function to reformat the field names/values in the csv before rendering in browser table
const parseCsv = async (file) => {
  // memory storage
  if (!file) return;
  const { buffer } = file;
  const stream = Readable.from(buffer.toString());
  // disk storage - comment out 'memory storage' above to replace with 'disk storage'
  // const stream = fs.createReadStream(file.path, "utf8");
  let rowArray = [];
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

const importCsv = async (data, action, tenantId) => {
  try {
    stakeholderService.insertBulk(data, action, tenantId);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  parseCsv,
  importCsv,
};
