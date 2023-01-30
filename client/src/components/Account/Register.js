import React from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import { withFormik } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import { PrimaryButton } from "../UI/StandardButton";
import {
  Avatar,
  CssBaseline,
  Link,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useToasterContext } from "contexts/toasterContext";
import PasswordInput from "components/UI/PasswordInput";

const styles = (theme) => ({
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
  body: {
    display: "flex",
    height: "97.8%",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
});

// Core component is the Material UI form itself
const form = (props) => {
  const {
    classes,
    dirty,
    values,
    touched,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs" className={classes.container}>
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
                <PasswordInput
                  required
                  fullWidth
                  name="password"
                  label="Password"
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
                <PasswordInput
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Re-type Password"
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
            <PrimaryButton
              type="submit"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              disabled={isSubmitting || !(isValid && dirty)}
            >
              Register
            </PrimaryButton>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

// Register component is higher-order component that
// provides validation and server interaction.
const RegisterForm = withFormik({
  mapPropsToValues: ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  }) => {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      passwordConfirm: passwordConfirm || "",
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
      .oneOf([Yup.ref("password")], "Password does not match"),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    const { firstName, lastName, email, password, passwordConfirm } = values;
    setTimeout(() => {
      accountService
        .register(firstName, lastName, email, password, passwordConfirm)
        .then((result) => {
          setSubmitting(false);
          if (result.isSuccess) {
            props.setToast({
              message: `Registration successful. Please check your email for a confirmation link.`,
            });
            props.history.push("/");
          } else if (result.code === "REG_DUPLICATE_EMAIL") {
            props.setToast({
              message: `The email ${email} is already registered.
              Please login or use the Forgot Password feature if you have
              forgotten your password.`,
            });
          } else {
            props.setToast({
              message: `An error occurred in sending the
              confirmation message to ${email}.
              Try to log in, and follow the instructions for re-sending the
              confirmation email.`,
            });
          }
        })
        .catch((err) => {
          setSubmitting(false);
          props.setToast({
            message: `Registration failed. ${err.message || ""}`,
          });
          console.error(err);
        });
    }, 1000);
  },
})(form);

const WrappedRegisterForm = withStyles(styles)(withRouter(RegisterForm));

export default function Register() {
  const { setToast } = useToasterContext();
  return <WrappedRegisterForm setToast={setToast} />;
}
