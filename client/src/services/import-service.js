import axios from "axios";

const baseUrl = "/api/import";

const uploadCsv = async (formData) => {
  const response = await axios.post(`${baseUrl}/stakeholders-csv`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const importCsv = async (importData) => {
  const response = await axios.post(
    `${baseUrl}/stakeholders-csv/import`,
    importData
  );
  return response;
};

export { uploadCsv, importCsv };
