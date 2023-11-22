import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const initialImportData = {
  data: null,
  action: null,
};

const ImportFile = () => {
  const navigate = useNavigate();
  const { tenantId, tenantName } = useSiteContext();
  const { user } = useUserContext();
  const { setToast } = useToasterContext();
  const [file, setFile] = useState(null);
  const [importData, setImportData] = useState({
    ...initialImportData,
    tenantId,
  });
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  let formData = React.useMemo(() => new FormData(), []);
  const [view, setView] = useState(
    user && user.isAdmin ? "adminAccessNotice" : "fileGuide"
  );

  const handleChange = (e) => {
    const uploadedFile = e.currentTarget.files[0];
    setFile(uploadedFile);
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

  const onUploadSuccess = (res) => {
    setImportData((prevState) => ({
      ...prevState,
      data: res,
    }));
    setToast({
      message: "File successfully uploaded!",
    });
  };

  const handleCancel = () => {
    setImportData(initialImportData);
    setFile(null);
  };

  const handleImportDialog = () => {
    setDialog(!dialog);
  };

  const handleImportAction = (e) => {
    const action = e.target.value;
    if (!action) {
      setDialog(!dialog);
      setImportData((prevState) => ({
        ...prevState,
        action: null,
      }));
    } else {
      setImportData((prevState) => ({
        ...prevState,
        action,
      }));
    }
  };

  const handleImport = () => {
    const validationCheck = importValidation(
      importData.data,
      STAKEHOLDER_SCHEMA
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
        navigate("/verificationadmin");
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
      formData.append("file", null);
      setLoading(false);
    } else {
      formData.append("file", file);
    }
  }, [file, formData]);

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
            data={importData.data}
            handleImportAction={handleImportAction}
            handleImportDialog={handleImportDialog}
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
          handleImportAction={handleImportAction}
          handleImport={handleImport}
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
