import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as faqService from "../services/faq-service";
import FaqEditForm from "./FaqEditForm";

const FaqEdit = ({ match }) => {
  const { i18n } = useTranslation();
  const [addedFaq, setAddedFaq] = useState([
    {
      id: 0,
      question: "",
      answer: "",
      identifier: "",
      language: ""
    }
  ]);
  const [needToAddFaqs, setNeedToAddFaqs] = useState([""]);
  const faqIdentifier = match.params.identifier;

  useEffect(() => {
    const checkHowManySavedLanguageTexts = faqs => {
      let currentLanguages = {};
      let addedLanguages = faqs.map(faq => {
        currentLanguages[faq.language] = true;
        return faq;
      });
      let needToAddLanguages;
      if (addedFaq.length !== i18n.languages) {
        needToAddLanguages = i18n.languages.filter(
          language => !currentLanguages[language]
        );
      }
      return { addedLanguages, needToAddLanguages };
    };

    async function fetchFaq() {
      try {
        const fetchedFaq = await faqService.getByIdentifier({
          identifier: faqIdentifier
        });

        let {
          addedLanguages,
          needToAddLanguages
        } = checkHowManySavedLanguageTexts(fetchedFaq);

        setAddedFaq(addedLanguages);
        setNeedToAddFaqs(needToAddLanguages);
      } catch {
        throw new Error("Cannot fetch FAQs...");
      }
    }
    fetchFaq();
  }, [addedFaq.length, faqIdentifier, i18n.languages]);

  console.log(i18n.languages)

  return (
    <Container maxWidth="md">
      <h2>Editing Frequently Asked Questions</h2>
      <h3>FAQ Identifier: {faqIdentifier}</h3>
      {addedFaq.map(faq => (
        <FaqEditForm faq={faq} key={faq.question} />
      ))}
      {needToAddFaqs.map(language => (
        <FaqEditForm
          faq={{
            question: "",
            answer: "",
            identifier: faqIdentifier,
            language: language
          }}
          notAdded={true}
          key={language}
        />
      ))}
    </Container>
  );
};

export default withRouter(FaqEdit);
