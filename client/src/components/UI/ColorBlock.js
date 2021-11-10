import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    width: 150,
    height: 250,
  },
  color: {
    width: 150,
    height: 150,
    backgroundColor: props => props.backgroundColor
  }
});

function ColorBlock({ hexCode, description}) {
  const props = { backgroundColor: `${hexCode}` }
  const classes = useStyles(props);
  
  return (
      <Card className={classes.root}>
        <Card className={classes.color}>
        </Card>
        <CardContent> 
          <Typography 
            align="center"
            variant="overline" 
            component="h2"
            gutterBottom
          >
          {hexCode}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p" align="center">
          {description}
          </Typography>
        </CardContent>
      </Card>
  );
}

export default ColorBlock;
