import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STAKEHOLDER_SCHEMA } from "../../../constants/stakeholder-schema";
import { useSiteContext } from "../../../contexts/siteContext";
import { useToasterContext } from "../../../contexts/toasterContext";
import { useUserContext } from "../../../contexts/userContext";
import exportCsv from "../../../services/export-service";
import { importCsv, uploadCsv } from "../../../services/import-service";
import ImportDialog from "./ImportDialog";
import ImportFileGuide from "./ImportFileGuide";
import ImportFileTable from "./ImportFileTable";
import ProgressBackdrop from "./ProgressBackdrop";
import importValidation from "./importValidation";

type ImportAction = "replace" | "update" | "add" | "";

interface ImportData {
  tenantId: number;
  data?: any[];
  action: ImportAction;
}

const initialImportData: Omit<ImportData, "tenantId"> = {
  data: undefined,
  action: "",
};

const ImportFile = () => {
  const navigate = useNavigate();
  const { tenantId, tenantName } = useSiteContext();
  const { user } = useUserContext();
  const { setToast } = useToasterContext();
  const [file, setFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<ImportData>({
    tenantId: tenantId ?? 0,
    ...initialImportData,
  });
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  let formData = useMemo(() => new FormData(), []);
  const [view, setView] = useState(
    user && user.isAdmin ? "adminAccessNotice" : "fileGuide"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.currentTarget?.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = () => {
    setLoading(true);
    uploadCsv(formData)
      .then((res) => {
        if (file) {
          onUploadSuccess(res);
        } else {
          handleCancel();
        }
      })
      .catch((err) => {
        console.error(err.message);
        setToast({
          message:
            "File could not be uploaded. Please double check file format and schema.",
        });
        handleCancel();
      });
  };

  const onUploadSuccess = (res: any[]) => {
    setImportData((prevState) => ({
      ...prevState,
      data: res,
    }));
    setToast({
      message: "File successfully uploaded!",
    });
  };

  const handleCancel = () => {
    setImportData((prev) => ({ ...prev, data: undefined, action: "" }));
    setFile(null);
  };

  const handleImportDialog = () => {
    setDialog(!dialog);
  };

  // handler for radio change inside ImportDialog
  const handleImportActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = (e.target.value || "") as ImportAction;
    setImportData((prevState) => ({
      ...prevState,
      action,
    }));
  };

  const handleImport = () => {
    const validationCheck = importValidation(
      importData.data || [],
      STAKEHOLDER_SCHEMA as any
    );
    if (!validationCheck) {
      setToast({
        message:
          "File fields could not be validated. Please double check format, schema, and column names.",
      });
      return;
    }
    importCsv(importData)
      .then(() => {
        setToast({
          message: "File successfully imported!",
        });
        navigate("/admin/verificationadmin");
      })
      .catch((err) => {
        console.error(err.message);
        setToast({
          message:
            "File could not be imported. Please double check format, schema, and column names.",
        });
      });
    setDialog(false);
  };

  useEffect(() => {
    if (importData.data) {
      setView("fileTable");
      setLoading(false);
    } else {
      setView("fileGuide");
      setFile(null);
    }
  }, [importData]);

  useEffect(() => {
    if (!file) {
      formData.delete("file");
      setLoading(false);
    } else {
      // set will replace any previous entry
      formData.set("file", file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleDownload = async () => {
    exportCsv("template.csv");
  };

  const renderView = () => {
    switch (view) {
      case "adminAccessNotice":
        return (
          <Typography>You must have admin access to import files</Typography>
        );
      case "fileGuide":
        return (
          <ImportFileGuide
            handleChange={handleChange}
            handleUpload={handleUpload}
            handleDownload={handleDownload}
            file={file}
          />
        );
      case "fileTable":
        return (
          <ImportFileTable
            tenantName={tenantName}
            data={importData.data ?? undefined}
            handleImportAction={handleImportDialog}
            handleCancel={handleCancel}
          />
        );
      default:
        return (
          <ImportFileGuide
            handleChange={handleChange}
            handleUpload={handleUpload}
            handleDownload={handleDownload}
            file={file}
          />
        );
    }
  };

  return (
    <>
      <div>
        {renderView()}
        <ImportDialog
          tenantName={tenantName}
          open={dialog}
          importData={importData}
          title="Import stakeholder records"
          handleImportAction={handleImportActionChange}
          handleImport={handleImport}
          message={"Please confirm import action"}
        />
      </div>
      <ProgressBackdrop
        loading={loading}
        messageOnLoad="Importing file. This may take up to a minute."
      />
    </>
  );
};

export default ImportFile;
