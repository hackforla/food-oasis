import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useOrganizations } from "hooks/useOrganizations";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as stakeholderService from "services/stakeholder-service";
import { useUserContext } from "../../contexts/userContext";
import VerificationAdminGridMui from "./VerificationAdminGridMui";

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
  tag: "",
};

function VerificationDashboard(props) {
  const { user } = useUserContext();
  const [criteria, setCriteria] = useState(defaultCriteria);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: stakeholders,
    loading: stakeholdersLoading,
    error: stakeholdersError,
    searchCallback,
  } = useOrganizations();

  useEffect(() => {
    const execute = async () => {
      if (!user) return undefined;
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

  if (!user) {
    return null;
  }

  if (stakeholdersError.status === 401) {
    navigate("/login", { state: { from: location } });
  }

  return (
    <main
      style={{
        flexGrow: 1,
        flexBasis: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        paddingBottom: "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            align="center"
            style={{ marginBottom: "0.5em" }}
          >
            {`${user && user.firstName} ${user && user.lastName}'s Dashboard`}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              variant="outlined"
              type="button"
              onClick={requestAssignment}
              sx={{ margin: ".1rem" }}
            >
              Request Assignment
            </Button>
            <Button
              variant="outlined"
              type="button"
              icon="search"
              onClick={search}
              sx={{ margin: ".1rem" }}
            >
              Refresh
            </Button>
          </Box>
        </header>
      </Box>
      <Box
        sx={(theme) => ({
          flexGrow: 1,
          padding: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
        })}
      >
        <>
          {stakeholdersError ? (
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#E8E8E8",
                textAlign: "center",
                padding: "4em",
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={(theme) => ({
                  color: theme.palette.error.main,
                  fontSize: "24pt",
                })}
              >
                Uh Oh! Something went wrong!
              </Typography>
            </Box>
          ) : stakeholdersLoading ? (
            <Box
              style={{
                flexGrow: 1,
                width: "100%",
                margin: "100px auto",
                display: "flex",
                justifyContent: "space-around",
              }}
              aria-label="Loading spinner"
            >
              <CircularProgress />
            </Box>
          ) : stakeholders && stakeholders.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#E8E8E8",
                textAlign: "center",
                padding: "4em",
              }}
            >
              <Typography variant="h5" component="h5">
                No organizations have been assigned to you.
              </Typography>
            </Box>
          ) : stakeholders ? (
            <VerificationAdminGridMui
              stakeholders={stakeholders}
              mode={"dataentry"}
            />
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#E8E8E8",
                textAlign: "center",
                padding: "4em",
              }}
            >
              <Typography variant="h5" component="h5">
                Please enter search criteria and execute a search
              </Typography>
            </Box>
          )}
        </>
      </Box>
    </main>
  );
}

export default VerificationDashboard;
