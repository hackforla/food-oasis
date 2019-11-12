import React from "react";
import { Typography } from "@material-ui/core";
import StakeholderSearch from "./StakeholderSearch";
import StakeholderCriteria from "./StakeholderCriteria";
import StakeholderList from "./StakeholderList";
import { useStakeholders } from "../hooks/useStakeholders/useStakeholders";

function StakeholdersContainer() {
  const { state, dispatch, actionTypes, search } = useStakeholders();

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
    <React.Fragment>
      <Typography
        variant={"h4"}
        component={"h1"}
        align="center"
        style={{ marginBottom: "0.5em" }}
      >
        Stakeholders{" "}
      </Typography>
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
      {isLoading ? null : <StakeholderList stakeholders={stakeholders} />}
    </React.Fragment>
  );
}

export default StakeholdersContainer;
