import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 150,
    height: 230,
  },
  color: {
    backgroundColor: props => props.backgroundColor,
    width: 150,
    height: 150,
  }
});

function LogoColor({ hexCode, hexPurpose}) {
  const props = { backgroundColor: `${hexCode}` }
  const classes = useStyles(props);
  
  return (
    <Card className={classes.root}>
      <Card className={classes.color}>
      </Card>
      <CardContent >
        <Typography variant="overline" component="h2" align="center" gutterBottom>
        {hexCode}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p" align="center">
        {hexPurpose}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LogoColor;
