import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LogoColor from "./LogoColor"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function LogoColors() {
  const classes = useStyles();
  const LogoColors = [
    {
      "hexCode": "#29A549",
      "hexPurpose": "TEXT COLOR",
      "id": "1"
    },
    {
      "hexCode": "#EF634F",
      "hexPurpose": "CARROT",
      "id": "2"
    },
    {
      "hexCode":"#B0D352",
      "hexPurpose": "CARROT LEAF",
      "id": "3"
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
        {LogoColors.map(({ id, hexCode, hexPurpose }) =>
        <Grid item key={id}>
        
          <LogoColor
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

export default LogoColors;