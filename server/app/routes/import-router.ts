import { ErrorRequestHandler, Router } from "express";
import path from "path";
const router = Router();
import jwtSession from "../../middleware/jwt-session";
import importController from "../controllers/import-controller";
import multer from "multer";

const MAX_CSV_FILE_SIZE = 5 * 1024 * 1024;
const CSV_MIME_TYPES = new Set([
  "application/octet-stream",
  "application/vnd.ms-excel",
  "text/csv",
  "text/plain",
]);

class InvalidCsvFileError extends Error {
  constructor() {
    super("Only CSV files are allowed.");
    this.name = "InvalidCsvFileError";
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_CSV_FILE_SIZE,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    const isCsvFile = path.extname(file.originalname).toLowerCase() === ".csv";
    const isAllowedMimeType = CSV_MIME_TYPES.has(file.mimetype);

    if (!isCsvFile || !isAllowedMimeType) {
      callback(new InvalidCsvFileError());
      return;
    }

    callback(null, true);
  },
});

const handleUploadError: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ error: "CSV file must be 5 MB or smaller." });
      return;
    }

    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof InvalidCsvFileError) {
    res.status(400).json({ error: err.message });
    return;
  }

  next(err);
};

router.post(
  "/stakeholders-csv",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  upload.single("file"),
  handleUploadError,
  importController.uploadStakeholderCsv
);

router.post(
  "/stakeholders-csv/import",
  jwtSession.validateUserHasRequiredRoles(["admin"]),
  importController.importStakeholderCsv
);

export default router;
