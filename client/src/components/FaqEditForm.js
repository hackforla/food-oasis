import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import * as faqService from "../services/faq-service";

import TextField from '@material-ui/core/Textfield'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FaqEditForm = ({ faq, history }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  console.log(question, answer);

  const handleQuestionChange = event => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = html => {
    setAnswer(html);
  };

  const handleSubmit = () => {
    faqService.add({
      ...faq,
      question,
      answer
    });
    history.push("/faqs");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question</label>
        <TextField
          id="question"
          label="Question"
          type="text"
          value={question}
          onChange={event => handleQuestionChange(event)}
          name="question"
        />
        <ReactQuill
          value={answer}
          onChange={handleAnswerChange}
          name="answer"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default withRouter(FaqEditForm);
