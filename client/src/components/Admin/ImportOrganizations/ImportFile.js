import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import { uploadCsv, importCsv } from "../../../services/import-service";
import exportCsv from "../../../services/export-service";
import ImportFileTable from "./ImportFileTable";
import ImportFileGuide from "./ImportFileGuide";

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

const ImportFile = (props) => {
  const { user, history, setToast } = props;
  const [file, setFile] = useState(null);
  const [importData, setImportData] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    const uploadedFile = e.currentTarget.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append("file", file);
    uploadCsv(formData)
      .then((res) => {
        setImportData(res);
      })
      .catch((err) => console.error(err.message));
  };

  const handleImport = () => {
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
            "File could not be imported. Please doublecheck file format and schema.",
        });
      });
  };

  const handleCancel = () => setImportData(null);

  useEffect(() => {
    if (importData) {
      history.push("/organizationimport/review");
    } else {
      history.push("/organizationimport");
    }
    setFile(null);
  }, [importData, history]);

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
              />
            )}
          />
          <Route
            path="/organizationimport/review"
            render={() => (
              <ImportFileTable
                importData={importData}
                setImportData={setImportData}
                handleImport={handleImport}
                handleCancel={handleCancel}
              />
            )}
          />
        </div>
      ) : (
        <Typography>You must have admin access to import files</Typography>
      )}
    </main>
  );
};

ImportFile.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  setToast: PropTypes.func.isRequired,
};

export default withRouter(ImportFile);
