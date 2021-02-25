import React from "react";
import { storiesOf } from "@storybook/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { decorators } from "../helpers";

import Box from "../Box";
import Input from "../Input";

storiesOf("Components/Box", module)
  .addDecorator(decorators)
  .add("Overview", () => {
    const App = (props) => {
      const [name, setName] = React.useState("");

      return (
        <>
          <h1>Box</h1>
          <Box>
            <h1>Parent Organization</h1>
            <Input label="Name" value={name} onChange={setName} />
          </Box>
          <br />
          <br />
          <br />
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {`<Box>
  <h1>Parent Organization</h1>
  <Input label="Name" value={name} onChange={setName} />
</Box>
`}
          </SyntaxHighlighter>
          <h3>Props</h3>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {`
color: PropTypes.string,
bgcolor: PropTypes.string,
children: PropTypes.element,
`}
          </SyntaxHighlighter>
        </>
      );
    };
    return <App />;
  });
