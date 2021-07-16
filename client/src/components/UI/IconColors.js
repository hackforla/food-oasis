import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import IconColor from "./LogoColor"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function IconColors() {
  const classes = useStyles();
  const IconColors = [
    {
      "hexCode": "#336699",
      "hexPurpose": "PANTRIES",
      "id": "1"
    },
    {
      "hexCode": "#F27E30",
      "hexPurpose": "MEALS",
      "id": "2"
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
        {IconColors.map(({ id, hexCode, hexPurpose }) =>
        <Grid item key={id}>
        
          <IconColor
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

export default IconColors;