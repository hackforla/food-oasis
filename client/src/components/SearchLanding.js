import React from "react";
import Downshift from "downshift";
import { useMapboxGeocoder } from "../hooks/useMapboxGeocoder";

export default function SearchLanding({ fetchLocation, userCoordinates }) {
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const {
    error,
    isLoading,
    mapboxResults,
    fetchMapboxResults,
  } = useMapboxGeocoder();

  const handleInputChange = event => {
    if (!event.target.value) {
      return;
    }
    fetchMapboxResults(event.target.value);
  };

  const handleDownshiftOnChange = selectedResult => {
    console.log(selectedResult);
    setSelectedPlace(selectedResult);
  };

  console.log(selectedPlace);

  return (
    <>
      <Downshift
        onChange={handleDownshiftOnChange}
        itemToString={item => (item ? item.place_name : "")}
      >
        {({
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
            <div style={{ width: 250, margin: "auto", position: "relative" }}>
              <label
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: 10,
                }}
                {...getLabelProps()}
              >
                Search for a place
              </label>{" "}
              <div style={{ position: "relative" }}>
                <input
                  {...getInputProps({
                    placeholder: "Name, address, etc...",
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
                    position: "absolute",
                    backgroundColor: "white",
                    width: "100%",
                    maxHeight: "20rem",
                    overflowY: "auto",
                    overflowX: "hidden",
                    outline: "0",
                    transition: "opacity .1s ease",
                    borderRadius: "0 0 .28571429rem .28571429rem",
                    boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
                    borderColor: "#96c8da",
                    borderTopWidth: "0",
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                  }}
                  {...getMenuProps({ isOpen })}
                >
                  <button
                    style={{ width: 200, margin: 15 }}
                    onClick={() => console.log("Hello")}
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
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        }}
                      >
                        <p>{item.place_name}</p>
                      </div>
                    ))}
                </ul>
              )}
            </div>
          );
        }}
      </Downshift>
    </>
  );
}
