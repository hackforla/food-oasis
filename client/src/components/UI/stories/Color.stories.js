import React from "react";
import { storiesOf } from "@storybook/react";
import { decorators } from "../helpers";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ColorBlock from "../ColorBlock";


storiesOf("Components/Colors", module)
  .addDecorator(decorators)
  .add("Overview", () => {
    const App = () => {
      return (
        <>
          <h1>Colors</h1>
          <h3>FOLA LOGO COLORS - USED ON THE FOOD OASIS LOGO</h3>
          <ColorGroup colors={LOGO_COLORS} />
          <h3>ICON COLORS - USED ON LOCATION PINS IN THE "FIND FOOD" PAGE</h3>
          <ColorGroup colors={ICON_COLORS} />
          <h3>SYSTEM COLORS</h3>
          <ColorGroup colors={SYSTEM_COLORS} />
          <h3>GREYSCALE</h3>
          <ColorGroup colors={GREY_COLORS} />
        </>
      );
    };
    return <App />;
  });

  function ColorGroup({colors}) {
    const useStyles = makeStyles({
      root: {
        flexGrow: 1,
      }
    });

    const classes = useStyles();
    return (
      <Grid 
        container 
        spacing={2} 
        className={classes.root}
        >
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
          {colors.map(({ id, hexCode, description }) =>
          <Grid item key={id}>
            <ColorBlock
              hexCode={hexCode}
              description={description}
            />
          </Grid>
          )}
        </Grid>
      </Grid>
      </Grid>
    );
  }

  const LOGO_COLORS = [
    {
      "hexCode": "#29A549",
      "description": "TEXT COLOR",
      "id": "1"
    },
    {
      "hexCode": "#EF634F",
      "description": "CARROT",
      "id": "2"
    },
    {
      "hexCode":"#B0D352",
      "description": "CARROT LEAF",
      "id": "3"
    }
  ]

  const ICON_COLORS = [
    {
      "hexCode": "#336699",
      "description": "PANTRIES",
      "id": "1"
    },
    {
      "hexCode": "#F27E30",
      "description": "MEALS",
      "id": "2"
    }
  ]

  const SYSTEM_COLORS = [
    {
      "hexCode": "#336699",
      "description": "PRIMARY CTA",
      "id": "1"
    },
    {
      "hexCode": "#0A3865",
      "description": "PRIMARY CTA HOVER",
      "id": "2"
    },
    {
      "hexCode":"#008000",
      "description": "OPEN NOW LABEL",
      "id": "3"
    },
    {
      "hexCode": "#CC3333",
      "description": "CLOSING SOON LABEL",
      "id": "4"
    },
    {
      "hexCode":"#E57109",
      "description": "BACKGROUND PANEL COLOR",
      "id": "5"
    },
    {
      "hexCode":"#E57109",
      "description": "70% OPACITY BACKGROUND PANEL COLOR",
      "id": "6"
    },
    {
      "hexCode":"#F9C058",
      "description": "LOCK/REGISTER ICON COLOR",
      "id": "7"
    },
    {
      "hexCode":"#008000",
      "description": "FOLA HOVER COLOR",
      "id": "8"
    },
    {
      "hexCode":"#F94040",
      "description": "FORM FIELD ERROR",
      "id": "9"
    }
    
  ]

  const GREY_COLORS = [
    {
      "hexCode": "#1B1B1B",
      "description": "BODY, HEADINGS",
      "id": "1"
    },
    {
      "hexCode": "#FFFFFF",
      "description": "BODY, HEADERS, BACKGROUNDS",
      "id": "2"
    },
    {
      "hexCode":"#31233",
      "description": "HAMBURGER ICON",
      "id": "3"
    },
    {
      "hexCode":"#1B1B1B",
      "description": "20% OPACITY INPUT FIELD BOXES",
      "id": "4"
    },
    {
      "hexCode":"#FAFAFA",
      "description": "TOP NAV BAR",
      "id": "5"
    },
    {
      "hexCode":"#F5F5F5",
      "description": "MENU HOVER",
      "id": "6"
    },
    {
      "hexCode":"#F0F0F0",
      "description": "GREY BACKGROUND PANEL",
      "id": "7"
    }
  ]
 

  
