import React, { useState, useEffect, useMemo } from "react";
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import { useLogins } from "hooks/useLogins";
import debounce from "lodash.debounce";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 10 },
  { id: "loginTime", label: "Login Time", minWidth: 10 },
];

const Logins = () => {
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
	    <Box
          sx={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
        <Typography variant="h2"
		  sx={{
			marginTop: "4px",
			fontWeight: 700,
		  }}
		>User Logins</Typography>
        <FormControl 
          sx={{
            margin: "8px",
            minWidth: 180,
          }}
        >
          <TextField
            variant="outlined"
            margin="none"
            placeholder="Find by Email"
            size="small"
            onChange={debouncedChangeHandler}
          />
        </FormControl>
      </Box>

      <Paper>
        <TableContainer 
          sx={{
            maxHeight: "500px",
          }}
        >
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
