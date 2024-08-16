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
import PasswordInput from "components/UI/PasswordInput";
import { useToasterContext } from "contexts/toasterContext";
import { withFormik } from "formik";
import {
  PASSWORD_VALIDATION_ERROR,
  PASSWORD_VALIDATION_REGEX,
} from "helpers/Constants";
import { useNavigate } from "react-router-dom";
import { palette } from "theme/palette";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import { PageWrapper } from "./PageWrapper";

// Core component is the Material UI form itself
const form = (props) => {
  const {
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
          Register
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid
            sx={{
              width: "100%", // Fix IE 11 issue.
              marginTop: "8px",
            }}
            container
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              <Label id="firstName" label="First Name *" />
              <TextField
                autoComplete="fname"
                autoFocus
                error={touched.firstName && Boolean(errors.firstName)}
                fullWidth
                helperText={touched.firstName ? errors.firstName : ""}
                id="firstName"
                placeholder="First Name"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Label id="lastName" label="Last Name *" />
              <TextField
                required
                fullWidth
                id="lastName"
                placeholder="Last Name"
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
              <Label id="email" label="Email" />
              <TextField
                type="email"
                id="email"
                placeholder="Email"
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
              <Label id="password" label="Password *" />
              <PasswordInput
                required
                fullWidth
                name="password"
                placeholder="Password"
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
              <Label id="passwordConfirm" label="Confirm Password *" />
              <PasswordInput
                required
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
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || !(isValid && dirty)}
              fullWidth
            >
              Register
            </Button>
          </Box>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/admin/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </PageWrapper>
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
  validateOnBlur: false,

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .matches(PASSWORD_VALIDATION_REGEX, PASSWORD_VALIDATION_ERROR)
      .required("Password is required"),
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
            props.navigate("/");
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

const WrappedRegisterForm = RegisterForm;

export default function Register() {
  const { setToast } = useToasterContext();
  const navigate = useNavigate();
  return <WrappedRegisterForm setToast={setToast} navigate={navigate} />;
}
