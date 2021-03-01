import React, { useState } from "react";
import * as faqService from "../../services/faq-service";

import TextField from "@material-ui/core/TextField";
import { SaveButton } from "../UI/Buttons";

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
        <TextField
          placeholder="Question"
          type="text"
          variant="outlined"
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
        <SaveButton
          type="submit"
          variant="outlined"
          label={notAdded ? "Add Faq" : "Update Faq"}
        />
      </form>
    </div>
  );
};

export default withRouter(FaqEditForm);
