import React from "react";
import { storiesOf } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import Input from "../Input";

storiesOf("Components/Input", module)
  .addDecorator(muiTheme())
  .add("Overview", () => {
    const App = (props) => {
      const [inputValue, setInputValue] = React.useState("");
      return (
        <>
          <h1>Input</h1>
          <Input
            label="Input Label"
            value={inputValue}
            onChange={setInputValue}
          />
          <br />
          <br />
          <br />
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {`<Input
  label="Input Label"
  value={inputValue}
  onChange={setInputValue}
  {...props}
/>
`}
          </SyntaxHighlighter>
          <h3>Props</h3>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {`
label: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
value: PropTypes.string.isRequired,
`}
          </SyntaxHighlighter>
        </>
      );
    };
    return <App />;
  });
