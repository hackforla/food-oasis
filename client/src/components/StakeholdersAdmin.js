import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import StakeholderList from "./StakeholderList";
import { RotateLoader } from "react-spinners";
import { useOrganizations } from "../hooks/useOrganizations/useOrganizations";
import { useCategories } from "../hooks/useCategories/useCategories";

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

function StakeholdersAdmin(props) {
  const { history, userCoordinates } = props;
  const [criteria, setCriteria] = useState({
    name: "",
    latitude: 33.837,
    longitude: -118.373,
    radius: 5000,
    categoryIds: [1, 8, 9]
  });

  const [stakeholders, setStakeholders] = useState(null);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  const {
    data,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    search: stakeholderSearch
  } = useOrganizations();

  useEffect = (() => {}, [criteria]);

  const search = async () => {
    const stakeholders = await stakeholderSearch(criteria);
    setStakeholders(stakeholders);
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <Typography
          variant={"h4"}
          component={"h4"}
          align="center"
          style={{ marginBottom: "0.5em" }}
        >
          Stakeholders{" "}
        </Typography>
      </header>
      <>
        {/* {isSearchPanelOpen ? (
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
            selectedLocationName={selectedLocationName}
            searchString={searchString}
            selectedCategories={selectedCategories}
            selectedDistance={selectedDistance}
            openSearchPanel={openSearchPanel}
            switchResultsView={() => setIsMapView(!isMapView)}
            isMapView={isMapView}
          />
        )} */}
        <button onClick={search}>Search</button>
        {categoriesLoading || stakeholdersLoading ? (
          <div
            style={{
              height: "200",
              width: "100%",
              margin: "100px auto",
              display: "flex",
              justifyContent: "space-around"
            }}
            aria-label="Loading spinner"
          >
            <RotateLoader
              // css={}
              sizeUnit={"px"}
              size={15}
              color={"#FAEBD7"}
              loading={true}
            />
          </div>
        ) : (
          <StakeholderList stakeholders={stakeholders} />
        )}
      </>
    </main>
  );
}

export default withRouter(StakeholdersAdmin);
