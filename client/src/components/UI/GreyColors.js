import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GreyColor from "./GreyColor"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function GreyColors() {
  const classes = useStyles();
  const GreyColors = [
    {
      "hexCode": "#1B1B1B",
      "hexPurpose": "BODY, HEADINGS",
      "id": "1"
    },
    {
      "hexCode": "#FFFFFF",
      "hexPurpose": "BODY, HEADERS, BACKGROUNDS",
      "id": "2"
    },
    {
      "hexCode":"#31233",
      "hexPurpose": "HAMBURGER ICON",
      "id": "3"
    },
    {
      "hexCode":"#1B1B1B",
      "hexPurpose": "20% OPACITY INPUT FIELD BOXES",
      "id": "4"
    },
    {
      "hexCode":"#FAFAFA",
      "hexPurpose": "TOP NAV BAR",
      "id": "5"
    },
    {
      "hexCode":"#F5F5F5",
      "hexPurpose": "MENU HOVER",
      "id": "6"
    },
    {
      "hexCode":"#F0F0F0",
      "hexPurpose": "GREY BACKGROUND PANEL",
      "id": "7"
    }
  ]

  return (
    <Grid 
      container 
      spacing={2} 
      className={classes.root}
      >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
        {GreyColors.map(({ id, hexCode, hexPurpose }) =>
        <Grid item key={id}>
        
          <GreyColor
            hexCode={hexCode}
            hexPurpose={hexPurpose}
          />
        </Grid>
        )}
      </Grid>
    </Grid>
    </Grid>
  );
}

export default GreyColors;