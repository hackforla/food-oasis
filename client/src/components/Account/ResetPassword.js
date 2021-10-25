import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import {
  Avatar,
  Container,
  CssBaseline,
  Link,
  Grid,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Footer from "../Layout/Footer";
import { Input, Button } from '../../components/UI';

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

const validationSchema = Yup.object().shape({
  token: Yup.string().required("Token is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

const ResetPassword = (props) => {
  const { classes, setToast, history, match } = props;

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Formik
            initialValues={{
              token: match.params.token,
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, formikBag) => {
              try {
                const response = await accountService.resetPassword(
                  values.token,
                  values.password
                );
                if (response.isSuccess) {
                  setToast({
                    message: "Password has been reset. Please use it to login.",
                  });
                  history.push(`/login/${response.email}`);
                } else if (
                  response.code === "RESET_PASSWORD_TOKEN_INVALID" ||
                  response.code === "RESET_PASSWORD_TOKEN_EXPIRED"
                ) {
                  console.log(
                    "The reset token is invalid or has expired. Use the forgot password link to try again."
                  );
                  formikBag.setSubmitting(false);
                } else {
                  // RESET_PASSWORD_FAILED  with unexpected error
                  setToast({
                    message: `${response.message}`,
                  });
                  formikBag.setSubmitting(false);
                }
              } catch (err) {
                setToast({
                  message: `Password reset failed. ${err.message}`,
                });
                console.log(err);
                formikBag.setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                className={classes.form}
                noValidate
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(evt);
                }}
              >
                <Input
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                />
                <Input
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="passwordConfirm"
                  label="Password"
                  type="password"
                  id="passwordConfirm"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.passwordConfirm ? errors.passwordConfirm : ""
                  }
                  error={
                    touched.passwordConfirm && Boolean(errors.passwordConfirm)
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Reset Password
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgotpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(ResetPassword));
