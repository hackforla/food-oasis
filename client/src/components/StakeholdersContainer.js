import React from "react";
import MapIcon from "@material-ui/icons/Map";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { Typography, IconButton } from "@material-ui/core";
import StakeholderSearch from "./StakeholderSearch";
import StakeholderCriteria from "./StakeholderCriteria";
import StakeholderList from "./StakeholderList";
import Map from "./Map";
import { useStakeholders } from "../hooks/useStakeholders/useStakeholders";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
};
function StakeholdersContainer() {
  const { state, dispatch, actionTypes, search } = useStakeholders();
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
    selectedDistance,
    selectedCategories,
    isSearchPanelOpen,
    isLoading,
  } = state;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Typography
          variant={"h4"}
          component={"h1"}
          align="center"
          style={{ marginBottom: "0.5em" }}
        >
          Stakeholders{" "}
        </Typography>
        <IconButton
          onClick={() => setIsMapView(!isMapView)}
          title={`Go to ${isMapView ? "List" : "Map"}`}
        >
          {isMapView && <FormatListBulletedIcon />}
          {!isMapView && <MapIcon style={{ color: "#90C146" }} />}
        </IconButton>
      </div>
      <div>
        {isSearchPanelOpen ? (
          <StakeholderSearch
            key={selectedLatitude}
            latitude={selectedLatitude}
            longitude={selectedLongitude}
            categories={categories}
            searchString={searchString}
            selectedCategories={selectedCategories}
            selectedDistance={selectedDistance}
            search={search}
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
          />
        )}
        {/* TODO: make a loading component! */}
        {isLoading ? (
          <h3>Loading...</h3>
        ) : isMapView ? (
          <Map
            stakeholders={stakeholders}
            selectedLatitude={selectedLatitude}
            selectedLongitude={selectedLongitude}
          />
        ) : (
          <StakeholderList stakeholders={stakeholders} />
        )}
      </div>
    </div>
  );
}

export default StakeholdersContainer;
