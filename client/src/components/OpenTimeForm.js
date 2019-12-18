import React, { useState, useEffect } from "react";
import OpenTimeInputs from "./OpenTimeInput";
import { AddButton } from "./Buttons";
import { Card, CardContent, Typography } from "@material-ui/core";

function OpenTimeForm(props) {
  const { originalHours, handleChange } = props;
  const [hours, setHours] = useState([]);


  useEffect(() => {
    setHours([...originalHours]);
  }, [originalHours]);

  const addHours = () => {
    let newList = [
      ...hours,
      { weekOfMonth: 0, dayOfWeek: "", open: "", close: "" }
    ];
    handleInputs(newList);
  };

  const removeHours = index => {
    let newList = hours.slice().filter((val, i) => i !== index);
    handleInputs(newList);
	};
	
	const handleInputs = (inputs) => {
		setHours(inputs);
		handleChange({ target: { value: inputs, name: "hours" } });

	}

  const handleTime = number => {
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

  const inputsMap = hours.map((val, i) => {
    let stateChange = (value, name) => {
      let newList = [...hours];
      if (name === "open" || name === "close") {
        newList[i][name] = handleTime(value);
      } else {
        newList[i][name] = value;
      }
      handleInputs(newList);
    };

    return (
      <div key={i}>
        <OpenTimeInputs
          values={val}
          stateChange={stateChange}
          removeInput={removeHours}
          index={i}
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
