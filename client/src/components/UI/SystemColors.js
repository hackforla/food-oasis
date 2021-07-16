import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SystemColor from "./SystemColor";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  }
});

function SystemColors() {
  const classes = useStyles();
  const SystemColors = [
    {
      "hexCode": "#336699",
      "hexPurpose": "PRIMARY CTA",
      "id": "1"
    },
    {
      "hexCode": "#0A3865",
      "hexPurpose": "PRIMARY CTA HOVER",
      "id": "2"
    },
    {
      "hexCode":"#008000",
      "hexPurpose": "OPEN NOW LABEL",
      "id": "3"
    },
    {
      "hexCode": "#CC3333",
      "hexPurpose": "CLOSING SOON LABEL",
      "id": "4"
    },
    {
      "hexCode":"#E57109",
      "hexPurpose": "BACKGROUND PANEL COLOR",
      "id": "5"
    },
    {
      "hexCode":"#E57109",
      "hexPurpose": "70% OPACITY BACKGROUND PANEL COLOR",
      "id": "6"
    },
    {
      "hexCode":"#F9C058",
      "hexPurpose": "LOCK/REGISTER ICON COLOR",
      "id": "7"
    },
    {
      "hexCode":"#008000",
      "hexPurpose": "FOLA HOVER COLOR",
      "id": "8"
    },
    {
      "hexCode":"#F94040",
      "hexPurpose": "FORM FIELD ERROR",
      "id": "9"
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
        {SystemColors.map(({ id, hexCode, hexPurpose }) =>
        <Grid item key={id}>
        
          <SystemColor
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

export default SystemColors;
