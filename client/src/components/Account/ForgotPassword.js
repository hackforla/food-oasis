import React from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import { Button } from "@mui/material";
import {
  Avatar,
  Container,
  Link,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useToasterContext } from "../../contexts/toasterContext";
import debounce from "lodash.debounce";

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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});

const ForgotPassword = (props) => {
  const { classes, history, match } = props;
  const { setToast } = useToasterContext();

  const debouncedEmailValidation = debounce(async (value, setFieldError) => {
    try {
      await accountService.getByEmail(value);
      return;
    } catch (e) {
      console.error(e);
      setFieldError(
        "email",
        "Account not found. If you want to create a new account with this email, please register."
      );
    }
  }, 500);

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Formik
            initialValues={{
              email: match.params.email || "",
            }}
            validationSchema={validationSchema}
            validateOnMount={true}
            validateOnBlur={false}
            onSubmit={async (values, formikBag) => {
              try {
                const response = await accountService.forgotPassword(
                  values.email
                );
                if (response.isSuccess) {
                  history.push(`/resetpasswordemailsent/${values.email || ""}`);
                } else if (
                  response.code === "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND"
                ) {
                  const msg =
                    "Account not found. If you want to create a new account with this email, please register.";
                  console.error(msg);
                  setToast({
                    message: msg,
                  });
                  formikBag.setSubmitting(false);
                } else if (response.code === "FORGOT_PASSWORD_EMAIL_FAILED") {
                  const msg =
                    "A problem occurred with sending an email to this address.";
                  console.error(msg);
                  setToast({
                    message: msg,
                  });
                  formikBag.setSubmitting(false);
                } else {
                  console.error(response.message);
                  setToast({
                    message: response.message,
                  });
                  formikBag.setSubmitting(false);
                }
              } catch (err) {
                setToast({
                  message: `Server error. ${err.message}`,
                });
                console.error(err);
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
              setFieldError,
              isValid,
              /* and other goodies */
            }) => {
              const handleEmailChange = (e) => {
                handleChange(e);
                debouncedEmailValidation(e.target.value, setFieldError);
              };
              return (
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit(evt);
                  }}
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
                    value={values.email}
                    onChange={handleEmailChange}
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                  />
                  <div sx={{ mt: 2, mb: 2 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={isSubmitting || !isValid}
                    >
                      Send Password Reset Link
                    </Button>
                  </div>
                  <Grid container>
                    <Grid item xs>
                      <Typography align="center">
                        <Link
                          href={`/login/${values.email || ""}`}
                          variant="body2"
                        >
                          Return to Login
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default withStyles(styles)(withRouter(ForgotPassword));
