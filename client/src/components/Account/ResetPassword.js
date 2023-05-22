import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import { Button } from "@mui/material";
import { Avatar, Box, Container, CssBaseline, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useToasterContext } from "../../contexts/toasterContext";
import PasswordInput from "../UI/PasswordInput";
import {
  PASSWORD_VALIDATION_ERROR,
  PASSWORD_VALIDATION_REGEX,
} from "helpers/Constants";
import Label from "components/Admin/ui/Label";

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
  token: Yup.string().required("Token is required"),
  password: Yup.string()
    .matches(PASSWORD_VALIDATION_REGEX, PASSWORD_VALIDATION_ERROR)
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

const ResetPassword = (props) => {
  const { classes} = props;
  const { setToast } = useToasterContext();
  const navigate = useNavigate();
  const { token } = useParams();

  return (
    <div className={classes.body}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Formik
            initialValues={{
              token: token,
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
                  navigate({
                    pathname: `/login/${response.email}`,
                    state: {
                      isPasswordReset: true,
                    },
                  });
                } else if (
                  response.code === "RESET_PASSWORD_TOKEN_INVALID" ||
                  response.code === "RESET_PASSWORD_TOKEN_EXPIRED"
                ) {
                  console.error(
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
              isValid,
              dirty,
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
                <div>
                  <Label id="password" label="New Password" />
                  <PasswordInput
                    fullWidth
                    name="password"
                    placeholder="New Password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    sx={{ mt: 2, mb: 2 }}
                  />
                </div>
                <div>
                  <Label id="passwordConfirm" label="Confirm Password" />
                  <PasswordInput
                    fullWidth
                    name="passwordConfirm"
                    placeholder="Confirm Password"
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
                    sx={{ mt: 2, mb: 2 }}
                  />
                </div>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting || !(isValid && dirty)}
                    fullWidth
                  >
                    Reset Password
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default withStyles(styles)(ResetPassword);
