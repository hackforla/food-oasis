import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import Label from "components/Admin/ui/Label";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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

const ConfirmEmail = (props) => {
  const [confirmResult, setConfirmResult] = useState(false);
  const { token } = useParams();
  const { setToast } = useToasterContext();
  const [view, setView] = useState("loading");

  useEffect(() => {
    const confirmEmail = async (tok) => {
      const result = await accountService.confirmRegister(tok);
      setConfirmResult(result);
      if (result.isSuccess) {
        setView("success");
        setToast({ message: `Your email has been confirmed. Please log in.` });
      } else {
        setView("error");
      }
    };
    if (token) {
      confirmEmail(token);
    }
  }, [token, setToast]);

  const resendConfirmationEmail = async (values) => {
    const result = await accountService.resendConfirmationEmail(values.email);
    if (result.isSuccess) {
      setView("emailSent");
    } else {
      setView("error");
      setToast({ message: result.message });
    }
  };

  const renderView = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    dirty,
    isValid,
  }) => {
    switch (view) {
      case "loading":
        return <div>&ldquo;Confirming Email...&ldquo;</div>;
      case "success":
        return <Navigate to={`/login/${confirmResult.email}`} />;
      case "emailSent":
        return (
          <p>
            {`A confirmation email has been sent to ${values.email}. Please find this email and click on the link provided to complete your email confirmation.`}
          </p>
        );
      default:
      case "error":
        return (
          <PageWrapper>
            <Typography component="p">
              The confirmation request was not found, or has expired. Please
              enter your email here and press the button to re-send the
              registration confirmation email.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box>
                <Label id="email" label="Enter the email for your account" />
                <TextField
                  required
                  fullWidth
                  name="email"
                  placeholder="Enter the email for your account"
                  type="email"
                  id="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  sx={{ mt: 1, mb: 2 }}
                />
              </Box>
              <LoadingButton
                variant="contained"
                loading={isSubmitting}
                type="submit"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                disabled={isSubmitting || !(isValid && dirty)}
              >
                Re-send confirmation email
              </LoadingButton>
            </form>
          </PageWrapper>
        );
    }
  };

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
          <EmailOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm Email
        </Typography>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={resendConfirmationEmail}
        >
          {(props) => renderView(props)}
        </Formik>
      </Box>
    </PageWrapper>
  );
};

export default ConfirmEmail;
