import React from "react";
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
  Box
} from "@mui/material";
import { STAKEHOLDER_SCHEMA } from "../../../constants/stakeholder-schema";

const flattenHours = (daysArray) => {
  if (!daysArray || !daysArray.length) return [];
  return daysArray.map((day) => {
    return `(${day.weekOfMonth},${day.dayOfWeek},${day.open},${day.close})`;
  });
};

const ImportFileTable = (props) => {
  const { tenantName, data, handleImportAction, handleCancel } = props;

  return (
    <Box
    sx={(theme) => ({
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
    }
  })
    }
    >
      <Box
      sx={{
        display: "flex"
      }}
      >
        <Typography variant="h5">
          Import Stakeholders ({tenantName} region)
        </Typography>
        <Typography>
          Review your import below and click "Import" when you're ready to
          update your records.
        </Typography>
        <Button variant="outlined" type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="button" onClick={handleImportAction}>
          Import
        </Button>
      </Box>
      <TableContainer
      sx={{
        overflowX: "auto"
      }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {STAKEHOLDER_SCHEMA.map(
                (field) =>
                  field.show && (
                    <TableCell key={field.name}>{field.label}</TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((d) => (
                <TableRow key={d.name}>
                  {STAKEHOLDER_SCHEMA.map(
                    (field, index) =>
                      field.show &&
                      (field.name === "hours" ? (
                        <TableCell key={field.name}>
                          {flattenHours(d[field.name])}
                        </TableCell>
                      ) : (
                        <TableCell key={field.name}>{d[field.name]}</TableCell>
                      ))
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

ImportFileTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  handleImportAction: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ImportFileTable;
