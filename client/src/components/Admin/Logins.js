import React, { useState, useEffect, useMemo } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import { TextField } from "../UI";
import { useLogins } from "hooks/useLogins";
import debounce from "lodash.debounce";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let { data, refetch } = useLogins();

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

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (event) => {
      refetch(event.target.value.toLowerCase());
    };
    return debounce(changeHandler, 300);
  }, [refetch]);

  return (
    <Container>
      <div className={classes.heading}>
        <h2>User Logins</h2>
        <FormControl className={classes.formControl}>
          <TextField
            variant="outlined"
            margin="none"
            placeholder="Find by Email"
            size="small"
            className={classes.textInput}
            onChange={debouncedChangeHandler}
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
              {logins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((logins) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={logins.id}
                    >
                      {columns.map((column) => {
                        const value =
                          column.id === "name"
                            ? `${logins["lastName"]}, ${logins["firstName"]}`
                            : logins[column.id];
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
