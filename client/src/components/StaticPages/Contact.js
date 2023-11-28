import { Check } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Textarea from "components/Admin/ui/Textarea";
import { Formik } from "formik";
import useBreakpoints from "hooks/useBreakpoints";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendContactForm } from "services/contact-service";
import * as Yup from "yup";
import * as analytics from "../../services/analytics";
import Footer from "../Layout/Footer";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email address format"),
  title: Yup.string(),
  message: Yup.string().required("Message is required"),
});

const EmailAndPhone = (props) => {
  return (
    <>
      <TextField
        helperText={props.touched.email ? props.errors.email : ""}
        error={props.touched.email && Boolean(props.errors.email)}
        type="email"
        name="email"
        placeholder="Email (Optional)"
        value={props.values.email}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
      <TextField
        type="phone"
        name="phone"
        placeholder="Phone Number (Optional)"
        value={props.values.phone}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />
    </>
  );
};

const ConfirmationContents = (props) => {
  return (
    <Stack alignItems="center" spacing={4}>
      <Box
        sx={{
          borderRadius: "100%",
          height: "40px",
          width: "40px",
          backgroundColor: "#00C851",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Check sx={{ color: "white" }} />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          id="modal-modal-title"
          variant="h2"
          textTransform="uppercase"
        >
          Thank you
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your message has been received!
        </Typography>
      </Box>
      <Stack direction="row" spacing={4} justifyContent="center">
        <Button onClick={() => props.navigate("/")}>Back to home page</Button>
      </Stack>
    </Stack>
  );
};

const Contact = () => {
  useEffect(() => {
    analytics.postEvent("visitContactPage");
  }, []);

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isMobile } = useBreakpoints();

  const navigate = useNavigate();

  return (
    <>
      {isMobile && submitted ? (
        <Box
          sx={{
            height: "100%",
            width: "100vw",
            backgroundColor: "white",
            paddingTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ConfirmationContents navigate={navigate} />
        </Box>
      ) : (
        <Container
          sx={{
            padding: { xs: "1.5rem 10px", md: "1.5rem 2rem" },
            margin: "0 auto",
            maxWidth: "1200px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              margin: 0,
              padding: { xs: "20px 0 0 0" },
            }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{
              margin: { xs: "15px 0 32px 0", md: "32px 0" },
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "black",
                textTransform: "uppercase",
                maxWidth: "392px",
                fontWeight: "500",
                padding: { xs: "12px 0", md: "25px 0" },
              }}
            >
              How can we help?
            </Typography>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                title: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                sendContactForm(values)
                  .then(() => {
                    setSubmitted(true);
                    setSubmitError("");
                    handleOpen();
                  })
                  .catch(() => {
                    setSubmitError(
                      "There was an error with your submission. Please try again."
                    );
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                dirty,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      "height": { xs: "480px", md: "560px" },
                      "& > div": {
                        height: "61px",
                        marginTop: { xs: "3px", md: "12px" },
                        marginBottom: { xs: "3px", md: "12px" },
                      },
                    }}
                  >
                    <TextField
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                      type="input"
                      name="name"
                      placeholder="Your Name *"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {isMobile ? (
                      <EmailAndPhone
                        touched={touched}
                        errors={errors}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isMobile={isMobile}
                      />
                    ) : (
                      <Stack
                        direction={"row"}
                        spacing={4}
                        sx={{ "& > *": { width: "604px" } }}
                      >
                        <EmailAndPhone
                          touched={touched}
                          errors={errors}
                          values={values}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          isMobile={isMobile}
                        />
                      </Stack>
                    )}
                    <TextField
                      helperText={touched.title ? errors.title : ""}
                      error={touched.title && Boolean(errors.title)}
                      type="input"
                      name="title"
                      placeholder="Subject (Optional)"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Textarea
                      helperText={touched.message ? errors.message : ""}
                      error={touched.message && Boolean(errors.message)}
                      name="message"
                      placeholder="Your Message *"
                      rows={isMobile ? 8 : 10}
                      placeholderStyle={{ fontStyle: "normal" }}
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Textarea>
                  </Box>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={isMobile ? 1 : 2}
                  >
                    {submitError && (
                      <Typography
                        variant="subtitle2"
                        color="error"
                        sx={{
                          marginTop: "-20px",
                        }}
                      >
                        {submitError}
                      </Typography>
                    )}
                    <Button type="submit" disabled={!dirty || !isValid}>
                      Submit
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box
                        sx={{
                          height: "454px",
                          width: "799px",
                          backgroundColor: "white",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "24px",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ConfirmationContents navigate={navigate} />
                      </Box>
                    </Modal>
                  </Stack>
                </form>
              )}
            </Formik>
          </Box>
          {!isMobile && <Footer />}
        </Container>
      )}
    </>
  );
};

export default Contact;
