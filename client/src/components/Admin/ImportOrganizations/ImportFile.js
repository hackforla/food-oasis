import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import { uploadCsv, importCsv } from "../../../services/import-service";
import exportCsv from "../../../services/export-service";
import ImportFileTable from "./ImportFileTable";
import ImportFileGuide from "./ImportFileGuide";
import ImportDialog from "./ImportDialog";
import { STAKEHOLDER_SCHEMA } from "../../../constants/stakeholder-schema";
import importValidation from "./importValidation";
import ProgressBackdrop from "./ProgressBackdrop";
import { useUserContext } from "../../../contexts/userContext";
import { useToasterContext } from "../../../contexts/toasterContext";
import { useSiteContext } from "../../../contexts/siteContext";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  section: {
    marginTop: theme.spacing(2),
    maxWidth: "800px",
    margin: "0 auto",
    padding: theme.spacing(4),
    borderRadius: "8px",
    boxShadow: "-.2rem 0 2rem #C7CCD1",
    "& strong": {
      color: theme.palette.error.main,
    },
    "& button": {
      marginTop: theme.spacing(2),
    },
  },
}));

const initialImportData = {
  data: null,
  action: null,
};

const ImportFile = () => {
  const history = useHistory();
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
  const classes = useStyles();
  let formData = React.useMemo(() => new FormData(), []);

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
            "File could not be uploaded. Please doublecheck file format and schema.",
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

  // closes loading backdrop, but doesn't cancel file upload/parsing
  // const handleCancelUpload = () => {
  //   setImportData((prevState) => ({
  //     ...prevState,
  //     initialImportData,
  //   }));
  //   setLoading(false);
  // };

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
          "File fields could not be validated. Please doublecheck format, schema, and column names.",
      });
      return;
    }
    importCsv(importData)
      .then(() => {
        setToast({
          message: "File successfully imported!",
        });
        history.push("/verificationadmin");
      })
      .catch((err) => {
        console.error(err.message);
        setToast({
          message:
            "File could not be imported. Please doublecheck format, schema, and column names.",
        });
      });
    setDialog(false);
  };

  useEffect(() => {
    if (importData.data) {
      history.push("/organizationimport/review");
      setLoading(false);
    } else {
      history.push("/organizationimport");
      setFile(null);
    }
  }, [importData, history]);

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

  return (
    <main className={classes.root}>
      {user && user.isAdmin ? (
        <div>
          <Route
            exact
            path="/organizationimport"
            render={() => (
              <ImportFileGuide
                handleChange={handleChange}
                handleUpload={handleUpload}
                handleDownload={handleDownload}
                file={file}
              />
            )}
          />
          <Route
            path="/organizationimport/review"
            render={() => (
              <ImportFileTable
                tenantName={tenantName}
                data={importData.data}
                handleImportAction={handleImportAction}
                handleImportDialog={handleImportDialog}
                handleCancel={handleCancel}
              />
            )}
          />
          <ImportDialog
            tenantName={tenantName}
            open={dialog}
            importData={importData}
            title="Import stakeholder records"
            handleImportAction={handleImportAction}
            handleImport={handleImport}
          />
        </div>
      ) : (
        <Typography>You must have admin access to import files</Typography>
      )}
      <ProgressBackdrop
        loading={loading}
        messageOnLoad="Importing file. This may take up to a minute."
        // handleCancelUpload={handleCancelUpload}
      />
    </main>
  );
};

export default ImportFile;
