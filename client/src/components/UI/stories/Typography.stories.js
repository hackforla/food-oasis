import React from "react";
import { storiesOf } from "@storybook/react";
import { decorators } from "../helpers";

storiesOf("Components/Typography", module)
  .addDecorator(decorators)
  .add("Overview", () => {
    const App = () => {
      return (
        <>
          <h1>Typography</h1>
        </>
      );
    };
    return <App />;
  });
