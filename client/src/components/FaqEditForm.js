import React, { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FaqEditForm = ({ faq }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          placeholder="Enter your question..."
          type="text"
          value={currentFaq.question}
          onChange={handleQuestionChange}
          name="question"
        />
        <button type="submit">Update</button>
      </form>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={currentFaq.answer}
          onChange={handleAnswerChange}
          name="question"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default FaqEditForm;
