import React, { useState } from "react";

import Wysiwyg from "./Wysiwyg";
import "trix/dist/trix.css";

const FaqInput = ({ previousInput }) => {
  const [content, setContent] = useState(previousInput);

  return (
    <div>
      <Wysiwyg content={content} setContent={setContent} />
    </div>
  );
};

export default FaqInput;
