import React from "react";
import Downshift from "downshift";
import axios from "axios";
import debounce from "debounce-fn";
/**
 *
 * Landing:
 * - on mount, view is set to the 'landing view search' with minimal search box centered on the page
 * - search input will be autocomplete for either user's location (feed userCoordinates and fetchLocation to this component)
 * - using the selected coordinates, fire off a search() for stakeholders and transition to results view
 *
 * Results View:
 * - kind of a hybrid map/list, really
 * - no way to get back to Landing Page except for a page refresh
 *
 * - List will live in bottom of page, expand upward, and be scrollable
 * - List item:
 *    - on click of card,
 *
 *
 *
 **/

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibHVjYXNob21lciIsImEiOiJjazFqcnRjcm0wNmZ1M2JwZXg2eDFzMXd3In0.yYpkKLrFCxF-qyBfZH1a8w";
const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

const initialState = {
  isLoading: false,
  error: false,
  mapboxResults: [],
};

const actionTypes = {
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        mapboxResults: action.results,
      };
    case actionTypes.FETCH_FAILURE:
      console.log(action.error);
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
}

function useMapboxGeocoder() {
  const [{ isLoading, error, mapboxResults }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  const fetchMapboxResults = debounce(
    async searchString => {
      const mapboxUrl = `${baseUrl}/${searchString}.json?access_token=${MAPBOX_TOKEN}`;

      dispatch({ type: actionTypes.FETCH_REQUEST });
      try {
        const response = await axios.get(mapboxUrl);
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          results: response.data.features,
        });
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_FAILURE, error });
      }
    },
    { wait: 300 },
  );

  return { error, isLoading, mapboxResults, fetchMapboxResults };
}

export default function SearchLanding({ fetchLocation, userCoordinates }) {
  const [view, setView] = React.useState("SEARCH");
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
      {view === "SEARCH" && (
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
                <div
                  style={{ width: 250, margin: "auto", position: "relative" }}
                >
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
                            // className="dropdown-item"
                            {...getItemProps({
                              key: index,
                              index,
                              item,
                              isActive: highlightedIndex === index,
                              isSelected: selectedItem === item,
                            })}
                            style={{
                              backgroundColor:
                                highlightedIndex === index
                                  ? "lightgray"
                                  : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal",
                            }}
                          >
                            <p>{item.place_name}</p>
                          </div>
                        ))}
                    </ul>
                  )}
                  {/* {isOpen ? (
                    <div>
                      <button
                        style={{ width: 225 }}
                        onClick={() => console.log("Hello")}
                      >
                        Use Current Location
                      </button>

                      {mapboxResults
                        .filter(
                          item => !!item.text,
                          // !inputValue ||
                          // item.place_name
                          //   .toLowerCase()
                          // .includes(inputValue.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((item, index) => (
                          <div
                            className="dropdown-item"
                            {...getItemProps({ key: index, index, item })}
                            style={{
                              backgroundColor:
                                highlightedIndex === index
                                  ? "lightgray"
                                  : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal",
                            }}
                          >
                            <p>{item.place_name}</p>
                          </div>
                        ))}
                    </div>
                  ) : null} */}
                </div>
              );
            }}
          </Downshift>
          <div>
            <h3>Landing Page</h3>
            <button onClick={() => setView("RESULTS")}>Go to Results</button>
          </div>
        </>
      )}
      {view === "RESULTS" && (
        <div>
          <h3>Results Page</h3>
          <button onClick={() => setView("SEARCH")}>Go back to search</button>
        </div>
      )}
    </>
  );
}
