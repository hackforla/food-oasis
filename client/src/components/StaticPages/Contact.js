import React, { useEffect } from "react";
import IconSpacerSVG from "./assets/IconSpacerSVG";
import { Typography, Box, CardMedia, List, ListItem, ListItemText, SvgIcon, Button, TextField } from "@mui/material";
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

function createListItems() {
  const listTexts = [
    "Learn more about Food Oasis",
    "How can I sign up to volunteer?",
    "When can I become a volunteer?",
    "How do I set up an account to start my assignment?",
    "How can I donate?",
    "What will my donation go toward?",
    "How can I suggest a new listing?"
  ];

  return listTexts.map((value, i) =>
    <ListItem
      key={i}
      sx={{
        display: "list-item",
        padding: "0px"
      }}
    >
      {value}
    </ListItem>)
}


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
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          height: "545px"
        }}
      >
        <SvgIcon
          alt="Glossary"
          component={IconSpacerSVG}
        />
        <Typography variant="subtitle1"
          sx={{
            textAlign: "center",
            color: "white",
            textTransform: "uppercase",
            maxWidth: "392px"
          }}>
          Get the information you're looking for right now
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            color: "white",
            alignItems: "left",
            width: "95%"
          }}
        >
          {createListItems()}
        </List>
        <Button
          variant="outlined"
          type="submit"
          sx={{
            minHeight: "21.78px",
            maxWidth: "392px",
            alignSelf: "center"
          }}>SEE ALL FREQUENTLY ASKED QUESTIONS
        </Button>
      </Box >
      <Box
        sx={{
          margin: "32px 0",
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <Box
          sx={{
            paddingLeft: "26px",
            margin: "5px",
            lineHeight: "26.55px"
          }} component="ul">
        <Typography variant="subtitle1"
          sx={{
            color: "black",
            textTransform: "uppercase",
            maxWidth: "392px"
          }}>
          Can't find what you're looking for?
        </Typography>
        <Typography variant="subtitle2"
          sx={{
            color: "black",
            maxWidth: "392px"
          }}>
          How can we help?
        </Typography>
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
                <TextField type="input" name="name" placeholder="Your Name" />
                <ErrorMessage name="name" component="div" />
                <TextField type="email" name="email" placeholder="Email" sx={{width: "604px"}} />
                <ErrorMessage name="email" component="div" />
                <TextField type="phone" name="phone" placeholder="Phone Number" />
                <TextField type="input" name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" />
                <Field name="message" as="textarea" placeholder="Message" />
                <ErrorMessage name="message" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box >
      <Footer />
    </Container >
  );
};

export default Contact;
