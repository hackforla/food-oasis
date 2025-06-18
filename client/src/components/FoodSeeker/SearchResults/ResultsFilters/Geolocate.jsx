import LocationSearching from "@mui/icons-material/LocationSearching";
import { Button, Tooltip } from "@mui/material";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";
import { useState, useEffect } from "react";
import * as analytics from "services/analytics";
import { useUserCoordinates } from "../../../../appReducer";
import { useMapbox } from "../../../../hooks/useMapbox";

const Geolocate = () => {
  const { getUserLocation } = useGeolocation();
  const userCoordinates = useUserCoordinates();
  const locationPermission = useLocationPermission();
  const [error, setError] = useState("");
  const { flyTo } = useMapbox();

  useEffect(() => {
    if (error && locationPermission === "granted") {
      setError("");
    }
    if (locationPermission === "granted" && userCoordinates) {
      flyTo({
        longitude: userCoordinates.longitude,
        latitude: userCoordinates.latitude,
      });
    }
  }, [error, locationPermission, userCoordinates]);

  const useMyLocationTrigger = async () => {
    try {
      await getUserLocation();
    } catch (e) {
      setError(e);
    }
    analytics.postEvent("recenterMap", {});
  };

  return (
    <Tooltip
      title={
        locationPermission === "denied" || !!error
          ? "Please allow location access"
          : "Show Your Current Location"
      }
      componentsProps={{
        tooltip: {
          sx: {
            padding: "12px",
            fontSize: "0.95rem",
          },
        },
      }}
    >
      <Button
        variant="recenter"
        onClick={useMyLocationTrigger}
        disabled={locationPermission === "denied" || !!error}
        icon="locationSearching"
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          width: "28px",
          height: "32px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          "&:focus, &:focus-visible, &:active": {
            backgroundColor: theme.palette.common.white,
            borderColor: "white",
          },
        })}
      >
        <LocationSearching
          sx={(theme) => ({
            fontSize: "1.25rem",
            color: theme.palette.common.black,
            zIndex: 10,
          })}
        />
      </Button>
    </Tooltip>
  );
};

export default Geolocate;
