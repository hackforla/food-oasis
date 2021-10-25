import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { CssBaseline, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StakeholderGrid from "./VerificationAdminGrid";
import { RotateLoader } from "react-spinners";
import { useOrganizations } from "hooks/useOrganizations";
import * as stakeholderService from "services/stakeholder-service";
import { Button } from "../../components/UI";

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

const defaultCriteria = {
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

function VerificationDashboard(props) {
  const { user } = props;
  const classes = useStyles();
  const [criteria, setCriteria] = useState(defaultCriteria);

  const {
    data: stakeholders,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    searchCallback,
  } = useOrganizations();

  useEffect(() => {
    const execute = async () => {
      if (!user) return;
      const initialCriteria = { ...defaultCriteria, assignedLoginId: user.id };
      if (initialCriteria) {
        setCriteria(initialCriteria);
        try {
          await searchCallback(initialCriteria);
        } catch (err) {
          if (err.status !== 401) {
            console.error(err);
          }
        }
      }
    };
    execute();
  }, [searchCallback, user]);

  const search = async () => {
    try {
      await searchCallback(criteria);
    } catch (err) {
      if (err.status !== 401) {
        console.error(err);
      }
    }
  };

  const requestAssignment = async () => {
    try {
      await stakeholderService.requestAssignment(user.id);
      search();
    } catch (err) {
      if (err.status !== 401) {
        console.error(err);
      }
    }
  };

  const disableRequestAssignment = () => {
    console.log(stakeholders);
    if (!stakeholders) return false;
    const stakeholdersAssigned = stakeholders.filter(
      (stakeholder) => stakeholder.verificationStatusId === 2
    );
    return stakeholdersAssigned.length > 4 ? true : false;
  };

  return (
    <main className={classes.root}>
      {stakeholdersError.status === 401 ? (
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
            {`${user && user.firstName} ${user && user.lastName}'s Dashboard`}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              type="button"
              onClick={requestAssignment}
              disabled={disableRequestAssignment()}
            >
              Request Assignment
            </Button>
            <Button
              type="button"
              icon="search"
              iconPosition="start"
              onClick={search}
            >
              Refresh
            </Button>
          </div>
        </header>
      </div>
      <div className={classes.mainContent}>
        <>
          {stakeholdersError ? (
            <div className={classes.bigMessage}>
              <Typography variant="h5" component="h5" style={{ color: "red" }}>
                Uh Oh! Something went wrong!
              </Typography>
            </div>
          ) : stakeholdersLoading ? (
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
                No organizations have been assigned to you.
              </Typography>
            </div>
          ) : stakeholders ? (
            <StakeholderGrid mode={"dataentry"} stakeholders={stakeholders} />
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

export default withRouter(VerificationDashboard);
