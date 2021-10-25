import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
import * as faqService from "../../services/faq-service";
import FaqEditForm from "./FaqEditForm";
import { Button, Input } from "../../components/UI";

const FaqEdit = ({ match, history }) => {
  const { i18n } = useTranslation();
  const [addedFaq, setAddedFaq] = useState([
    {
      id: 0,
      question: "",
      answer: "",
      identifier: "",
      language: "",
    },
  ]);
  const [needToAddFaqs, setNeedToAddFaqs] = useState([""]);
  const faqIdentifier = match.params.identifier;
  const [identifier, setIdentifier] = useState(
    faqIdentifier.slice(faqIdentifier.indexOf(":") + 1, faqIdentifier.length)
  );
  const [editIdentifier, setEditIdentifier] = useState(false);

  useEffect(() => {
    const checkHowManySavedLanguageTexts = (faqs) => {
      let currentLanguages = {};
      let addedLanguages = faqs.map((faq) => {
        currentLanguages[faq.language] = true;
        return faq;
      });
      let needToAddLanguages;
      if (addedFaq.length !== i18n.languages) {
        needToAddLanguages = i18n.languages.filter(
          (language) => !currentLanguages[language]
        );
      }
      return { addedLanguages, needToAddLanguages };
    };

    async function fetchFaq() {
      try {
        const fetchedFaq = await faqService.getByIdentifier({
          identifier: faqIdentifier,
        });

        let { addedLanguages, needToAddLanguages } =
          checkHowManySavedLanguageTexts(fetchedFaq);

        setAddedFaq(addedLanguages);
        setNeedToAddFaqs(needToAddLanguages);
      } catch (error) {
        throw new Error("Cannot fetch FAQs...");
      }
    }
    fetchFaq();
  }, [addedFaq.length, faqIdentifier, i18n.languages]);

  const handleIdentifier = (event) => {
    setIdentifier(event.target.value);
  };

  const handleEditIdentifier = () => {
    setEditIdentifier(!editIdentifier);
  };

  const handleUpdateIdentifier = () => {
    addedFaq.map(
      async (faq) =>
        await faqService.update({
          ...faq,
          identifier:
            faqIdentifier.slice(0, faqIdentifier.indexOf(":") + 1) + identifier,
        })
    );
    handleEditIdentifier();
    history.push(
      `/faqs/${
        faqIdentifier.slice(0, faqIdentifier.indexOf(":") + 1) + identifier
      }`
    );
  };

  return (
    <Container maxWidth="md">
      <h2>Editing Frequently Asked Questions</h2>
      <h3>
        FAQ Identifier:{" "}
        {!editIdentifier ? (
          <>
            <span>{identifier}</span>
            <Button
              icon="edit"
              iconPosition="start"
              onClick={handleEditIdentifier}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <Input
              type="text"
              name="identifier"
              placeholder="Identifier"
              value={identifier}
              onChange={handleIdentifier}
            />
            <Button
              icon="save"
              iconPosition="start"
              onClick={handleUpdateIdentifier}
            >
              Update
            </Button>
            <Button
              icon="cancel"
              iconPosition="start"
              onClick={handleEditIdentifier}
            >
              Cancel
            </Button>
          </>
        )}
      </h3>
      {addedFaq.map((faq) => (
        <FaqEditForm faq={faq} key={faq.question} />
      ))}
      {needToAddFaqs.map((language) => (
        <FaqEditForm
          faq={{
            question: "",
            answer: "",
            identifier: faqIdentifier,
            language: language,
          }}
          notAdded={true}
          key={language}
        />
      ))}
    </Container>
  );
};

export default withRouter(FaqEdit);
