import React, { useState } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { MenuItem, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMapboxGeocoder } from "hooks/useMapboxGeocoder";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { defaultViewport } from "helpers/Configuration";
import { Input } from "../UI";

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
    backgroundColor: "#F0F0F0",
    borderRadius: "4px",
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

export default function SearchBar({
  userCoordinates,
  setOrigin,
  origin,
  showSearchIcon,
}) {
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [newInputValue, updateNewInputValue] = useState(origin?.locationName);

  const { mapboxResults, fetchMapboxResults } = useMapboxGeocoder();

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
      <Grid container justifyContent="center" alignItems="center">
        <Input
          className={classes.address}
          margin="none"
          fullWidth
          placeholder="Search by address or zip code"
          name="address"
          size="small"
          autoFocus={false}
          InputProps={{
            endAdornment: showSearchIcon ? (
              <InputAdornment
                position="end"
                onClick={() => {
                  const defaultCoordinates = {
                    latitude: defaultViewport.center.latitude,
                    longitude: defaultViewport.center.longitude,
                  };
                  setOrigin(defaultCoordinates);
                }}
                className={classes.searchIconCont}
              >
                <SearchIcon />
              </InputAdornment>
            ) : (
              <div />
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
        onChange={handleDownshiftOnChange}
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

SearchBar.propTypes = {
  userCoordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  setOrigin: PropTypes.func,
  showSearchIcon: PropTypes.bool,
};

SearchBar.defaultProps = {
  showSearchIcon: false,
};
