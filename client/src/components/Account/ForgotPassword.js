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
import debounce from "lodash.debounce";
import { useNavigate, useParams } from "react-router-dom";
import { palette } from "theme/palette";
import * as Yup from "yup";
import { useToasterContext } from "../../contexts/toasterContext";
import * as accountService from "../../services/account-service";
import { PageWrapper } from "./PageWrapper";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});

const ForgotPassword = (props) => {
  const { setToast } = useToasterContext();
  const { email } = useParams();
  const navigate = useNavigate();

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
    <PageWrapper>
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
          Forgot Password
        </Typography>
        <Formik
          validateOnBlur={false}
          initialValues={{
            email: email || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, formikBag) => {
            try {
              const response = await accountService.forgotPassword(
                values.email
              );
              if (response.isSuccess) {
                navigate(`/admin/resetpasswordemailsent/${values.email || ""}`);
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
          }) => {
            const handleEmailChange = (e) => {
              handleChange(e);
              debouncedEmailValidation(e.target.value, setFieldError);
            };
            return (
              <form
                noValidate
                onSubmit={(evt) => {
                  evt.preventDefault();
                  handleSubmit(evt);
                }}
              >
                <Grid
                  sx={{
                    width: "100%", // Fix IE 11 issue.
                    marginTop: "8px",
                  }}
                  container
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Label id="email" label="Email" />
                    <TextField
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      variant="outlined"
                      //margin="normal"
                      fullWidth
                      autoComplete="email"
                      autoFocus
                      value={values.email}
                      onChange={handleEmailChange}
                      onBlur={handleBlur}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={isSubmitting || !isValid}
                    >
                      Send Password Reset Link
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">
                      <Link
                        href={`/admin/login/${values.email || ""}`}
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
      </Box>
    </PageWrapper>
  );
};

export default ForgotPassword;
