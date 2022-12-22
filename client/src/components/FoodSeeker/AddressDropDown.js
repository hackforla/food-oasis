import React, { useState } from "react";
import Downshift from "downshift";
import { MenuItem, Paper, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useMapboxGeocoder } from "hooks/useMapboxGeocoder";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "../UI";
import {
  useSearchCoordinates,
  useAppDispatch,
  useUserCoordinates,
  useWidget,
} from "../../appReducer";
import { useHistory } from "react-router";
import * as analytics from "services/analytics";

const useStyles = makeStyles((theme) => ({
  paper: {
    // width: "34.5em",
    position: "absolute",
    top: "35px",
    left: 0,
    right: 0,
    width: "auto",
    height: "auto",
    maxHeight: "150px",
    overflowY: "auto",
    marginTop: 0,
    borderRadius: 4,
    zIndex: 1,
  },
  container: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      marginLeft: ".5rem",
    },
    position: "relative",
  },
  address: {
    backgroundColor: "#F0F0F0",
    borderRadius: "14px",
    cornerRadius: "4px",
    height: 40,
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 14px) scale(1)",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
      borderRight: "none",
    },
  },
  input: {
    "&::placeholder": {
      opacity: "1",
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
  const { mapboxResults, fetchMapboxResults } = useMapboxGeocoder();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userCoordinates = useUserCoordinates();

  // const initialWidth = window.innerWidth > 960 ? true : false;
  // const [isWindow960orLess, switchAddressWidth] = useState(initialWidth);

  // useEffect(() => {
  //   const changeAddressWidth = () => {
  //     // window.innerWidth > 960
  //     !isWindow960orLess ? switchAddressWidth(true) : switchAddressWidth(false);
  //   };

  //   window.addEventListener("resize", changeAddressWidth);

  //   return () => window.removeEventListener("resize", changeAddressWidth);
  // });

  const handleInputChange = (delta) => {
    const safeValue = typeof delta === "string" ? delta : delta.target.value;
    setInputVal(safeValue);
    if (safeValue) {
      handleDownshiftOnChange(safeValue);
      fetchMapboxResults(safeValue);
    }
  };

  const handleDownshiftOnChange = (selectedResult) => {
    const result = mapboxResults.find(
      (item) => item.place_name === selectedResult
    );
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

  const renderInput = ({ InputProps, classes }) => {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          className={classes.address}
          margin="none"
          fullWidth
          placeholder="Search by address or zip code"
          name="address"
          size="small"
          autoFocus={false}
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
            classes: {
              input: classes.input,
            },
            ...InputProps,
          }}
        />
      </Grid>
    );
  };

  const renderSuggestion = (params) => {
    const { item, index, itemProps, highlightedIndex, selectedItem } = params;
    if (!item) return;
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem && selectedItem.indexOf(item.name) > -1;

    return (
      !isSelected && (
        <MenuItem
          {...itemProps}
          key={item.id}
          selected={isHighlighted}
          component="div"
        >
          {item.place_name}
        </MenuItem>
      )
    );
  };

  const renderResults = ({
    highlightedIndex,
    selectedItem,
    inputValue,
    mapboxResults,
    getItemProps,
  }) => {
    if (!inputValue && userCoordinates) {
      return (
        <></>
        // <MenuItem
        //   component="div"
        //   onClick={() => {
        //     setOrigin({ ...userCoordinates, locationName: "Current Location" });
        //     handleDownshiftOnChange("Current Location");
        //   }}
        // >
        //   <LocationOnIcon /> Current Location
        // </MenuItem>
      );
    }

    return (
      mapboxResults.length > 0 &&
      mapboxResults.slice(0, 10).map((item, index) => {
        return renderSuggestion({
          item,
          index,
          itemProps: getItemProps({
            item: item.place_name,
          }),
          highlightedIndex,
          selectedItem,
          inputValue,
        });
      })
    );
  };

  return (
    <>
      <Downshift
        onChange={(value) => handleInputChange(value)}
        itemToString={(item) => (item ? item.place_name : "")}
      >
        {({
          getInputProps,
          getItemProps,
          inputValue,
          selectedItem,
          highlightedIndex,
          toggleMenu,
          isOpen,
        }) => (
          <div className={classes.container}>
            {renderInput({
              classes,
              InputProps: {
                ...getInputProps({
                  onClick: () => {
                    handleInputChange("");
                    toggleMenu();
                  },
                  onChange: handleInputChange,
                  value: inputVal,
                }),
              },
            })}

            {isOpen && (
              <Paper className={classes.paper} square>
                {renderResults({
                  highlightedIndex,
                  selectedItem,
                  inputValue,
                  mapboxResults,
                  getItemProps,
                })}
              </Paper>
            )}
          </div>
        )}
      </Downshift>
    </>
  );
}
