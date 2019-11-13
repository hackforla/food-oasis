import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as accountService from "../services/account-service";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography
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

const LoginForm = props => {
  const { classes, setToast, setUser, history, match } = props;
  const [submitting, setSubmitting] = useState(false);

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: match.params.email || "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required")
    }),
    onSubmit: values => {
      setSubmitting(true);
      accountService
        .login(values.email, values.password)
        .then(result => {
          setUser(result.user);
          setSubmitting(false);
        })
        .then(() => {
          setToast({
            message: "Login successful."
          });
          history.push("/stakeholders");
        })
        .catch(err => {
          setToast({
            message:
              "Login failed. Please check your email and password and try again."
          });
          console.log(err);
          setSubmitting(false);
        });
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email ? formik.errors.email : ""}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password ? formik.errors.password : ""}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitting}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

// const Login = withFormik({
//   mapPropsToValues: ({ email, password, match }) => {
//     const values = {
//       email: email || match.params.email || "",
//       password: password || ""
//     };
//     return values;
//   },
//   enableReinitialize: true,
//   validationSchema: Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address format")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(8, "Password must be 8 characters at minimum")
//       .required("Password is required")
//   }),

//   handleSubmit: (values, { setSubmitting, props }) => {
//     setTimeout(() => {
//       // submit to the server
//       accountService
//         .login(values.email, values.password)
//         .then(result => {
//           props.setUser(result.user);
//         })
//         .then(() => {
//           props.setToast({
//             message: "Login successful."
//           });
//           props.history.push("/stakeholders");
//         })
//         .catch(err => {
//           props.setToast({
//             message:
//               "Login failed. Please check your email and password and try again."
//           });
//           console.log(err);
//           setSubmitting(false);
//         });
//     }, 1000);
//   }
// })(LoginForm);

export default withStyles(styles)(withRouter(LoginForm));
