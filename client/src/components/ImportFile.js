import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, FormControl, Input, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import importCsv from "../services/import-service";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  form: {
    margin: "2rem",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "-.25rem 0 2rem #C7CCD1",
  },
}));

const ImportFile = ({ user }) => {
  const [file, setFile] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    const uploadedFile = e.currentTarget.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file);
    importCsv(formData)
      .then((res) => {
        console.log(res);
        setFile(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className={classes.root}>
      {user && user.isAdmin ? (
        <FormControl className={classes.form}>
          <Typography>
            Perform import only with an empty database; otherwise, duplicate
            records may be created.
          </Typography>
          <Typography>
            CSV must follow a specific format and default column names may not
            be changed.
          </Typography>
          <br />
          <Input type="file" onChange={handleChange} />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      ) : (
        <Typography>You must have "admin" access to import files</Typography>
      )}
    </main>
  );
};

ImportFile.propTypes = {
  user: PropTypes.object,
};

export default ImportFile;
