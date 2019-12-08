import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as faqService from "../services/faq-service";
import FaqEditForm from "./FaqEditForm";

const FaqEdit = ({ match }) => {
  const { i18n } = useTranslation();
  const [currentFaq, setCurrentFaq] = useState([
    {
      id: 0,
      question: "",
      answer: "",
      identifier: "",
      language: ""
    }
  ]);
  const faqIdentifier = match.params.identifier;

  useEffect(() => {
    async function fetchFaq() {
      try {
        const fetchedFaq = await faqService.getByIdentifier({
          identifier: faqIdentifier
        });
        setCurrentFaq(fetchedFaq);
      } catch {
        throw new Error("Cannot fetch FAQs...");
      }
    }
    fetchFaq();
  }, []);

  // const checkHowManySavedLanguageTexts = () => {
  //   let missingLanguage;
  //   if (currentFaq.length !== i18n.languages) {
  //     missingLanguage = 
  //   }
  // }

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5" gutterBottom>
        Editing Frequently Asked Questions
      </Typography>
      {currentFaq.map(faq => (
        <FaqEditForm faq={faq} key={faq.question} />
      ))}
    </Container>
  );
};

export default withRouter(FaqEdit);
