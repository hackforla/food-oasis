import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StakeholderList from "../StakeholderList";
import StakeholderGrid from "../StakeholderGrid";
import Map from "../Map";
import { RotateLoader } from "react-spinners";
import { useOrganizations } from "../../hooks/useOrganizations/useOrganizations";
import { useCategories } from "../../hooks/useCategories/useCategories";

import SearchCriteria from "./SearchCriteria";

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
  const [view, setView] = useState("grid");
  const [criteria, setCriteria] = useState({
    name: "",
    latitude: 0,
    longitude: 0,
    placeName: "",
    radius: 10,
    categoryIds: [1, 8, 9],
    approvedOnly: false
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  const {
    data: stakeholders,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    search: stakeholderSearch
  } = useOrganizations();

  const search = async () => {
    await stakeholderSearch(criteria);
  };

  return (
    <main style={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px"
        }}
      >
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
        <FormControl style={{ minWidth: "120px" }}>
          <InputLabel id="view-select_label">Results View</InputLabel>
          <Select
            labelId="view-select_label"
            value={view}
            onChange={evt => {
              setView(evt.target.value);
            }}
          >
            <MenuItem value={"grid"}>Data Grid</MenuItem>
            <MenuItem value={"card"}>Cards</MenuItem>
            <MenuItem value={"map"}>Map</MenuItem>
          </Select>
        </FormControl>
      </div>
      <>
        {criteria ? (
          <ExpansionPanel style={{ backgroundColor: "#80ee80" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              style={{ borderBottom: "1px solid gray" }}
            >
              <Typography variant={"h5"} component={"h5"}>
                Search Criteria
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {/* <pre>{JSON.stringify(criteria, null, 2)}</pre> */}
              <SearchCriteria
                key={JSON.stringify({
                  userLatitude: userCoordinates.latitude,
                  categories
                })}
                userLatitude={userCoordinates.latitude}
                userLongitude={userCoordinates.longitude}
                categories={categories && categories.filter(c => !c.inactive)}
                criteria={criteria}
                setCriteria={setCriteria}
                search={search}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : null}

        {categoriesError || stakeholdersError ? (
          <div> Uh Oh! Something went wrong!</div>
        ) : categoriesLoading || stakeholdersLoading ? (
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
        ) : !stakeholders ? null : view === "card" ? (
          <StakeholderList stakeholders={stakeholders} />
        ) : view === "grid" ? (
          <StakeholderGrid stakeholders={stakeholders} />
        ) : (
          <Map
            stakeholders={stakeholders}
            selectedLatitude={criteria.latitude}
            selectedLongitude={criteria.longitude}
          />
        )}
      </>
    </main>
  );
}

export default withRouter(StakeholdersAdmin);
