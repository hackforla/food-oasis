import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
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
import { CancelIconButton } from "./Buttons";
import { WrapText } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  row: {
    margin: theme.spacing(1),
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 50,
    // maxWidth: 200
  },
}));

const days = [
  { label: "(Select)", value: "" },
  { label: "Sun", value: "Sun" },
  { label: "Mon", value: "Mon" },
  { label: "Tue", value: "Tue" },
  { label: "Wed", value: "Wed" },
  { label: "Thu", value: "Thu" },
  { label: "Fri", value: "Fri" },
  { label: "Sat", value: "Sat" },
];

const intervals = [
  { label: "Every", value: 0 },
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Last", value: -1 },
];

function OpenTimeInput(props) {
  const classes = useStyles();
  const { values, rowIndex, onChange, removeInput, copyInput } = props;
  let openingTimeCode, closingTimeCode;

  // set default 'open' value for new rows
  if (!values.open) {
    values.open = "09:00:00";
  }

  // set default 'close' value for new rows
  if (!values.close) {
    values.close = "12:00:00";
  }

  openingTimeCode = values.open.split(":");
  closingTimeCode = values.close.split(":");

  const [openingTime, setOpeningTime] = useState(
    new Date(
      null,
      null,
      null,
      openingTimeCode[0],
      openingTimeCode[1],
      openingTimeCode[2],
      0
    )
  );

  const [closingTime, setClosingTime] = useState(
    new Date(
      null,
      null,
      null,
      closingTimeCode[0],
      closingTimeCode[1],
      closingTimeCode[2],
      0
    )
  );

  const handleTimeUpdate = (e, type) => {
    if (
      (type === "close" && e._d === closingTime) ||
      (type === "open" && e._d === openingTime)
    ) {
      return;
    }

    onChange(
      {
        target: {
          name: type,
          value: formatToHHmmss(e._d),
        },
      },
      rowIndex
    );

    if (type === "close") {
      setClosingTime(e._d);
    } else {
      setOpeningTime(e._d);
    }
  };

  /**
   * inputs a time from MaterialUI's TimePicker component and outputs
   * to HH:mm:ss format we send to Formik
   */
  const formatToHHmmss = (dateToFormat) => {
    return moment(dateToFormat).format("HH:mm:ss");
  };

  return (
    <Grid container spacing={1} className={classes.row}>
      <Grid item xs={12} sm={2}>
        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel>Interval</InputLabel>
          <Select
            labelId="open-days-select-id"
            id="open-days-select"
            name="weekOfMonth"
            labelWidth={75}
            onChange={onChange}
            value={values.weekOfMonth}
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
        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel>Days</InputLabel>
          <Select
            labelId="open-days-select-id"
            id="open-days-select"
            variant="outlined"
            name="dayOfWeek"
            labelWidth={75}
            onChange={onChange}
            value={values.dayOfWeek}
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
          autoOk
          label="Opening Time"
          value={openingTime}
          onChange={(e) => {
            handleTimeUpdate(e, "open");
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
          autoOk
          label="Closing Time"
          value={closingTime}
          onChange={(e) => {
            handleTimeUpdate(e, "close");
          }}
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <CancelIconButton onClick={removeInput} />
      </Grid>
      <Grid item xs={2} sm={1}>
        <IconButton
          variant="contained"
          color="default"
          aria-label="cancel"
          onClick={copyInput}
        >
          <WrapText />
        </IconButton>
      </Grid>
    </Grid>
  );
}

OpenTimeInput.propTypes = {
  values: PropTypes.object,
  rowIndex: PropTypes.number,
  onChange: PropTypes.func,
  removeInput: PropTypes.func,
  copyInput: PropTypes.func,
};

export default OpenTimeInput;
