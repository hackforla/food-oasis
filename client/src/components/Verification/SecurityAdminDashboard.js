import React, { useState } from 'react'
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


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

function SecurityAdminDashboard() {

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h4">Security Roles</Typography>
    </Container>
  )
}

export default SecurityAdminDashboard
