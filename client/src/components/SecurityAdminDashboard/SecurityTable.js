import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: "#000080"
  },
  text: {
    color: "#fff"
  }
});

export default function SecurityTable(props) {
  const classes = useStyles();

  const adminCheck = (e) => {
    console.log("admin checkbox check hittin")
  }

  const securityAdminCheck = (e) => {
    console.log("Security admin checkbox check hittin")
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.text}>Email</TableCell>
            <TableCell align="right" className={classes.text}>Name</TableCell>
            <TableCell align="right" className={classes.text}>Admin</TableCell>
            <TableCell align="right" className={classes.text}>Security Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.accounts?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">
                {row.lastName}, {row.firstName}
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  onChange={adminCheck}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  onChange={securityAdminCheck}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}