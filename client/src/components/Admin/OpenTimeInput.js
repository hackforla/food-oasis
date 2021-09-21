import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { IconButton } from '../UI';

const useStyles = makeStyles((theme) => ({
  row: {
    margin: theme.spacing(1),
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

  // Use state variables containing moment objects for
  // the Material-UI TimePickers to interact with.
  const [openingTime, setOpeningTime] = useState(
    values.open ? moment(values.open, "HH:mm:ss") : null
  );
  const [closingTime, setClosingTime] = useState(
    values.close ? moment(values.close, "HH:mm:ss") : null
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        <Grid item xs={12} sm={3}>
          <KeyboardTimePicker
            autoOK
            label="Opening Time"
            inputVariant="outlined"
            value={openingTime}
            mask="__:__ _M"
            KeyboardButtonProps={{ "aria-label": "change-time" }}
            onChange={(dt) => {
              setOpeningTime(dt);
              // Pass dt to parent component as null, unless it's a valid
              // moment date, in which case we trnslate to HH:mm:ss format
              onChange(
                {
                  target: {
                    name: "open",
                    value: dt && dt.isValid() ? dt.format("HH:mm:ss") : null,
                  },
                },
                rowIndex
              );
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          styles={{ display: "flex", flexDirection: "column" }}
        >
          <KeyboardTimePicker
            autoOk
            label="Closing Time"
            inputVariant="outlined"
            mask="__:__ _M"
            value={closingTime}
            onChange={(dt) => {
              setClosingTime(dt);
              // Pass dt to parent component as null, unless it's a valid
              // moment date, in which case we trnslate to HH:mm:ss format
              onChange(
                {
                  target: {
                    name: "close",
                    value: dt && dt.isValid() ? dt.format("HH:mm:ss") : null,
                  },
                },
                rowIndex
              );
            }}
          />
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton 
            icon='cancel'
            onClick={removeInput}
          />
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton 
            icon='wrapText'
            onClick={copyInput}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
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
