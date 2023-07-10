import React, { useEffect } from "react";
import iconSpacerWhite from "./assets/icon-spacer.svg";
import { Typography, Box, CardMedia, SvgIcon } from "@mui/material";
import * as analytics from "../../services/analytics";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../Layout/Footer";
import typing from "./assets/3social-equity.png";

import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  title: Yup.string()
    .required("Title is required"),
  message: Yup.string()
    .required("Message is required")
});


const Contact = () => {
  useEffect(() => {
    analytics.postEvent("visitContactPage");
  }, []);

  return (
    <Container
      sx={{
        padding: { xs: "1.5rem 0", md: "1.5rem 2rem" },
        margin: "0 auto",
        maxWidth: "1200px"
      }}
    >
      <Typography variant="h1"
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          margin: 0,
          padding: "32px 0"
        }}
      >
        Contact Us
      </Typography>
      <CardMedia component="img" alt="contact" src={typing} style={{ width: "100%" }}></CardMedia>
      <Box
        className="blue-box"
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#369",
          display: "flex",
          flexDirection: 'column',
          flexWrap: "wrap",
        }}
      >
        <CardMedia
          component="svg"
          sx={{
            margin: "auto",
            marginBottom: "20px",
            height: "40px",
            width: "90px"
          }}
        >
          <SvgIcon
            component={iconSpacerWhite}
            titleAccess="Glossary"
          />
        </CardMedia>
        <Typography variant="h2"
          sx={{
            flexBasis: "100%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px"
          }}
        >Food Seekers</Typography>
        <Container maxWidth="sm">
          <Box component="dl"
            sx={{
              marginTop: "10px",
              marginBottom: "0",
              "& dd": {
                marginLeft: "0",
                marginBottom: "24px"
              },
              "& dd:last-child": {
                marginBottom: "0"
              }
            }}
          >
            <Typography variant="subtitle2"
              sx={{
                textAlign: "center",
                color: "white"
              }}>
              Get the information you're looking for right now
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          padding: "50px 32px 50px",
          margin: "32px 0",
          borderRadius: "24px",
          background: "#B6D8FB",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              paddingLeft: "26px",
              margin: "5px",
              lineHeight: "26.55px"
            }} component="ul">
            <Formik
              initialValues={{ name: '', email: '', phone: '', title: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label htmlFor="name">Name</label>
                  <Field type="input" name="name" />
                  <ErrorMessage name="name" component="div" />
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <label htmlFor="phone">Phone</label>
                  <Field type="phone" name="phone" />
                  <label htmlFor="title">Title</label>
                  <Field type="input" name="title" />
                  <ErrorMessage name="title" component="div" />
                  <label htmlFor="message">Message</label>
                  <Field name="message" as="textarea" />
                  <ErrorMessage name="message" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box >
      <Footer />
    </Container >
  );
};

export default Contact;
