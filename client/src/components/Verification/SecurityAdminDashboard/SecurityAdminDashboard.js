import React, { useState } from 'react'
import SecurityFrom from './SecurityForm' 
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: "2rem",
  },
  image: {
    margin: "1rem",
  },
  sectionHeader: {
    marginTop: "3rem",
  },
  description: {
    margin: "1rem 0",
  },
});

  // data = [
  //   { email: "placeholder@yahoo.com", email: "placeholder", admin: "placeholder", securityAdmin: "placeholder" },
  //   { email: "placeholder@yahoo.com", email: "placeholder", admin: "placeholder", securityAdmin: "placeholder" },
  //   { email: "placeholder@yahoo.com", email: "placeholder", admin: "placeholder", securityAdmin: "placeholder" },
  //   { email: "placeholder@yahoo.com", email: "placeholder", admin: "placeholder", securityAdmin: "placeholder" },
  //   { email: "placeholder@yahoo.com", email: "placeholder", admin: "placeholder", securityAdmin: "placeholder" },
  // ]

function SecurityAdminDashboard() {

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4">Security Roles</Typography>
      <Typography variant="h6">Grant or Revoke Admin Permissions</Typography>
      <TextField
        variant="outlined"
        margin="none"
        placeholder="Find"
        size="small"
      />
      <SecurityFrom />
    </Container>
  )
}

export default SecurityAdminDashboard
