import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import OpenTimeInputs from "./OpenTimeInput";
import OpenTimeList from "./OpenTimeList";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid lightgray",
    borderRadius: "4px",
  },
  listContainer: {
    marginBottom: theme.spacing(3),
  },
  list: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  text: {
    textAlign: "center",
    margin: "16px 0",
  },
}));

function OpenTimeForm(props) {
  const classes = useStyles();
  const { value, onChange } = props;
  const [hours, setHours] = useState(props.value);
  const defaultValues = {
    weekOfMonth: null,
    dayOfWeek: null,
    open: null,
    close: null,
  };

  useEffect(() => {
    setHours(value);
  }, [value]);

  const handleRowSubmit = (row) => {
    let newHours = [...hours, row];
    setHours(newHours);
    onChange({ target: { value: newHours, name: "hours" } });
  };

  const removeHours = (e, index) => {
    let newHours = hours.filter((val, i) => i !== index);
    setHours(newHours);
    onChange({ target: { value: newHours, name: "hours" } });
  };

  const renderHoursList = () => {
    if (hours.length === 0) return null;

    return (
      <div className={classes.listContainer}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Hours
        </Typography>
        <List className={classes.list}>
          <ListItem>
            <ListItemText primary="Interval" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Days" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Open" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Closed" />
          </ListItem>
        </List>
        <Divider />
        {hours.map((val, rowIndex) => {
          return (
            <OpenTimeList
              key={rowIndex}
              values={val}
              removeInput={(e) => removeHours(e, rowIndex)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {renderHoursList()}

        <Typography className={classes.text} variant="h5" gutterBottom>
          Add Hours
        </Typography>
        <OpenTimeInputs
          values={defaultValues}
          handleRowSubmit={handleRowSubmit}
        />
      </CardContent>
    </Card>
  );
}

OpenTimeForm.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default OpenTimeForm;
