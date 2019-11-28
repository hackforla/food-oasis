import React, { useState, useRef, useEffect } from "react";
import Trix from "trix";

const Wysiwyg = ({ content, setContent }) => {
  const [textInput, setTextInput] = useState("" || content);
  console.log(textInput)
  const trixInput = useRef();

  useEffect(() => {
    const onTextInputChange = event => {
      setTextInput(event.target.innerHTML);
    };
    trixInput.current.addEventListener("trix-change", onTextInputChange);
  }, []);

  const onTrixSubmit = event => {
    event.preventDefault();
    setContent(textInput);
  };

  return (
    <form onSubmit={event => onTrixSubmit(event)}>
      <input type="hidden" id="trix" value={textInput} />
      <trix-editor className="trix-content" input="trix" ref={trixInput} />
      <button type="submit">Update</button>
    </form>
  );
};

export default Wysiwyg;
