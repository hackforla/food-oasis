import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { Avatar, Container, CssBaseline, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Footer from "../Layout/Footer";
import { Button } from "../../components/UI";

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  header: {
    width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  body: {
    display: "flex",
    height: "97.8%",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
});

const ResetPasswordEmailSent = (props) => {
  const { classes, history, match } = props;

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="s" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            className={classes.header}
            align="center"
          >
            Password Reset Link was Sent
          </Typography>
          <Typography component="p" align="center">
            A password reset link was sent to {match.params.email}.<br /> If you
            don’t see it in your inbox, please check your junk/spam folder.
          </Typography>
          <Container maxWidth="xs">
            <Button
              fullWidth
              className={classes.button}
              onClick={() => history.push("/login")}
            >
              Back to login
            </Button>
          </Container>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(ResetPasswordEmailSent));
