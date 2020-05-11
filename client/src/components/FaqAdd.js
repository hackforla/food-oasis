import React, { useState } from "react";
import FaqEditForm from "./FaqEditForm";
import { useTranslation } from "react-i18next";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const FaqAdd = () => {
  const { i18n } = useTranslation();

  const [identifier, setIdentifier] = useState("");

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <h2>Add New FAQ</h2>
      <h4>Set up an Identifier for the question</h4>
      <TextField
        placeholder="Identifier"
        type="text"
        variant="outlined"
        fullWidth
        value={identifier}
        onChange={(event) => handleIdentifierChange(event)}
        name="identifier"
      />
      {i18n.languages.map((language) => (
        <FaqEditForm
          faq={{
            question: "",
            answer: "",
            language: language,
            identifier: identifier,
          }}
          notAdded={true}
          key={language}
        />
      ))}
    </Container>
  );
};

export default FaqAdd;
