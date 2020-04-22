import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CssBaseline, Dialog, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { SearchButton } from "../Buttons";
import StakeholderGrid from "../StakeholderGrid";
import { RotateLoader } from "react-spinners";
import { useOrganizations } from "../../hooks/useOrganizations/useOrganizations";
import { useCategories } from "../../hooks/useCategories/useCategories";

import SearchCriteria from "./SearchCriteria";

const CRITERIA_STORAGE_TOKEN = "stakeholderAdminCriteria";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
  },
  container: {
    flexGrow: 1,
    flexBasis: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    paddingBottom: "0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
}));

const DialogTitle = (props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <SearchButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeButton}
        />
      ) : null}
    </MuiDialogTitle>
  );
};

function StakeholdersAdmin(props) {
  const classes = useStyles();
  const { history, userCoordinates } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [criteria, setCriteria] = useState({
    name: "",
    latitude: userCoordinates.latitude,
    longitude: userCoordinates.longitude,
    placeName: "",
    radius: 0,
    categoryIds: [],
    isInactive: "either",
    isAssigned: "either",
    isVerified: "either",
    isApproved: "either",
    isRejected: "either",
    isClaimed: "either",
    assignedLoginId: null,
    claimedLoginId: null,
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    data: stakeholders,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    search: stakeholderSearch,
  } = useOrganizations();

  useEffect(() => {
    const criteriaString = localStorage.getItem(CRITERIA_STORAGE_TOKEN);
    const storedCriteria = JSON.parse(criteriaString);
    if (storedCriteria && stakeholderSearch) {
      setCriteria(storedCriteria);
      stakeholderSearch(storedCriteria);
    }
  }, []);

  const search = async () => {
    await stakeholderSearch(criteria);
    localStorage.setItem(CRITERIA_STORAGE_TOKEN, JSON.stringify(criteria));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    search();
    setDialogOpen(false);
  };

  return (
    <main className={classes.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <header className={classes.header}>
          <Typography
            variant={"h4"}
            component={"h4"}
            align="center"
            style={{ marginBottom: "0.5em" }}
          >
            Administrative Dashboard - Organizations
          </Typography>
          <SearchButton onClick={handleDialogOpen} label="Criteria..." />
        </header>
      </div>
      <div className={classes.root}>
        <CssBaseline />

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle onClose={handleDialogClose}>Search Criteria</DialogTitle>

          {criteria ? (
            <div style={{ overflowY: "scroll" }}>
              <SearchCriteria
                key={JSON.stringify({
                  userLatitude: userCoordinates.latitude,
                  categories,
                })}
                userLatitude={userCoordinates.latitude}
                userLongitude={userCoordinates.longitude}
                categories={categories && categories.filter((c) => !c.inactive)}
                criteria={criteria}
                setCriteria={setCriteria}
                search={() => {
                  search();
                  setDialogOpen(false);
                }}
              />
              {/* <pre>{JSON.stringify(criteria, null, 2)}</pre> */}
            </div>
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
                justifyContent: "space-around",
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
          ) : null}
        </Dialog>
        <>
          {categoriesError || stakeholdersError ? (
            <div> Uh Oh! Something went wrong!</div>
          ) : categoriesLoading || stakeholdersLoading ? (
            <div
              style={{
                height: "200",
                width: "100%",
                margin: "100px auto",
                display: "flex",
                justifyContent: "space-around",
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
          ) : stakeholders ? (
            <StakeholderGrid stakeholders={stakeholders} />
          ) : (
            "Please enter search criteria and execute a search"
          )}
          {/* <pre>{JSON.stringify(criteria, null, 2)}</pre> */}
        </>
      </div>
    </main>
  );
}

export default withRouter(StakeholdersAdmin);
