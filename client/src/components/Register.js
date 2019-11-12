import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { withFormik } from "formik";
import * as Yup from "yup";
import * as accountService from "../services/account-service";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

// Core component is the Material UI form itself
const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  return (
    <Container component="main" maxWidth="xs" className="classes.container">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lastName ? errors.lastName : ""}
                error={touched.lastName && Boolean(errors.lastName)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Re-type Password"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

// Register component is higher-order component that
// provides validation and server interaction.
const Register = withFormik({
  mapPropsToValues: ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm
  }) => {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      passwordConfirm: passwordConfirm || ""
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
    passwordConfirm: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match")
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    const { firstName, lastName, email, password, passwordConfirm } = values;
    setTimeout(() => {
      accountService
        .register(firstName, lastName, email, password, passwordConfirm)
        .then(result => {
          setSubmitting(false);
          if (result.success) {
            props.setToast({
              message: `Registration successful. Please check your email for a confirmation link.`
            });
            props.history.push("/stakeholders");
          } else if (result.code === "REG_DUPLICATE_EMAIL") {
            props.setToast({
              message: `The email ${email} is already registered. 
              Please login or use the Forgot Password feature if you have 
              forgotten your password.`
            });
          } else {
            props.setToast({
              message: `An error occurred in sending the 
              confirmation message to ${email}. 
              Try to log in, and follow the instructions for re-sending the 
              confirmation email.`
            });
          }
        })
        .catch(err => {
          setSubmitting(false);
          props.setToast({
            message: `Registration failed. ${err.message || ""}`
          });
          console.log(err);
        });
    }, 1000);
  }
})(form);

export default withStyles(styles)(withRouter(Register));
