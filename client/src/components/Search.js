import React, { useState } from 'react';
import Downshift from 'downshift';
import { MenuItem, TextField, Paper } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import { useMapboxGeocoder } from 'hooks/useMapboxGeocoder';

const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    maxHeight: '150px',
    overflowY: 'auto',
    marginTop: 0,
    borderRadius: 4,
    zIndex: 1,
  },
  container: {
    width: '100%',
  },
  address: {
    width: "31em",
    backgroundColor: '#fff',
    borderRadius: '4px 0 0 4px',
    height: 41,
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px 0 0 4px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '11.5px 14px',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 14px) scale(1)',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#63A4E5',
      borderRight: 'none',
    },
  },
}));

export default function Search(props) {
  const { userCoordinates, setOrigin } = props
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = useState('');

  const { mapboxResults, fetchMapboxResults } = useMapboxGeocoder();

  const handleInputChange = (event) => {
    setSelectedPlace(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchMapboxResults(event.target.value);
  };

  const handleDownshiftOnChange = (selectedResult) => {
    setSelectedPlace(selectedResult);
  };

  const renderInput = (inputProps) => {
    const { InputProps, classes } = inputProps;

    return (
      <TextField
        className={classes.address}
        variant="outlined"
        margin="none"
        fullWidth
        placeholder="Enter an address, neighborhood, ZIP"
        name="address"
        size="small"
        autoFocus
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...InputProps,
        }}
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

  const renderResults = (params) => {
    const {
      highlightedIndex,
      selectedItem,
      inputValue,
      mapboxResults,
      getItemProps,
    } = params;

    if (!inputValue && userCoordinates && userCoordinates.latitude) {
      return (
        <MenuItem
          component="div"
          onClick={() => {
            setOrigin({ ...userCoordinates, locationName: 'Current Location' });
            handleDownshiftOnChange('Current Location');
          }}
        >
          <LocationOnIcon /> Current Location
        </MenuItem>
      );
    }

    return (
      mapboxResults.length > 0 &&
      mapboxResults.slice(0, 10).map((item, index) => {
        const [long, lat] = item.center;
        const itemCoordinates = {
          latitude: lat,
          longitude: long,
        };
        return renderSuggestion({
          item,
          index,
          itemProps: getItemProps({
            item: item.place_name,
            onClick: () => {
              setOrigin({
                ...itemCoordinates,
                locationName: item.place_name,
              });
            },
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
          return item ? item.place_name : '';
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
                selectedItem,
                availableItems: mapboxResults,
                InputProps: {
                  ...getInputProps({
                    onClick: () => toggleMenu(),
                    onChange: handleInputChange,
                    value: inputValue || selectedPlace,
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
