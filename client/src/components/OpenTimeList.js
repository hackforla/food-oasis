import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import moment from "moment";
import { CancelIconButton } from "./Buttons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(1),
    justifyContent: "space-evenly",
  },
}));

export default function SwitchListSecondary(props) {
  const classes = useStyles();
  const {
    values: { weekOfMonth, dayOfWeek, open, close },
    removeInput,
  } = props;
  const openHours = moment(open, "hh:mm a");
  const closeHours = moment(close, "hh:mm a");

  const intervals = {
    "0": "Every",
    "1": "First",
    "2": "Second",
    "3": "Third",
    "4": "Fourth",
    "-1": "Last",
  };

  return (
    <>
      <List className={classes.root}>
        <ListItem>
          <ListItemText primary={intervals[weekOfMonth]} />
        </ListItem>

        <ListItem>
          <ListItemText primary={dayOfWeek} />
        </ListItem>

        <ListItem>
          <ListItemText primary={moment(openHours).format("hh:mm a")} />
        </ListItem>

        <ListItem>
          <ListItemText primary={moment(closeHours).format("hh:mm a")} />
        </ListItem>

        <ListItemSecondaryAction>
          <CancelIconButton onClick={removeInput} />
        </ListItemSecondaryAction>
      </List>
      <Divider />
    </>
  );
}
