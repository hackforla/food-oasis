import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Input,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import { STAKEHOLDER_SCHEMA } from "../../../constants/stakeholder-schema";
import { Button } from "../../../components/UI";

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
      minWidth: "200px",
    },
  },
  tableCell: {},
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  instructions: {
    margin: "0 auto",
    maxWidth: "650px",
    textAlign: "left",
  },
  formControl: {
    display: "block",
    marginLeft: "auto",
    paddingRight: "0",
    width: "100px",
  },
}));

const ImportFileGuide = (props) => {
  const { handleDownload, handleChange, handleUpload, file } = props;
  const [visibleFields, setVisibleFields] = useState("all");
  const ref = useRef(null);
  const classes = useStyles(props);

  const handleVisibleFields = (e) => {
    const { value } = e.target;
    setVisibleFields(value);
  };

  useEffect(() => {
    if (!file) ref.current.value = "";
  }, [file]);

  return (
    <main className={classes.root}>
      <div>
        <section className={classes.section}>
          <Typography variant="h5">CSV Import</Typography>
          <Typography>
            <strong>Warning: this feature is still being tested. </strong>
          </Typography>
          <ul className={classes.instructions}>
            <li>
              You will have a chance to review your data before importing.
            </li>
            <li>
              Refer to the formatting guides below. Do not change any column
              names.
            </li>
          </ul>
          <br />
          <Input type="file" onChange={handleChange} inputRef={ref} />
          <br />
          <Button type="button" onClick={handleUpload}>
            Submit
          </Button>
        </section>
        <section className={classes.section}>
          <Typography variant="h5">CSV Template</Typography>
          <ul className={classes.instructions}>
            <li>
              Download a CSV template to ensure proper formatting and column
              names.
            </li>
            <li>Do not change column names or order.</li>
          </ul>
          <Button type="button" onClick={handleDownload}>
            Download CSV template
          </Button>
        </section>
        <section className={classes.section}>
          <Typography variant="h5">Schema Guide</Typography>
          <Typography>
            The schema below lists the CSV column names, meanings, and
            guidelines.
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              defaultValue="all"
              onChange={handleVisibleFields}
              style={{ width: "100%" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="required">Required</MenuItem>
            </Select>
            <FormHelperText>Show columns</FormHelperText>
          </FormControl>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Column name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Default value</TableCell>
                  <TableCell>Sample format</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {STAKEHOLDER_SCHEMA.map(
                  (field) =>
                    field.show &&
                    (visibleFields === "all" ? (
                      <TableRow key={field.name} className={classes.tableRow}>
                        <TableCell
                          style={{ fontWeight: field.required && 900 }}
                        >
                          {`${field.name} ${
                            field.required ? "(required)" : ""
                          }`}
                        </TableCell>
                        <TableCell>{field.description}</TableCell>
                        <TableCell
                          style={{ fontWeight: field.required && 900 }}
                        >
                          {field.default_value}
                        </TableCell>
                        <TableCell>{field.sample_format}</TableCell>
                      </TableRow>
                    ) : (
                      visibleFields === "required" &&
                      field.required && (
                        <TableRow key={field.name} className={classes.tableRow}>
                          <TableCell style={{ fontWeight: 900 }}>
                            {`${field.name} ${
                              field.required ? "(required)" : ""
                            }`}
                          </TableCell>
                          <TableCell>{field.description}</TableCell>
                          <TableCell style={{ fontWeight: 900 }}>
                            {field.default_value}
                          </TableCell>
                          <TableCell>{field.sample_format}</TableCell>
                        </TableRow>
                      )
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>
    </main>
  );
};

ImportFileGuide.propTypes = {
  handleDownload: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default ImportFileGuide;
