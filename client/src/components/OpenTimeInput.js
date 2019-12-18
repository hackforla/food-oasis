import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField
} from "@material-ui/core";
import { CancelIconButton } from "./Buttons";

const useStyles = makeStyles(theme => ({
  row: {
    margin: theme.spacing(1)
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 50,
    // maxWidth: 200
  }
}));

const days = [
  { label: "(Select)", value: "" },
  { label: "Sun", value: "Sun" },
  { label: "Mon", value: "Mon" },
  { label: "Tue", value: "Tue" },
  { label: "Wed", value: "Wed" },
  { label: "Thu", value: "Thu" },
  { label: "Fri", value: "Fri" },
  { label: "Sat", value: "Sat" }
];

const intervals = [
  { label: "Every", value: 0 },
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Last", value: -1 }
];

function OpenTimeInput(props) {
  const classes = useStyles();
  const { values, stateChange, removeInput, index } = props;

  return (
    <Grid container spacing={1} className={classes.row}>
      <Grid item xs={12} sm={3}>
        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel>Interval</InputLabel>
          <Select
            labelId="open-days-select-id"
            id="open-days-select"
            labelWidth={75}
            onChange={e => stateChange(e.target.value, "weekOfMonth")}
            value={values.weekOfMonth}
          >
            {intervals.map(day => (
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
            labelWidth={75}
            onChange={e => stateChange(e.target.value, "dayOfWeek")}
            value={values.dayOfWeek}
          >
            {days.map(day => (
              <MenuItem key={day.value} label={day.label} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          onChange={e => stateChange(e.target.value, "open")}
          variant="outlined"
          fullWidth
          label="Opening Time"
          value={values.open}
        />
      </Grid>
      <Grid
        item
        xs={10}
        sm={3}
        styles={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          onChange={e => stateChange(e.target.value, "close")}
          variant="outlined"
          fullWidth
          label="Closing Time"
          value={values.close}
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <CancelIconButton onClick={() => removeInput(index)} />
      </Grid>
    </Grid>
  );
}

export default OpenTimeInput;