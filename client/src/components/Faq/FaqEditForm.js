import React, { useState } from "react";
import * as faqService from "../../services/faq-service";

import { Input, Button } from '../../components/UI';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router-dom";

const languages = {
  en: "English",
  es: "Spanish",
};

const FaqEditForm = ({ faq, notAdded, history }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  let language = languages[faq.language];

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (html) => {
    setAnswer(html);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (notAdded) {
      faqService.add({
        ...faq,
        question,
        answer,
        identifier: `${JSON.parse(sessionStorage.getItem("faqs")).length + 1}:${
          faq.identifier
        }`,
      });
      history.push(`/faqs`);
    } else {
      faqService.update({
        ...faq,
        question,
        answer,
      });
    }
  };

  return (
    <div>
      <h3>
        {`${language} ${faq.identifier ? "Edit" : ""} ${
          faq.identifier && notAdded ? "(Not in System)" : ""
        }`}
      </h3>
      <form onSubmit={handleSubmit}>
        <h5>Question</h5>
        <Input 
          placeholder="Question"
          type="text"
          fullWidth
          value={question}
          onChange={(event) => handleQuestionChange(event)}
          name="question"        
        />
        <h5>Answer</h5>
        <ReactQuill
          value={answer}
          onChange={handleAnswerChange}
          name="answer"
        />
        <Button 
          type='submit'
          variant='outlined'
          icon='save'
          iconPosition='start'
        >
          {notAdded ? "Add Faq" : "Update Faq"}
        </Button>
      </form>
    </div>
  );
};

export default withRouter(FaqEditForm);
