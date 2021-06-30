import React from "react";
import PropTypes from "prop-types";
import {
  Input,
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
import Controls from '../../../components/UI';

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
  isRequired: {
    color: (props) => (props.required ? "red" : "green"),
  },
  instructions: {
    margin: "0 auto",
    maxWidth: "650px",
    textAlign: "left",
  },
}));

const ImportFileGuide = (props) => {
  const { handleDownload, handleChange, handleUpload } = props;
  const classes = useStyles(props);

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
          <Input type="file" onChange={handleChange} />
          <br />
          <Controls.Button 
            type='button'
            text='Submit'
            onClick={handleUpload}
          />
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
          <Controls.Button 
            type='button'
            text='Download CSV template'
            onClick={handleDownload}
          />
        </section>
        <section className={classes.section}>
          <Typography variant="h5">Schema Guide</Typography>
          <Typography>
            The schema below lists the CSV column names, meanings, and
            guidelines.
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Column name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Required?</TableCell>
                  <TableCell>Default value</TableCell>
                  <TableCell>Sample format</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {STAKEHOLDER_SCHEMA.map((field) => (
                  <TableRow key={field.name}>
                    <TableCell>{field.name}</TableCell>
                    <TableCell>{field.description}</TableCell>
                    <TableCell>{field.required}</TableCell>
                    <TableCell>{field.default_value}</TableCell>
                    <TableCell>{field.sample_format}</TableCell>
                  </TableRow>
                ))}
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
