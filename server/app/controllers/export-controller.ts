import { RequestHandler } from "express";

const downloadFile: RequestHandler<never, never, never, never> = async (
  _req,
  res
) => {
  try {
    const file = `${process.cwd()}/uploads/template.csv`;
    res.download(file);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default {
  downloadFile,
};
