const fs = require("fs");
const parse = require("csv-parse");
const esriService = require("../services/esri-service");

function formatMapAddress(formData) {
  return `${formData.address_1 || ""} ${formData.address_2 || ""} ${
    formData.city || ""
  }, ${formData.state || ""} ${formData.zip || ""}`;
}

const importCsv = async (file) => {
  const stream = fs.createReadStream(file.path, "utf8");
  let rowArray = [];

  const parser = stream.pipe(
    parse({
      delimiter: ",",
      columns: true,
      trim: true,
    })
  );

  for await (const row of parser) {
    if (row.latitude && row.longitude) {
      const newRow = await {
        ...row,
        latitude: +row.latitude,
        longitude: +row.longitude,
      };
      rowArray.push(newRow);
    } else {
      const response = await esriService.geocode(formatMapAddress(row));
      const newRow = await {
        ...row,
        latitude: response[0].attributes.Y,
        longitude: response[0].attributes.X,
      };
      rowArray.push(newRow);
    }
  }
  return rowArray;
};

module.exports = {
  importCsv,
};
