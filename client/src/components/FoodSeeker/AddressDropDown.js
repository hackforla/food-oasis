import React, { useState } from "react";
import { MenuItem, Autocomplete } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useMapboxGeocoder } from "hooks/useMapboxGeocoder";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "../UI";
import {
  useSearchCoordinates,
  useAppDispatch,
  useWidget,
} from "../../appReducer";
import { useHistory } from "react-router";
import * as analytics from "services/analytics";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    maxWidth: "auto",
    height: "auto",
    maxHeight: "150px",
    overflow: "auto",
  },
  label: {
    textOverflow: "ellipsis",
    paddingRight: "20px",
    color: "#252525",
  },
  input: {
    "&::placeholder": {
      opacity: "1",
      backgroundColor: "#F0F0F0",
    },
  },
  searchIconCont: {
    cursor: "pointer",
  },
}));

export default function AddressDropDown({ showSearchIcon }) {
  const classes = useStyles();
  const searchCoordinates = useSearchCoordinates();
  const isWidget = useWidget();
  const [inputVal, setInputVal] = useState(
    searchCoordinates?.locationName || ""
  );
  const [open, setOpen] = useState(true);
  const { mapboxResults, fetchMapboxResults } = useMapboxGeocoder();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleInputChange = (delta) => {
    const safeValue = typeof delta === "string" ? delta : delta.target.value;
    setInputVal(safeValue);
    if (safeValue) {
      handleAutocompleteOnChange(safeValue);
      fetchMapboxResults(safeValue);
    }
  };

  const handleAutocompleteOnChange = (selectedResult) => {
    const result = mapboxResults.find(
      (item) => item.place_name === selectedResult
    );
    setOpen(false)
    setInputVal(selectedResult)
    if (result) {
      const [longitude, latitude] = result.center;
      
      dispatch({
        type: "SEARCH_COORDINATES_UPDATED",
        coordinates: { latitude, longitude, locationName: result.place_name },
      });
      history.push(isWidget ? "/widget" : "/organizations");

      analytics.postEvent("changeOrigin", {});
    }
  };

  const renderInput = (params) => {
    return (
      <TextField 
        {...params}
        label="Search by address or zip code"
        margin="none"
        fullWidth
        name="address"
        size="small"
        autoFocus={false}
        onClick={() => setInputVal("")}
        InputLabelProps={{
          className: classes.label
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => {
                history.push(isWidget ? "/widget" : "/organizations");
              }}
              className={classes.searchIconCont}
            >
              <SearchIcon />
            </InputAdornment>
          ),
          ...params.InputProps
        }}
      />
  )
  };

  const renderOption = (props, option) => {
    return (
      <MenuItem
        {...props}
        component="div"
        onClick={() => handleAutocompleteOnChange(option)}
      >
        {option}
      </MenuItem>
    )
  };

  return (
    <>
      <Autocomplete
        onInputChange={(value) => handleInputChange(value)}
        freeSolo
        inputValue={inputVal}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(event, newValue) => setInputVal(newValue)}
        options={mapboxResults.slice(0, 10).map((item) => item.place_name)}
        sx={{
          width: 600,
          backgroundColor: "#F0F0F0",
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
        classes={{
          paper: classes.paper,
          input: classes.input,
        }}
        renderInput={(params) => renderInput(params)}
        renderOption={(props, option) => renderOption(props, option)}
      />
    </>
  );
}