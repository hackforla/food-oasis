import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import * as faqService from "../services/faq-service";

import TextField from "@material-ui/core/Textfield";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FaqEditForm = ({ faq, history, notAdded }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  console.log(faq);
  console.log(answer);

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

  const handleSubmit = () => {
    if (notAdded) {
      faqService.add({
        ...faq,
        question,
        answer
      });
    } else {
      // Need to double check on how updating works with service
      faqService.update({
        ...faq,
        question,
        answer
      });
    }
    history.push("/faqs");
  };

  return (
    <div>
      <Typography component="h4" variant="h4">
        {language} Edit {notAdded && "(Not Saved in System)"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography component="h4" variant="h5">
          Question
        </Typography>
        <TextField
          placeholder="Question"
          type="text"
          variant="outlined"
          fullWidth
          value={question}
          onChange={event => handleQuestionChange(event)}
          name="question"
        />
        <Typography component="h4" variant="h5">
          Answer
        </Typography>
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

export default withRouter(FaqEditForm);
