import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
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
import { Button } from '../../../components/UI';

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
  const { data, handleImportAction, handleCancel, resetData} = props;
  const classes = useStyles();

  useEffect(() => {
    return () => {
      resetData();
    }
  }, [resetData],);

  return (
    <section className={classes.section}>
      <div className={classes.tableBanner}>
        <Typography variant="h5">Import Stakeholders</Typography>
        <Typography>
          Review your import below and click "Import" when you're ready to
          update your records.
        </Typography>
        <Button 
          type='button'
          text='Cancel'
          onClick={handleCancel}
        />
        <Button 
          type='button'
          text='Import'
          onClick={handleImportAction}
        />
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
            {data &&
              data.map((d) => (
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
  data: PropTypes.arrayOf(PropTypes.object),
  handleImportAction: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ImportFileTable;
