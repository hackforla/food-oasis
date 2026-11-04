import axios from "axios";

const exportCsv = async (filename: string) => {
  try {
    const file = await axios.get("/api/export/csv-template", {
      responseType: "blob",
    });
    const data = new Blob([file.data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.download = filename;
    document.body.appendChild(link);

    link.click();
  } catch (err: any) {
    console.error(err.message);
  }
};

export default exportCsv;
