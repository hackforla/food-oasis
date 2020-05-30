import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
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
  const { values, onChange, removeInput, copyInput } = props;

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
        <TextField
          type="time"
          name="open"
          onChange={onChange}
          variant="outlined"
          fullWidth
          label="Opening Time"
          value={values.open}
          inputProps={{ step: 300 }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        sm={2}
        styles={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="close"
          type="time"
          inputProps={{ step: 300 }}
          onChange={onChange}
          variant="outlined"
          fullWidth
          label="Closing Time"
          value={values.close}
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
  onChange: PropTypes.func,
  removeInput: PropTypes.func,
  copyInput: PropTypes.func,
};

export default OpenTimeInput;
