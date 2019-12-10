import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { initialState } from "../hooks/useStakeholders/initialState";
// import { RotateLoader } from "react-spinners";
import StakeholderSearch from "./StakeholderSearch";
import StakeholderCriteria from "./StakeholderCriteria";
import StakeholderList from "./StakeholderList";
import Map from "./Map";
import { useStakeholders } from "../hooks/useStakeholders/useStakeholders";
import queryString from "query-string";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem"
  },
  header: {
    display: "flex"
  }
};

const applyQueryStringParameters = (history, defaultState) => {
  let {
    searchString,
    selectedLatitude,
    selectedLongitude,
    selectedLocationName,
    selectedDistance,
    selectedCategoryIds
  } = defaultState;

  const params = queryString.parse(history.location.search);

  // override initial search parameters with any
  // query string parameters
  searchString = params.name || searchString;
  selectedDistance = params.radius || selectedDistance;
  selectedLatitude = Number.parseFloat(params.lat) || selectedLatitude;
  selectedLongitude = Number.parseFloat(params.lon) || selectedLongitude;
  if (params.categoryIds) {
    selectedCategoryIds = params.categoryIds.split(",");
  }

  const initialState = {
    searchString,
    selectedLatitude,
    selectedLongitude,
    selectedLocationName,
    selectedDistance,
    selectedCategoryIds
  };

  return initialState;
};

function StakeholdersContainer(props) {
  const { history } = props;

  const modifiedInitialState = applyQueryStringParameters(
    history,
    initialState
  );

  const { state, dispatch, actionTypes, search } = useStakeholders(
    modifiedInitialState,
    history
  );
  const [isMapView, setIsMapView] = React.useState(true);

  const openSearchPanel = isOpen => {
    dispatch({ type: actionTypes.TOGGLE_SEARCH_PANEL, isOpen });
  };

  const {
    stakeholders,
    categories,
    searchString,
    selectedLongitude,
    selectedLatitude,
    selectedLocationName,
    selectedDistance,
    selectedCategories,
    isSearchPanelOpen,
    isLoading,
    latitude,
    longitude
  } = state;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Typography
          variant={"h4"}
          component={"h4"}
          align="center"
          style={{ marginBottom: "0.5em" }}
        >
          Stakeholders{" "}
        </Typography>
      </div>
      <div>
        {isSearchPanelOpen ? (
          <StakeholderSearch
            key={selectedLatitude}
            latitude={latitude}
            longitude={longitude}
            selectedLatitude={selectedLatitude}
            selectedLongitude={selectedLongitude}
            selectedLocationName={selectedLocationName}
            categories={categories}
            searchString={searchString}
            selectedCategories={selectedCategories}
            selectedDistance={selectedDistance}
            search={search}
            switchResultsView={() => setIsMapView(!isMapView)}
            isMapView={isMapView}
          />
        ) : (
          <StakeholderCriteria
            key={selectedLatitude}
            latitude={selectedLatitude}
            longitude={selectedLongitude}
            searchString={searchString}
            selectedCategories={selectedCategories}
            selectedDistance={selectedDistance}
            openSearchPanel={openSearchPanel}
            switchResultsView={() => setIsMapView(!isMapView)}
            isMapView={isMapView}
          />
        )}
        {/* TODO: make a loading component! */}
        {isLoading ? (
          // <div
          //   style={{
          //     height: "200",
          //     width: "100%",
          //     margin: "100px auto",
          //     display: "flex",
          //     justifyContent: "space-around"
          //   }}
          // >
          //   <RotateLoader
          //     // css={}
          //     sizeUnit={"px"}
          //     size={15}
          //     color={"#266294"}
          //     loading={true}
          //   />
          // </div>
          <div>Loading...</div>
        ) : isMapView && selectedLatitude && selectedLongitude ? (
          <Map
            stakeholders={stakeholders}
            selectedLatitude={selectedLatitude}
            selectedLongitude={selectedLongitude}
          />
        ) : (
          <StakeholderList stakeholders={stakeholders} />
        )}
      </div>
      <pre>{JSON.stringify({ latitude, longitude }, null, 2)}</pre>
      <pre>
        {JSON.stringify({ selectedLatitude, selectedLongitude }, null, 2)}
      </pre>
      <pre>{JSON.stringify(props.match, null, 2)}</pre>
      <pre>{JSON.stringify(props.history, null, 2)}</pre>
    </div>
  );
}

export default withRouter(StakeholdersContainer);
