import React, { useState, useEffect } from "react";
import OpenTimeInputs from "./OpenTimeInput";
import { AddButton } from "./Buttons";
import { Card, CardContent, Typography } from "@material-ui/core";

function OpenTimeForm(props) {
<<<<<<< HEAD
  const { value, onChange } = props;
  const [hours, setHours] = useState(props.value);

  // useEffect(() => {
  //   // uses the handleChange from Formik to change form
  //   props.handleChange({ target: { value: hours, name: "hours" } });
  // }, [hours, props.handleChange]);

  useEffect(() => {
    setHours(value);
  }, [value]);

  const handleChange = () => {
    onChange({ target: { value: hours, name: "hours" } });
  };
=======
  const { originalHours, handleChange } = props;
  const [hours, setHours] = useState([]);

  useEffect(() => {
    setHours([...originalHours]);
  }, [originalHours]);
>>>>>>> origin/master

  const addHours = () => {
    let newList = [
      ...hours,
      { weekOfMonth: 0, dayOfWeek: "", open: "", close: "" }
    ];
<<<<<<< HEAD
    setHours(newList);
    handleChange();
=======
    handleInputs(newList);
>>>>>>> origin/master
  };

  const removeHours = (e, index) => {
    let newList = hours.slice().filter((val, i) => i !== index);
<<<<<<< HEAD
    setHours(newList);
    handleChange();
  };

  const stateChange = (e, rowIndex) => {
    let newList = [...hours];
    const name = e.target.name;
    const value = e.target.value;
    if (name === "open" || name === "close") {
      newList[rowIndex][name] = handleTime(value);
    } else {
      newList[rowIndex][name] = value;
    }
    setHours(newList);
    handleChange();
  };
=======
    handleInputs(newList);
	};
	
  const handleInputs = (inputs) => {
     setHours(inputs);
     handleChange({ target: { value: inputs, name: "hours" } });
  }
>>>>>>> origin/master

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

<<<<<<< HEAD
  const inputsMap = hours.map((val, rowIndex) => {
=======
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

>>>>>>> origin/master
    return (
      <div key={rowIndex}>
        <OpenTimeInputs
          values={val}
          onChange={e => stateChange(e, rowIndex)}
          removeInput={e => removeHours(e, rowIndex)}
          index={rowIndex}
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
