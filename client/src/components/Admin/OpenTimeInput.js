import React, { useState } from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { IconButton } from "../UI/StandardButton";
import dayjs from "dayjs";

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
  // Use state variables containing dayjs objects for
  // the Material-UI TimePickers to interact with.
  const [openingTime, setOpeningTime] = useState(
    values.open ? dayjs(values.open, "HH:mm:ss") : null
  );
  const [closingTime, setClosingTime] = useState(
    values.close ? dayjs(values.close, "HH:mm:ss") : null
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <TimePicker
            label="Opening Time"
            inputVariant="outlined"
            value={openingTime}
            renderInput={(params) => <TextField {...params} />}
            DialogProps={{ color: "secondary" }}
            onChange={(dt) => {
              setOpeningTime(dt);
              // Pass dt to parent component as null, unless it's a valid
              // dayjs date, in which case we trnslate to HH:mm:ss format
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
          <TimePicker
            autoOk
            label="Closing Time"
            inputVariant="outlined"
            renderInput={(params) => <TextField {...params} />}
            value={closingTime}
            onChange={(dt) => {
              setClosingTime(dt);
              // Pass dt to parent component as null, unless it's a valid
              // dayjs date, in which case we trnslate to HH:mm:ss format
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
            icon="cancel"
            color="error"
            size="large"
            onClick={removeInput}
          />
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton
            icon="wrapText"
            color="primary"
            size="large"
            onClick={copyInput}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
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
