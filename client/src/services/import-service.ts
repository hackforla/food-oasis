import axios from "axios";

const baseUrl = "/api/import";

const uploadCsv = async (formData: FormData) => {
  const response = await axios.post(`${baseUrl}/stakeholders-csv`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const importCsv = async (payload: Record<string, any>) => {
  const response = await axios.post(
    `${baseUrl}/stakeholders-csv/import`,
    payload
  );
  return response;
};

export { uploadCsv, importCsv };
