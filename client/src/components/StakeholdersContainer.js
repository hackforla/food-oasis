import React from "react";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import StakeholderSearch from "./StakeholderSearch";
import StakeholderCriteria from "./StakeholderCriteria";
import StakeholderList from "./StakeholderList";
import Map from "./Map";
import { useStakeholders } from "../hooks/useStakeholders/useStakeholders";

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

function StakeholdersContainer(props) {
  const { history } = props;
  const { state, dispatch, actionTypes, search } = useStakeholders(history);
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
      {/* <pre>{JSON.stringify({ latitude, longitude }, null, 2)}</pre>
      <pre>
        {JSON.stringify({ selectedLatitude, selectedLongitude }, null, 2)}
      </pre> */}
    </div>
  );
}

export default withRouter(StakeholdersContainer);
