import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Faq = () => {
  // Load in current FAQs
  // If FAQs need to be updated, go into admin portal
  // This will only display the current FAQs

  const [faqs, setFaqs] = useState([]);
  const { t } = useTranslation("faq");

  // Should I create a faq-service? to follow current design pattern, or can this stay here?
  // Query in the english version of FAQs
  useEffect(() => {
    async function fetchFaqs() {
      const response = await axios.get("/api/faqs");
      console.log(response);
      // if response is an array
      setFaqs(response);
    }
    fetchFaqs();
  }, []);

  return (
    <>
      <p>{t("title")}</p>
      {faqs.map(faq => (
        <div>
          {/* ex. Loading: t(faq.question), t(faq.answer) */}
          <p>Question</p>
          <p>Answer</p>
        </div>
      ))}
    </>
  );
};

export default Faq;