import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as faqService from '../services/faq-service';

const Faq = () => {
  // Load in current FAQs
  // If FAQs need to be updated, go into admin portal
  // This will only display the current FAQs

  const [faqs, setFaqs] = useState([]);
  const { t, i18n } = useTranslation('faq');

  // Should I create a faq-service? to follow current design pattern, or can this stay here?
  // Query in the english version of FAQs
  useEffect(() => {
    async function fetchFaqs() {
      const fetchedFaqs = await faqService.getAll({ language: i18n.language });
      setFaqs(fetchedFaqs);
    }
    fetchFaqs();
  }, [i18n.language]);

  console.log(faqs);

  return (
    <>
      <p>{t('title')}</p>
      {faqs[0] ? (
        faqs.map(faq => (
          <div>
            {/* ex. Loading: t(faq.question), t(faq.answer) */}
            <p>Question</p>
            <p>Answer</p>
          </div>
        ))
      ) : (
        <div>FAQs are loading...</div>
      )}
    </>
  );
};

export default Faq;
