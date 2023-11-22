import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useUserContext } from "../../../contexts/userContext";
import * as accountService from "../../../services/account-service";

export default function SecurityTable(props) {
  const { user } = useUserContext();

  // arg `roleType` is expected to be one of:
  //   'security', 'admin, 'dataEntry', or 'coordinator'
  const handleToggle = (userId, e, roleType) => {
    if (roleType === "security") {
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
    } else if (roleType === "admin") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(each.id, "is_admin", check);
          await props.handlePermissionChange(each.id, "is_admin", check);
        }
      });
    } else if (roleType === "coordinator") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(each.id, "is_coordinator", check);
          await props.handlePermissionChange(each.id, "is_coordinator", check);
        }
      });
    } else if (roleType === "dataEntry") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(each.id, "is_data_entry", check);
          await props.handlePermissionChange(each.id, "is_data_entry", check);
        }
      });
    }
  };

  // arg `roleType` is expected to be one of:
  //   'globalAdmin' or 'globalReporting'
  const handleGlobalToggle = (userId, e, roleType) => {
    if (roleType === "globalAdmin") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setGlobalPermissions(
            each.id,
            "is_global_admin",
            check
          );
          await props.handlePermissionChange(each.id, "is_global_admin", check);
        }
      });
    } else if (roleType === "globalReporting") {
      props.accounts.map(async (each) => {
        if (userId === each.id) {
          let check = e.target.checked;
          await accountService.setPermissions(
            each.id,
            "is_global_reporting",
            check
          );
          await props.handlePermissionChange(
            each.id,
            "is_global_reporting",
            check
          );
        }
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#000080" }}>
          <TableRow>
            <TableCell sx={(theme) => ({ color: theme.palette.common.white })}>
              Email
            </TableCell>
            <TableCell
              align="right"
              sx={(theme) => ({ color: theme.palette.common.white })}
            >
              Name
            </TableCell>
            {user && user.isGlobalAdmin ? (
              <>
                <TableCell
                  align="right"
                  sx={(theme) => ({ color: theme.palette.common.white })}
                >
                  Root
                </TableCell>
                <TableCell
                  align="right"
                  sx={(theme) => ({ color: theme.palette.common.white })}
                >
                  Reports
                </TableCell>
              </>
            ) : null}
            <TableCell
              align="right"
              sx={(theme) => ({ color: theme.palette.common.white })}
            >
              Admin
            </TableCell>
            <TableCell
              align="right"
              sx={(theme) => ({ color: theme.palette.common.white })}
            >
              Coordinator
            </TableCell>
            <TableCell
              align="right"
              sx={(theme) => ({ color: theme.palette.common.white })}
            >
              Security Admin
            </TableCell>
            <TableCell
              align="right"
              sx={(theme) => ({ color: theme.palette.common.white })}
            >
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
                {user && user.isGlobalAdmin ? (
                  <>
                    <TableCell align="right">
                      <Checkbox
                        checked={row.isGlobalAdmin}
                        onChange={(e) =>
                          handleGlobalToggle(row.id, e, "globalAdmin")
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        checked={row.isGlobalReporting}
                        onChange={(e) =>
                          handleGlobalToggle(row.id, e, "globalReporting")
                        }
                      />
                    </TableCell>
                  </>
                ) : null}
                <TableCell align="right">
                  <Checkbox
                    checked={row.isAdmin}
                    onChange={(e) => handleToggle(row.id, e, "admin")}
                  />
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={row.isCoordinator}
                    onChange={(e) => handleToggle(row.id, e, "coordinator")}
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
      isAdmin: PropTypes.bool,
      isCoordinator: PropTypes.bool,
      isSecurityAdmin: PropTypes.bool,
      isDataEntry: PropTypes.bool,
    }).isRequired
  ),
  handlePermissionChange: PropTypes.func.isRequired,
};
