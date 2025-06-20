import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Label from "components/Admin/ui/Label";
import { Formik } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as accountService from "services/account-service";
import { palette } from "theme/palette";
import * as Yup from "yup";
import PasswordInput from "../UI/PasswordInput";
import { useToasterContext } from "../../contexts/toasterContext";
import { useUserContext } from "../../contexts/userContext";
import * as analytics from "../../services/analytics";
import { PageWrapper } from "./PageWrapper";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
});

const LoginForm = () => {
  const { onLogin } = useUserContext();
  const { setToast } = useToasterContext();
  // state is the previous pathname if the user has been redirected here from a PrivateRoute.
  const { state } = useLocation();
  const navigate = useNavigate();
  const { email } = useParams();

  useEffect(() => {
    if (state?.message) {
      setToast({
        message: state.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {state?.isPasswordReset && (
          <Typography component="p">
            Password has been successfully updated
          </Typography>
        )}
        <Avatar
          sx={{
            margin: "8px",
            backgroundColor: palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          validateOnBlur={false}
          initialValues={{
            email: email || "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, formikBag) => {
            setTimeout(async () => {
              try {
                const response = await accountService.login(
                  values.email,
                  values.password
                );
                if (response.isSuccess) {
                  analytics.identify(response.user.id);
                  onLogin(response.user);
                  setToast({
                    message: "Login successful.",
                  });
                  if (state?.from) {
                    navigate(state.from);
                  } else if (
                    response.user.isAdmin ||
                    response.user.isCoordinator
                  ) {
                    navigate("/admin/verificationAdmin");
                  } else if (response.user.isSecurityAdmin) {
                    navigate("/admin/securityadmindashboard");
                  } else if (response.user.isDataEntry) {
                    navigate("/admin/verificationdashboard");
                  } else {
                    navigate("/");
                  }
                } else if (response.code === "AUTH_NOT_CONFIRMED") {
                  try {
                    await accountService.resendConfirmationEmail(values.email);
                    setToast({
                      message: `Your email has not been confirmed.
                      Please look through your email for a Registration
                      Confirmation link and use it to confirm that you
                      own this email address.`,
                    });
                    formikBag.setSubmitting(false);
                  } catch (err) {
                    setToast({
                      message: `An internal error occurred in sending
                    an email to ${values.email}`,
                    });
                    formikBag.setSubmitting(false);
                  }
                } else if (response.code === "AUTH_NO_ACCOUNT") {
                  console.error("Account not found!!");
                  setToast({
                    message: `The email ${values.email} does not correspond to an
                    existing account. Please verify the email or register as a
                    new account.`,
                  });
                  formikBag.setSubmitting(false);
                } else {
                  // Presumably response.code === "AUTH_INCORRECT_PASSWORD"
                  setToast({
                    message: `The password is incorrect, please check it
                  and try again or use the Forgot Password feature.`,
                  });
                  formikBag.setSubmitting(false);
                }
                return true;
              } catch (err) {
                setToast({
                  message: "Server error. Please contact support.",
                });
                console.error(err);
                formikBag.setSubmitting(false);
              }
            }, 400);
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
            dirty,
            isValid,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid
                sx={{
                  width: "100%", // Fix IE 11 issue.
                  marginTop: "8px",
                }}
                container
                spacing={2}
              >
                <Grid item xs={12}>
                  <Label id="email" label="Email *" />
                  <TextField
                    autoComplete="email"
                    autoFocus
                    error={touched.email && Boolean(errors.email)}
                    fullWidth
                    helperText={touched.email ? errors.email : ""}
                    id="email"
                    placeholder="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Label id="password" label="Password" />
                  <PasswordInput
                    autoComplete="current-password"
                    error={touched.password && Boolean(errors.password)}
                    fullWidth
                    helperText={touched.password ? errors.password : ""}
                    id="password"
                    placeholder="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !(isValid && dirty)}
                      fullWidth
                    >
                      Sign In
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Link
                    href={`/admin/forgotpassword/${values.email || ""}`}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/admin/register" variant="body2">
                    Register
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </PageWrapper>
  );
};

export default LoginForm;
