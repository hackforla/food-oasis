import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { Button, CssBaseline, Dialog, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { SearchButton } from "../Buttons";
import StakeholderGrid from "./VerificationAdminGrid";
import { RotateLoader } from "react-spinners";
import { useOrganizations } from "../../hooks/useOrganizations/useOrganizations";
import { useCategories } from "../../hooks/useCategories/useCategories";
import { useTenants } from "../../hooks/useTenants/useTenants";
import { useNeighborhoods } from "../../hooks/useNeighborhoods/useNeighborhoods";
import {
  needsVerification,
  assign,
  exportCsv,
} from "../../services/stakeholder-service";
import AssignDialog from "./AssignDialog";
import NeedsVerificationDialog from "./MessageConfirmDialog";
import SearchCriteria from "./SearchCriteria";

import * as suggestionService from "../../services/suggestion-service";
import SuggestionList from "../SuggestionList";

const CRITERIA_TOKEN = "verificationAdminCriteria";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexBasis: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    paddingBottom: "0",
  },
  mainContent: {
    flexGrow: 1,
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
  bigMessage: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    textAlign: "center",
    padding: "4em",
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

DialogTitle.propTypes = {
  children: PropTypes.string,
  onClose: PropTypes.func,
};

const defaultCriteria = {
  tenantId: 0,
  name: "",
  latitude: 34,
  longitude: -118,
  placeName: "",
  radius: 0,
  categoryIds: [],
  isInactive: "either",
  isAssigned: "either",
  isSubmitted: "either",
  isApproved: "either",
  isClaimed: "either",
  assignedLoginId: null,
  claimedLoginId: null,
  verificationStatusId: 0,
  neighborhoodId: 0,
  minCompleteCriticalPercent: 0,
  maxCompleteCriticalPercent: 100,
};

VerificationAdmin.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  userCoordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

function VerificationAdmin(props) {
  const { user, userCoordinates } = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [
    needsVerificationDialogOpen,
    setNeedsVerificationDialogOpen,
  ] = useState(false);
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [selectedStakeholderIds, setSelectedStakeholderIds] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { data: tenants } = useTenants();

  const {
    data: neighborhoods,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useNeighborhoods();

  const {
    data: stakeholders,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    searchDashboard: stakeholderSearch,
  } = useOrganizations();

  const searchCallback = useCallback(stakeholderSearch, []);

  const fetchSuggestions = async () => {
    const data = await suggestionService.getAll();
    setSuggestions(data);
  };

  useEffect(() => {
    const execute = async () => {
      const criteriaString = sessionStorage.getItem(CRITERIA_TOKEN);
      let initialCriteria = JSON.parse(criteriaString);
      if (!initialCriteria) {
        initialCriteria = {
          ...defaultCriteria,
          latitude: userCoordinates.latitude,
          longitude: userCoordinates.longitude,
          verificationStatusId: 0,
        };
      } else {
        initialCriteria = { ...defaultCriteria, ...initialCriteria };
      }
      setCriteria(initialCriteria);
      try {
        await searchCallback(initialCriteria);
      } catch (err) {
        // If we receive a 401 status code, the user needs
        // to be logged in, will redirect to login page.
        // Otherwise it's a real exception.
        if (err.status !== 401) {
          console.error(err);
          return Promise.reject(err.message);
        }
      }
    };
    execute();
  }, [userCoordinates, searchCallback]);

  const search = async () => {
    try {
      await searchCallback(criteria);
      sessionStorage.setItem(CRITERIA_TOKEN, JSON.stringify(criteria));
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.status !== 401) {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportCsv(selectedStakeholderIds);
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.response && err.response.status === 401) {
        setUnauthorized(true);
      } else {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
  };

  const handleAssignDialogOpen = async () => {
    setAssignDialogOpen(true);
    console.log(selectedStakeholderIds);
  };

  const handleAssignDialogClose = async (loginId) => {
    setAssignDialogOpen(false);
    // Dialog returns false if cancelled, null if
    // want to unassign, otherwisd a loginId > 0
    if (loginId === false) return;
    try {
      for (let i = 0; i < selectedStakeholderIds.length; i++) {
        await assign(selectedStakeholderIds[i], user.id, loginId);
      }
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.response && err.response.status === 401) {
        setUnauthorized(true);
      } else {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
    search();
  };

  const handleNeedsVerificationDialogOpen = async () => {
    setNeedsVerificationDialogOpen(true);
  };

  const handleNeedsVerificationDialogClose = async (message) => {
    setNeedsVerificationDialogOpen(false);
    // Dialog returns false if cancelled, otherwise an optional
    // message to attach to stakeholder(s)
    if (message === false) return;
    try {
      for (let i = 0; i < selectedStakeholderIds.length; i++) {
        await needsVerification(selectedStakeholderIds[i], user.id, message);
      }
    } catch (err) {
      // If we receive a 401 status code, the user needs
      // to be logged in, will redirect to login page.
      // Otherwise it's a real exception.
      if (err.response && err.response.status === 401) {
        setUnauthorized(true);
      } else {
        console.error(err);
        return Promise.reject(err.message);
      }
    }
    search();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    search();
    setDialogOpen(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <main className={classes.root}>
      {stakeholdersError.status === 401 || unauthorized ? (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      ) : null}
      <CssBaseline />
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
            variant="h4"
            component="h4"
            align="center"
            style={{ marginBottom: "0.5em" }}
          >
            Verification Administration
          </Typography>
          <SearchButton onClick={handleDialogOpen} label="Criteria..." />
        </header>
      </div>
      <div className={classes.mainContent}>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          fullWidth
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
                tenants={tenants}
                neighborhoods={neighborhoods}
                criteria={criteria}
                setCriteria={setCriteria}
                search={() => {
                  search();
                  setDialogOpen(false);
                }}
              />
            </div>
          ) : null}
          {categoriesError || neighborhoodsError || stakeholdersError ? (
            <div> Uh Oh! Something went wrong!</div>
          ) : categoriesLoading ||
            neighborhoodsLoading ||
            stakeholdersLoading ? (
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
                sizeUnit="px"
                size={15}
                color="#FAEBD7"
                loading
              />
            </div>
          ) : null}
        </Dialog>
        <AssignDialog
          id="assign-dialog"
          keepMounted
          open={assignDialogOpen}
          onClose={handleAssignDialogClose}
        />
        <NeedsVerificationDialog
          id="needs-verification-dialog"
          keepMounted
          message={""}
          open={needsVerificationDialogOpen}
          onClose={handleNeedsVerificationDialogClose}
        />
        <>
          {categoriesError || stakeholdersError ? (
            <div className={classes.bigMessage}>
              <Typography variant="h5" component="h5" style={{ color: "red" }}>
                Uh Oh! Something went wrong!
              </Typography>
            </div>
          ) : categoriesLoading || stakeholdersLoading ? (
            <div
              style={{
                flexGrow: 1,
                width: "100%",
                margin: "100px auto",
                display: "flex",
                justifyContent: "space-around",
              }}
              aria-label="Loading spinner"
            >
              <RotateLoader
                // css={}
                sizeUnit="px"
                size={15}
                color="green"
                loading
              />
            </div>
          ) : stakeholders && stakeholders.length === 0 ? (
            <div className={classes.bigMessage}>
              <Typography variant="h5" component="h5">
                No matches found, please try different criteria
              </Typography>
            </div>
          ) : stakeholders ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    variant="contained"
                    title="Mark for verification"
                    color="primary"
                    disabled={selectedStakeholderIds.length === 0}
                    onClick={handleNeedsVerificationDialogOpen}
                    style={{ marginRight: "0.2em" }}
                  >
                    Needs Verification
                  </Button>
                  <Button
                    variant="contained"
                    title="Assign selected Organizations to User for Verification"
                    color="primary"
                    disabled={selectedStakeholderIds.length === 0}
                    onClick={handleAssignDialogOpen}
                    style={{ marginRight: "0.2em" }}
                  >
                    Assign
                  </Button>
                  <Button
                    variant="contained"
                    title="Export selected Organizations to file"
                    color="primary"
                    disabled={selectedStakeholderIds.length === 0}
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                </div>
                <div>{`${stakeholders.length} rows`} </div>
              </div>
              <StakeholderGrid
                mode={"admin"}
                stakeholders={stakeholders}
                setSelectedStakeholderIds={setSelectedStakeholderIds}
              />
              <SuggestionList
                user={user}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
              />
            </>
          ) : (
            <div className={classes.bigMessage}>
              <Typography variant="h5" component="h5">
                Please enter search criteria and execute a search
              </Typography>
            </div>
          )}
        </>
      </div>
    </main>
  );
}

export default withRouter(VerificationAdmin);
