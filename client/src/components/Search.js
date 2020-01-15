import React, { useContext, useState } from 'react';
import Downshift from 'downshift';
import { MenuItem, TextField, Paper } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import { useMapboxGeocoder } from 'hooks/useMapboxGeocoder';
import { store } from 'state/store';

const useStyles = makeStyles(() => ({
  paper: {
    maxHeight: '150px',
    overflowY: 'auto',
    marginTop: 0,
    borderRadius: 4,
  },
  container: {
    width: '100%',
  },
  address: {
    backgroundColor: '#fff',
    borderRadius: '4px 0 0 4px',
    height: 41,
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 14px) scale(1)',
    },
    '& .MuiOutlinedInput-input': {
      padding: '11.5px 14px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px 0 0 4px',
    },
  },
}));

export default function Search({ fetchLocation, setCoordinates }) {
  const classes = useStyles();
  const [selectedPlace, setSelectedPlace] = useState('');
  const {
    error,
    isLoading,
    mapboxResults,
    fetchMapboxResults,
  } = useMapboxGeocoder();
  const globalState = useContext(store);
  const { dispatch } = globalState;

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
    const { InputProps, classes, availableItems, selectedItem } = inputProps;

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
    const {
      item,
      index,
      itemProps,
      highlightedIndex,
      selectedItem,
      inputValue,
    } = params;
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
      item,
      index,
      highlightedIndex,
      selectedItem,
      inputValue,
      mapboxResults,
      getItemProps,
    } = params;

    if (!inputValue) {
      return (
        <MenuItem
          component="div"
          onClick={() => {
            fetchLocation();
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
        const userCoordinates = {
          latitude: lat,
          longitude: long,
        };
        return renderSuggestion({
          item,
          index,
          itemProps: getItemProps({
            item: item.place_name,
            onClick: () => {
              setCoordinates(userCoordinates);
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
        itemToString={(item) => (item ? item.place_name : '')}
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

                {/* {mapboxResults.length > 0 &&
                  mapboxResults.slice(0, 10).map((item, index) =>
                    renderSuggestion({
                      item,
                      index,
                      itemProps: getItemProps({
                        item: item.place_name,
                      }),
                      highlightedIndex,
                      selectedItem,
                      inputValue,
                    }),
                  )} */}
              </Paper>
            )}
          </div>
        )}

        {/* {({
          selectedItem,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          clearSelection,
          highlightedIndex,
          isOpen,
          inputValue,
        }) => {
          return (
            <div style={{ width: 250, margin: 'auto', position: 'relative' }}>
              <label
                style={{
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: 10,
                }}
                {...getLabelProps()}
              >
                Search for a place
              </label>{' '}
              <div style={{ position: 'relative' }}>
                <input
                  {...getInputProps({
                    placeholder: 'Name, address, etc...',
                    onChange: handleInputChange,
                  })}
                  style={{ width: 175 }}
                />
                {selectedItem ? (
                  <button
                    onClick={clearSelection} // TODO: handleClearSelection to incorporate other necessary side effects
                    aria-label="clear selection"
                  >
                    X
                  </button>
                ) : (
                  <button {...getToggleButtonProps()}>Toggle</button>
                )}
              </div>
              {isOpen && (
                <ul
                  style={{
                    padding: 0,
                    marginTop: 0,
                    position: 'absolute',
                    backgroundColor: 'white',
                    width: '100%',
                    maxHeight: '20rem',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    outline: '0',
                    transition: 'opacity .1s ease',
                    borderRadius: '0 0 .28571429rem .28571429rem',
                    boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
                    borderColor: '#96c8da',
                    borderTopWidth: '0',
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: 'solid',
                  }}
                  {...getMenuProps({ isOpen })}
                >
                  <button
                    style={{ width: 200, margin: 15 }}
                    onClick={() => console.log('Hello')}
                  >
                    Use Current Location
                  </button>

                  {isLoading && <div disabled>Loading...</div>}

                  {error && <div disabled>Error!</div>}

                  {!isLoading && !error && !mapboxResults.length && (
                    <div>No results returned</div>
                  )}

                  {inputValue &&
                    mapboxResults.length > 0 &&
                    mapboxResults.slice(0, 10).map((item, index) => (
                      <div
                        {...getItemProps({
                          key: index,
                          index,
                          item,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem === item,
                        })}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        }}
                      >
                        <p>{item.place_name}</p>
                      </div>
                    ))}
                </ul>
              )}
            </div>
          );
        }}} */}
      </Downshift>
    </>
  );
}
