import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
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

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  section: {
    marginTop: theme.spacing(2),
    margin: "0 auto",
    padding: theme.spacing(4),
    borderRadius: "8px",
    boxShadow: "-.2rem 0 2rem #C7CCD1",
    "& strong": {
      color: theme.palette.error.main,
    },
    "& button": {
      margin: theme.spacing(2),
    },
    tableBanner: {
      display: "flex",
    },
    tableContainer: {
      overflowX: "auto",
    },
  },
}));

const ImportFileTable = (props) => {
  const { importData, setImportData, handleImport, handleCancel } = props;
  const classes = useStyles();

  useEffect(() => {
    return () => {
      setImportData(null);
    };
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes.tableBanner}>
        <Typography variant="h5">Import Stakeholders</Typography>
        <Typography>
          Review your import below and click "Submit" when you're ready to
          update your records.
        </Typography>
        <Button variant="contained" onClick={handleImport}>
          Submit
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {STAKEHOLDER_SCHEMA.map((field) => (
                <TableCell key={field.name}>{field.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {importData &&
              importData.map((d) => (
                <TableRow key={d.name}>
                  {STAKEHOLDER_SCHEMA.map((field) => (
                    <TableCell key={field.name}>{d[field.name]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

ImportFileTable.propTypes = {
  importData: PropTypes.arrayOf(PropTypes.object),
  setImportData: PropTypes.func.isRequired,
  handleImport: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ImportFileTable;
