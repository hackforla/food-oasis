import React, { useState } from "react";
import * as faqService from "../services/faq-service";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FaqEditForm = ({ faq, notAdded }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  let language;
  switch (faq.language) {
    case "en":
      language = "English";
      break;
    case "es":
      language = "Spanish";
      break;
    default:
      break;
  }

  const handleQuestionChange = event => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = html => {
    setAnswer(html);
  };

  const handleSubmit = e => {
    if (notAdded) {
      faqService.add({
        ...faq,
        question,
        answer
      });
    } else {
      faqService.update({
        ...faq,
        question,
        answer
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
          onChange={event => handleQuestionChange(event)}
          name="question"
        />
        <h5>Answer</h5>
        <ReactQuill
          value={answer}
          onChange={handleAnswerChange}
          name="answer"
        />
        <Button type="submit" variant="outlined">
          {notAdded ? "Add Faq" : "Update Faq"}
        </Button>
      </form>
    </div>
  );
};

export default FaqEditForm;
