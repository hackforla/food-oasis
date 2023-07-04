import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { palette } from "theme/palette";


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
    <Container component="main" maxWidth="xs"
    sx={{
      display: "flex",
      height: "97.8%",
      flexDirection: "column",
    }}
    >
        <CssBaseline />
        <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
          <Avatar
          sx={{
            margin: "8px",
            backgroundColor: palette.secondary.main,
          }}
          >
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
                noValidate
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(evt);
                }}
              >
                <Box
                sx={{
                  width: "100%", // Fix IE 11 issue.
                  marginTop: "8px"
                }}
                >
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
                </Box>
                <Box>
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
                </Box>
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
        </Box>
      </Container>
  );
};

export default ResetPassword;
