import React, { useState, useEffect } from "react";
import Footer from "../Layout/Footer";
import { Redirect, withRouter } from "react-router-dom";
import {
  withStyles,
  Avatar,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import * as accountService from "../../services/account-service";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { Button, Input } from "../../components/UI";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
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

const ConfirmEmail = (props) => {
  const { classes } = props;
  const [confirmResult, setConfirmResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const token = props.match.params.token;
  const setToast = props.setToast;

  useEffect(() => {
    const confirmEmail = async (tok) => {
      const result = await accountService.confirmRegister(tok);
      setConfirmResult(result);
      if (result.success) {
        // notification?
        setToast({ message: `Your email has been confirmed. Please log in.` });
      }
    };
    if (token) {
      confirmEmail(token);
    }
  }, [token, setToast]);

  const resendConfirmationEmail = async (evt) => {
    evt.preventDefault();
    await accountService.resendConfirmationEmail(email);
    setEmailSent(true);
  };

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EmailOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Confirm Email
          </Typography>
          {!confirmResult ? (
            <div>&ldquo;Confirming Email...&ldquo;</div>
          ) : confirmResult.success ? (
            <Redirect to={"/login"} />
          ) : emailSent ? (
            <p>
              {`A confirmation email has been sent to ${email}. Please find this
            email and click on the link provided to complete your email confirmation.`}
            </p>
          ) : (
            <div>
              <p>
                The confirmation request was not found, or has expired. Please
                enter your email here and press the button to re-send the
                registration confirmation email.
              </p>
              <form onSubmit={resendConfirmationEmail}>
                <Input
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  label="Enter the email for your account"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(evt) => {
                    setEmail(evt.target.value);
                  }}
                />
                <Button type="submit" fullWidth className={classes.submit}>
                  Re-send confirmation email
                </Button>
              </form>
            </div>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(ConfirmEmail));
