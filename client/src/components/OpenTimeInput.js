import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
} from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import moment from "moment";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  row: {
    margin: theme.spacing(1),
    justifyContent: "space-between",
  },
  formControl: {
    marginRight: theme.spacing(1),
  },
}));

const intervals = [
  { label: "Every", value: 0 },
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Last", value: -1 },
];

const days = [
  { label: "Sun", value: "Sun" },
  { label: "Mon", value: "Mon" },
  { label: "Tue", value: "Tue" },
  { label: "Wed", value: "Wed" },
  { label: "Thu", value: "Thu" },
  { label: "Fri", value: "Fri" },
  { label: "Sat", value: "Sat" },
];

function OpenTimeInput(props) {
  const classes = useStyles();
  const {
    values: { weekOfMonth, dayOfWeek, open, close },
    handleRowSubmit,
  } = props;

  const [isDayDisabled, setIsDayDisabled] = useState(dayOfWeek === null);
  const [isOpenDisabled, setIsOpenDisabled] = useState(open === null);
  const [isCloseDisabled, setIsCloseDisabled] = useState(close === null);
  const [buttonsDisabled, setButtonsDisabled] = useState(close === null);

  const [week, setWeek] = useState(weekOfMonth);
  const [day, setDay] = useState(dayOfWeek);

  const tempOpen = open !== null ? open : "09:00:00";
  const tempClose = close !== null ? close : "17:00:00";
  const [openHours, setOpenHours] = useState(moment(tempOpen, "hh:mm:ss a"));
  const [closeHours, setCloseHours] = useState(moment(tempClose, "hh:mm:ss a"));

  const saveRow = () => {
    const row = {
      weekOfMonth: week,
      dayOfWeek: day,
      open: moment(openHours).format("HH:mm:ss"),
      close: moment(closeHours).format("HH:mm:ss"),
    };

    handleRowSubmit(row);

    // Resets everything
    setWeek(null);
    setDay(null);
    setIsDayDisabled(true);
    setIsOpenDisabled(true);
    setOpenHours(moment("09:00:00", "hh:mm:ss a"));
    setIsCloseDisabled(true);
    setCloseHours(moment("17:00:00", "hh:mm:ss a"));
    setButtonsDisabled(true);
  };

  return (
    <Grid container spacing={1} className={classes.row}>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="week-label">Interval</InputLabel>
          <Select
            labelId="week-label"
            id="open-days-select"
            name="weekOfMonth"
            labelWidth={75}
            value={week}
            onChange={(event) => {
              setWeek(event.target.value);
              setIsDayDisabled(false);
            }}
          >
            {intervals.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="day-label">Days</InputLabel>
          <Select
            labelId="day-label"
            id="open-days-select"
            name="dayOfWeek"
            labelWidth={75}
            value={day}
            disabled={isDayDisabled}
            onChange={(event) => {
              setDay(event.target.value);
              setIsOpenDisabled(false);
            }}
          >
            {days.map((day) => (
              <MenuItem key={day.value} label={day.label} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TimePicker
          name="open"
          label="Opening Time"
          minutesStep={5}
          value={openHours}
          disabled={isOpenDisabled}
          onChange={(time) => {
            setOpenHours(moment(time, "hh:mm:ss a"));
            setIsCloseDisabled(false);
          }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        sm={2}
        styles={{ display: "flex", flexDirection: "column" }}
      >
        <TimePicker
          name="close"
          label="Closing Time"
          value={closeHours}
          minutesStep={5}
          disabled={isCloseDisabled}
          onChange={(time) => {
            setCloseHours(moment(time, "hh:mm:ss a"));
            setButtonsDisabled(false);
          }}
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <IconButton
          variant="contained"
          color="default"
          aria-label="save"
          onClick={saveRow}
          disabled={buttonsDisabled}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

OpenTimeInput.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  removeInput: PropTypes.func,
  copyInput: PropTypes.func,
};

export default OpenTimeInput;
