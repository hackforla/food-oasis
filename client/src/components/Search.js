import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { MenuItem, TextField, Paper } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from "@material-ui/core/styles";
import { useMapboxGeocoder } from "hooks/useMapboxGeocoder";

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
    [theme.breakpoints.down("sm")]: {
      marginLeft: ".5rem",
    },
    position: "relative",
  },
  address: {
    backgroundColor: "#fff",
    borderRadius: "4px 0 0 4px",
    cornerRadius: "6px",
    height: 40,

    // "& .MuiOutlinedInput-root": {
    //   borderRadius: "4px 0 0 4px",
    // },
    // "& .MuiOutlinedInput-input": {
    //   padding: "11.5px 14px",
    // },
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
}));

export default function Search({ userCoordinates, setOrigin, origin }) {
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [newInputValue, updateNewInputValue] = useState(origin?.locationName);

  const { mapboxResults, fetchMapboxResults } = useMapboxGeocoder();

  const initialWidth = window.innerWidth > 960 ? true : false;
  const [isWindow960orLess, switchAddressWidth] = useState(initialWidth);
  useEffect(() => {
    const changeAddressWidth = () => {
      window.innerWidth > 960
        ? switchAddressWidth(true)
        : switchAddressWidth(false);
    };

    window.addEventListener("resize", changeAddressWidth);

    return () => window.removeEventListener("resize", changeAddressWidth);
  });

  const handleInputChange = (event) => {
    setSelectedPlace(event.target.value);
    updateNewInputValue(event.target.value);
    fetchMapboxResults(event.target.value);
  };

  const handleDownshiftOnChange = (selectedResult) => {
    setSelectedPlace(selectedResult);

    const result = mapboxResults.find(
      (item) => item.place_name === selectedResult
    );
    if (result) {
      const [long, lat] = result.center;
      const itemCoordinates = {
        latitude: lat,
        longitude: long,
      };
      setOrigin({
        ...itemCoordinates,
        locationName: result.place_name,
      });
    }
  };

  const renderInput = ({ InputProps, classes }) => {
    return (
      <TextField
        className={classes.address}
        variant="outlined"
        margin="none"
        fullWidth
        placeholder="Search by address or zip code"
        name="address"
        size="small"
        autoFocus={false}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...InputProps,
        }}
        style={{ width: isWindow960orLess ? "27rem" : "100%" }}
      />
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
    if (!inputValue && userCoordinates && userCoordinates.latitude) {
      return (
        <MenuItem
          component="div"
          onClick={() => {
            setOrigin({ ...userCoordinates, locationName: "Current Location" });
            handleDownshiftOnChange("Current Location");
          }}
        >
          <LocationOnIcon /> Current Location
        </MenuItem>
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
        onChange={handleDownshiftOnChange}
        itemToString={(item) => {
          return item ? item.place_name : "";
        }}
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
                    setSelectedPlace("");
                    updateNewInputValue("");
                    toggleMenu();
                  },
                  onChange: handleInputChange,
                  value:
                    newInputValue && !selectedPlace
                      ? newInputValue
                      : inputValue || selectedPlace,
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

Search.propTypes = {
  userCoordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  setOrigin: PropTypes.func,
};
