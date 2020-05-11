import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import * as accountService from "../../services/account-service";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: "#000080",
  },
  text: {
    color: "#fff",
  },
});

export default function SecurityTable(props) {
  const classes = useStyles();

  const handleToggle = (userId, e, securityOrAdminOrDataEntry) => {
    if (securityOrAdminOrDataEntry === "security") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(
            each.id,
            "is_security_admin",
            check
          );
          await props.handlePermissionChange(
            each.id,
            "is_security_admin",
            check
          );
        }
      });
    } else if (securityOrAdminOrDataEntry === "admin") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(each.id, "is_admin", check);
          await props.handlePermissionChange(each.id, "is_admin", check);
        }
      });
    } else if (securityOrAdminOrDataEntry === "dataEntry") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(each.id, "is_data_entry", check);
          await props.handlePermissionChange(each.id, "is_data_entry", check);
        }
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.text}>Email</TableCell>
            <TableCell align="right" className={classes.text}>
              Name
            </TableCell>
            <TableCell align="right" className={classes.text}>
              Admin
            </TableCell>
            <TableCell align="right" className={classes.text}>
              Security Admin
            </TableCell>
            <TableCell align="right" className={classes.text}>
              Data Entry
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props &&
            props.accounts.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="right">
                  {row.lastName}, {row.firstName}
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={row.isAdmin}
                    onChange={(e) => handleToggle(row.id, e, "admin")}
                  />
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={row.isSecurityAdmin}
                    onChange={(e) => handleToggle(row.id, e, "security")}
                  />
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={row.isDataEntry}
                    onChange={(e) => handleToggle(row.id, e, "dataEntry")}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SecurityTable.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool.isRequired,
      isSecurityAdmin: PropTypes.bool.isRequired,
      isDataEntry: PropTypes.bool.isRequired,
    }).isRequired
  ),
  handlePermissionChange: PropTypes.func.isRequired,
};
