import React, { useState, useEffect } from "react";
import OpenTimeInputs from "./OpenTimeInput";
import { AddButton } from "./Buttons";
import { Card, CardContent, Typography } from "@material-ui/core";

function OpenTimeForm(props) {
  const { value, onChange } = props;
  const [hours, setHours] = useState(props.value);

  useEffect(() => {
    setHours(value);
  }, [value]);

  const handleChange = (newHours) => {
    setHours(newHours);
    onChange({ target: { value: newHours, name: "hours" } });
  };

  const addHours = () => {
    let newHours = [
      ...hours,
      { weekOfMonth: 0, dayOfWeek: "", open: "", close: "" },
    ];
    handleChange(newHours);
  };

  const removeHours = (e, index) => {
    let newHours = hours.filter((val, i) => i !== index);
    handleChange(newHours);
  };

  const stateChange = (e, rowIndex) => {
    let newHours = [...hours];
    const name = e.target.name;
    const value = e.target.value;
    if (name === "open" || name === "close") {
      newHours[rowIndex][name] = handleTime(value);
    } else {
      newHours[rowIndex][name] = value;
    }
    handleChange(newHours);
  };

  const handleTime = (number) => {
    //formats time input into HH:MM:SS format
    let output = "";
    number.replace(
      /^\D*(\d{0,2})\D*(\d{0,2})\D*(\d{0,2})/,
      (match, hh, mm, ss) => {
        if (hh.length) {
          output += hh;
          if (mm.length) {
            output += `:${mm}`;
            if (ss.length) {
              output += `:${ss}`;
            }
          }
        }
      }
    );
    return output;
  };

  const inputsMap = hours.map((val, rowIndex) => {
    return (
      <div key={rowIndex}>
        <OpenTimeInputs
          values={val}
          onChange={(e) => stateChange(e, rowIndex)}
          removeInput={(e) => removeHours(e, rowIndex)}
        />
      </div>
    );
  });

  return (
    <Card style={{ border: "1px solid lightgray", borderRadius: "4px" }}>
      <CardContent>
        <Typography>Hours</Typography>
        <div>{inputsMap}</div>
        <AddButton onClick={addHours} label={"Add Hours"} />
      </CardContent>
    </Card>
  );
}

export default OpenTimeForm;
