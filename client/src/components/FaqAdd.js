import React from "react";
import FaqEditForm from "./FaqEditForm";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const FaqAdd = () => {
  const { i18n } = useTranslation();
  return (
    <Container maxWidth="md">
      <Typography component="h4" variant="h4" gutterBottom>
        Add New FAQ
      </Typography>
      {i18n.languages.map(language => (
        <FaqEditForm
          faq={{ question: "", answer: "", language: language }}
          notAdded={true}
          newFaq={true}
          key={language}
        />
      ))}
    </Container>
  );
};

export default FaqAdd;
