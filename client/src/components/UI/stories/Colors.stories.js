import React from "react";
import { storiesOf } from "@storybook/react";
import { decorators } from "../helpers";
import Divider from '@material-ui/core/Divider';

import SystemColors from "../SystemColors";
import LogoColors from "../LogoColors";
import IconColors from "../IconColors";
import GreyColors from "../GreyColors";

storiesOf("Components/Colors", module)
  .addDecorator(decorators)
  .add("Overview", () => {
    const App = () => {
      return (
        <>
          <h1>Colors</h1>
          <h3>FOLA LOGO COLORS - USED ON THE FOOD OASIS LOGO</h3>
          <LogoColors />
          <h3>ICON COLORS - USED ON LOCATION PINS IN THE "FIND FOOD" PAGE</h3>
          <IconColors />
          <h3>SYSTEM COLORS</h3>
          <SystemColors />
          <h3>GREYSCALE</h3>
          <GreyColors />
        </>
      );
    };
    return <App />;
  });
