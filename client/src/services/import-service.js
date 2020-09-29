import axios from "axios";

const baseUrl = "/api/imports";

const importCsv = async (formData) => {
  const response = await axios.post(`${baseUrl}/stakeholders-csv`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default importCsv;
