import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OpenTimeInputs from "./OpenTimeInput";
import { Button, Card, CardContent, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Add as AddIcon } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: theme.palette.error.main,
  },
}));

function OpenTimeForm(props) {
  const { value: hours, onChange } = props;
  const classes = useStyles();
  const [errorMessages, setErrorMessages] = useState([]);

  const validate = (hours) => {
    let messages = [];
    for (let i = 0; i < hours.length; i++) {
      const row = hours[i];
      if (!row.weekOfMonth && row.weekOfMonth !== 0) {
        messages.push(`Row ${i + 1}: Week of Month is required`);
      }
      if (!row.dayOfWeek) {
        messages.push(`Row ${i + 1}: Day of Week is required`);
      }
      if (!row.open) {
        messages.push(`Row ${i + 1}: Opening  Time is required`);
      }
      if (!row.close) {
        messages.push(`Row ${i + 1}: Closing Time is required`);
      }
    }
    return messages;
  };

  useEffect(() => {
    setErrorMessages(validate(hours));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (newHours) => {
    //   setHours(newHours);
    setErrorMessages(validate(newHours));
    onChange({ target: { value: newHours, name: "hours" } });
  };

  const addHours = () => {
    let newHours = JSON.parse(JSON.stringify(hours));
    newHours.push({ weekOfMonth: 0, dayOfWeek: "", open: "", close: "" });
    handleChange(newHours);
  };

  const removeHours = (e, index) => {
    let newHours = hours.filter((val, i) => i !== index);
    handleChange(newHours);
  };

  const copyHours = (e, index) => {
    let newHours = JSON.parse(JSON.stringify(hours));
    const newRange = { ...hours[index] };
    newHours.push(newRange);
    handleChange(newHours);
  };

  const stateChange = (e, rowIndex) => {
    let newHours = JSON.parse(JSON.stringify(hours));
    newHours[rowIndex][e.target.name] = e.target.value;
    handleChange(newHours);
  };

  const inputsMap = hours.map((val, rowIndex) => {
    return (
      <div key={rowIndex}>
        <OpenTimeInputs
          values={val}
          rowIndex={rowIndex}
          onChange={(e) => stateChange(e, rowIndex)}
          removeInput={(e) => removeHours(e, rowIndex)}
          copyInput={(e) => copyHours(e, rowIndex)}
        />
      </div>
    );
  });

  const addIcon = <AddIcon />;

  return (
    <Card style={{ border: "1px solid lightgray", borderRadius: "4px" }}>
      <CardContent>
        <Typography>Hours</Typography>
        <div>{inputsMap}</div>
        {errorMessages.length > 0
          ? errorMessages.map((msg) => (
              <div key={msg} className={classes.errorText}>
                {msg}
              </div>
            ))
          : null}
        <Button
          variant="outlined"
          type="button"
          onClick={addHours}
          icon="add"
          startIcon={addIcon}
        >
          Add Hours
        </Button>
      </CardContent>
    </Card>
  );
}

OpenTimeForm.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default OpenTimeForm;
