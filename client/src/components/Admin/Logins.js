import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import { TextField } from "../UI";
import { useLogins } from "hooks/useLogins";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 10 },
  { id: "loginTime", label: "Login Time", minWidth: 10 },
];

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: "500px",
  },
  heading: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

const Logins = () => {
  const classes = useStyles();
  const [logins, setLogins] = useState([]);
  const [filteredLogins, setFilteredLogins] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");
  let { data } = useLogins();

  useEffect(() => {
    if (data) {
      setLogins(data);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (search.length === 0) {
      setFilteredLogins(logins);
    } else {
      const result = logins.filter((login) => {
        return (
          login.firstName.toLowerCase().includes(search) ||
          login.lastName.toLowerCase().includes(search) ||
          login.email.toLowerCase().includes(search) ||
          login.loginTime.toLowerCase().includes(search)
        );
      });
      setFilteredLogins(result);
    }
  }, [search, logins]);

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <Container>
      <div className={classes.heading}>
        <h2>User Logins</h2>
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            margin="none"
            placeholder="Find"
            size="small"
            className={classes.textInput}
            onChange={handleChange}
            value={search}
          />
        </FormControl>
      </div>

      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((filteredLogins) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={filteredLogins.id}
                    >
                      {columns.map((column) => {
                        const value =
                          column.id === "name"
                            ? `${filteredLogins["lastName"]}, ${filteredLogins["firstName"]}`
                            : filteredLogins[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={logins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Logins;
