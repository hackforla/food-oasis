import React, { useState } from 'react';
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
  const [adminCheck, setAdminCheck] = useState(false)
  // const [securityAdminCheck, setSecurityAdminCheck] = useState()
  const classes = useStyles();

  const toggleAdmin = (e) => {
    // setAdminCheck(!adminCheck)
    setAdminCheck(e.target.checked)
    console.log("admin checkbox check hittin")
  }

  // const securityAdminChecked = (e) => {
  //   console.log(e.target.checked)
  //   setSecurityAdminCheck(e.target.value)
  //   console.log("Security admin checkbox check hittin")
  // }

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
                  // onChange={toggleAdmin}
                  onChange={(e) => {
                    let checked = e.target.checked
                    let result = props?.accounts?.map((elem, i) => {
                      if(elem.id === row.id) {
                        setAdminCheck(!checked)
                      }
                    })
                    return result
                  }}
                  checked={adminCheck}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  // onChange={securityAdminChecked}
                  // checked={securityAdminCheck}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}