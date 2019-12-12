import React, { useState, useEffect } from "react";
//import OpenTimeInputs from "./OpenTimeInput";
import Button from "@material-ui/core/Button";

function OpenTimeForm(props) {
  const { handleChange, originalData } = props;
  const [inputs, setInputs] = useState([
    {
      weekOfMonth: 0,
      dayOfWeek: "",
      open: "",
      close: ""
    }
  ]);

  useEffect(() => {
    // uses the handleChange from Formik to change form
    handleChange({ target: { value: inputs, name: "hours" } });
  }, [inputs, handleChange]);

  useEffect(() => {
    setInputs(originalData);
  }, [originalData]);

  const addInput = () => {
    let newList = [
      ...inputs,
      { weekOfMonth: 0, dayOfWeek: "", open: "", close: "" }
    ];
    setInputs(newList);
  };

  const removeInput = index => {
    let newList = inputs.slice().filter((val, i) => i !== index);
    setInputs(newList);
  };

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

  const inputsMap = () =>
    inputs.map((val, i) => {
      let stateChange = (value, name) => {
        let newList = [...inputs];
        if (name === "open" || name === "close") {
          newList[i][name] = handleTime(value);
        } else {
          newList[i][name] = value;
        }
        setInputs(newList);
      };

      return (
        <div key={i}>
          {/* <OpenTimeInputs
            values={val}
            stateChange={stateChange}
            removeInput={removeInput}
            index={i}
          /> */}
        </div>
      );
    });

  return (
    <div>
      <div>{inputsMap()}</div>
      <Button onClick={addInput}>Add Another Time</Button>
    </div>
  );
}

export default OpenTimeForm;
